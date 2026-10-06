export interface Enquiry {
  name: string;
  email: string;
  /** must be one of the topics the /api/queries endpoint accepts */
  interest: string;
  message: string;
}

/**
 * Sends an enquiry to `/api/queries` (served by `vite dev`, or by a deployed
 * server). On a static host such as GitHub Pages that API doesn't exist, so it
 * falls back to opening the visitor's email client with the details filled in,
 * which is what the Contact page does too.
 *
 * Resolves to 'sent' when the API stored it, or 'email' when the visitor still
 * has to press send in their mail app.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<'sent' | 'email'> {
  try {
    const res = await fetch('/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error('request failed');
    return 'sent';
  } catch {
    const subject = encodeURIComponent('New enquiry — ' + enquiry.interest);
    const body = encodeURIComponent(
      'Name: ' + enquiry.name +
        '\nEmail: ' + enquiry.email +
        '\nTopic: ' + enquiry.interest +
        '\n\n' + enquiry.message,
    );
    location.href = 'mailto:hello@quillstones.com?subject=' + subject + '&body=' + body;
    return 'email';
  }
}
