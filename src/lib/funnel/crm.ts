import { SENDER } from "./config";

/*
 * GrowthHub365 / CRM webhook integration points. Each hook is configured by an
 * environment variable. If a variable is empty the hook is NOT called and the
 * caller is told it was not configured, so nothing is ever reported as saved
 * when it was not.
 */
export type Hook = "contact" | "answers" | "qualification" | "tags" | "route" | "followUp";

const URLS: Record<Hook, string | undefined> = {
  contact: process.env.GHL_WEBHOOK_CONTACT,
  answers: process.env.GHL_WEBHOOK_ANSWERS,
  qualification: process.env.GHL_WEBHOOK_QUALIFICATION,
  tags: process.env.GHL_WEBHOOK_TAGS,
  route: process.env.GHL_WEBHOOK_ROUTE,
  followUp: process.env.GHL_WEBHOOK_FOLLOWUP,
};

export function isConfigured(hook: Hook): boolean {
  return !!URLS[hook];
}

export async function callHook(
  hook: Hook,
  payload: Record<string, unknown>,
): Promise<{ configured: boolean; data: Record<string, unknown> }> {
  const url = URLS[hook];
  if (!url) return { configured: false, data: {} };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, sender: SENDER, sentAt: new Date().toISOString() }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${hook} webhook failed (${res.status})`);
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { configured: true, data };
}
