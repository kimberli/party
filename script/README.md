# Google Sheets backend

The "database" for this is a Google Sheets spreadsheet.

It should be set up with two sheets with the following columns:
- `responses` (populated when guests submit their responses)
  - A: Timestamp
  - B: Name
  - C: Response
  - D: Comments
  - E: Plus one
- `attendees` (populated by you for your guest list)
  - A: First name and last initial (e.g. `kim z`)
  - B: Emoji for verification
  

## Apps script
The `app.gs` script is the backend for this site.

To deploy it, go to Extensions > Apps Script on the spreadsheet.

Paste in the source code, populate your `LOCATION` object, then deploy the script.

It should be deployed as a "web app" with "anyone" access.

After you deploy it, populate the app link (e.g. `https://script.google.com/macros/s/APP_ID/exec`) into src/lib/actions.ts.