// Helpers for task descriptions, which are stored as rich text (HTML).
// Older tasks still hold plain text, so everything here accepts both.

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };

export const looksLikeHtml = (value: string) => /^\s*<(p|h[1-6]|ul|ol|pre|blockquote|hr)[\s>/]/i.test(value);

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Plain text to HTML, one paragraph per line. */
export const plainTextToHtml = (text: string) =>
  text
    .split(/\r?\n/)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join('');

export const toEditorHtml = (value: string) => (looksLikeHtml(value) ? value : plainTextToHtml(value));

/**
 * Visible text of a description, for previews and length checks. The result is
 * only ever rendered as text, so a simple tag strip is enough here.
 */
export function htmlToPlainText(value: string) {
  if (!looksLikeHtml(value)) return value;
  return value
    .replace(/<(br|hr)\s*\/?>/gi, ' ')
    .replace(/<\/(p|h[1-6]|li|pre|blockquote)>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name: string) => ENTITIES[name])
    .replace(/\s+/g, ' ')
    .trim();
}
