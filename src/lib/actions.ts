const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzM3AT8_8geBQLWi9rpYvMS6HUDLvVNORNPTB0qm9ShMB6zcz1QX6coywQYDVi_Zzc/exec';

export interface LastResponse {
  timestamp: string;
  response: string;
  comments: string;
  plusOne: boolean;
}

export interface Location {
  name: string;
  url: string;
}

export interface GuestResponse {
  found: boolean;
  name: string;
  lastResponse: LastResponse | null;
  location: Location | null;
  status: 'error' | 'success';
  message?: string;
}

export interface RsvpRequest {
  name: string;
  emoji?: string;
  response: string;
  comments: string;
  plusOne: boolean;
}

/**
 * Gets guest data including validation status and last response
 * @param name - The guest name to look up
 * @param emoji - Optional emoji parameter from the URL
 */
export async function getGuestData(name: string, emoji?: string): Promise<GuestResponse> {
  const params = new URLSearchParams({ name: name });
  if (emoji) {
    params.append('emoji', emoji);
  }
  const data = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
    redirect: 'follow',
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  return await data.json();
}

/**
 * Submits an RSVP response
 * @param rsvpData - The RSVP data containing name, response, and comments
 */
export async function postRsvp({
  name,
  emoji,
  response,
  comments,
  plusOne,
}: RsvpRequest): Promise<void> {
  await fetch(SCRIPT_URL, {
    mode: 'no-cors',
    redirect: 'follow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.toLowerCase().trim(),
      emoji,
      response,
      comments,
      plusOne,
    }),
  });
}
