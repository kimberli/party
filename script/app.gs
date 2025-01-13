LOCATION = {
  name: 'location name',
  url: 'location link',
};

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const responsesSheet = ss.getSheetByName("responses");
  const attendeesSheet = ss.getSheetByName("attendees");
  
  if (!responsesSheet) {
    return createErrorResponse("server configuration error");
  }

  if (!attendeesSheet) {
    return createErrorResponse("server configuration error");
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date();
    
    const nameData = attendeesSheet.getRange("A:B").getValues();
    if (!data.name) {
      return createErrorResponse("name is required");
    }
    if (!data.emoji) {
      return createErrorResponse("something is missing. are you sure you used the link that i sent you?");
    }
    const found = nameData.some(row => isRowMatch(row, data.name, data.emoji));

    if (!found) {
      return createErrorResponse("sorry, couldn't find you on the list. who do you know here again?");
    }
    
    responsesSheet.appendRow([
      timestamp,
      data.name.trim().toLowerCase(),
      data.response,
      data.comments,
      data.plusOne,
    ]);
    
    return createJsonResponse({
      status: 'success',
      found: true,
      name: data.name,
      lastResponse: {
        timestamp: timestamp,
        response: data.response,
        comments: data.comments,
        plusOne: data.plusOne,
      },
      location: LOCATION,
    });
  } catch (error) {
    return createErrorResponse("server error");
  }
}

function doGet(e) {
  if (!e.parameter.name) {
    return createErrorResponse("name is required");
  }
  if (!e.parameter.emoji) {
    return createErrorResponse("something is missing. are you sure you used the link that i sent you?");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const attendeesSheet = ss.getSheetByName("attendees");
  const responsesSheet = ss.getSheetByName("responses");
  
  if (!attendeesSheet) {
    return createErrorResponse("server configuration error");
  }

  if (!responsesSheet) {
    return createErrorResponse("server configuration error");
  }

  const searchName = e.parameter.name.trim().toLowerCase();
  const nameData = attendeesSheet.getRange("A:B").getValues();
  const emoji = e.parameter.emoji.trim();
  
  const found = nameData.some(row => isRowMatch(row, searchName, emoji));

  let lastResponse = null;
  let location = null;
  if (found) {
    const responseData = responsesSheet.getDataRange().getValues();
    const startRow = responseData[0][1] === "name" ? 1 : 0;
    
    for (let i = responseData.length - 1; i >= startRow; i--) {
      if (responseData[i][1].toString().trim().toLowerCase() === searchName) {
        lastResponse = {
          timestamp: responseData[i][0],
          response: responseData[i][2],
          comments: responseData[i][3],
          plusOne: responseData[i][4],
        };
        break;
      }
    }
    location = LOCATION;
  }
  
  return createJsonResponse({
    status: 'success',
    found: found,
    name: e.parameter.name,
    lastResponse: lastResponse,
    location: location,
  });
}

function isRowMatch(row, name, emoji) {
  return row[0].toString().trim().toLowerCase() === name && normalizeEmoji(row[1]) === normalizeEmoji(emoji)
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(message) {
  return createJsonResponse({
    status: 'error',
    message: message
  });
}

function normalizeEmoji(input) {
  if (!input) return '';
  
  let decoded = input;
  try {
    decoded = decodeURIComponent(input);
  } catch (e) {
    decoded = input;
  }
  
  decoded = decoded.replace(/\u2069/g, '');
  
  // Remove extra RTL unicode character added by Facebook Messenger.
  decoded = decoded.replace(/[\u180B-\u180D\uFE00-\uFE0F\u200D]/g, '');
  
  return decoded.normalize('NFC');
}