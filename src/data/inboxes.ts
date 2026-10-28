/** Private business inboxes. They come from Cloudflare secrets, never from the repository. */

export interface InboxEnv {
  // Comma-separated recipients for the public contact address and /quote.
  CONTACT_INBOXES?: string;
  // Comma-separated hidden copies of estimate and invoice emails.
  ESTIMATE_COPIES?: string;
}

const addressPattern = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;

export function addressList(value: string | undefined): string[] {
  return (value ?? '').split(',').map((address) => address.trim()).filter((address) => addressPattern.test(address));
}

export const contactInboxes = (env: InboxEnv): string[] => addressList(env.CONTACT_INBOXES);

/** Estimate copies, without the customer's own address. */
export function estimateCopies(env: InboxEnv, customer = ''): string[] {
  const target = customer.trim().toLowerCase();
  return addressList(env.ESTIMATE_COPIES).filter((address) => address.toLowerCase() !== target);
}
