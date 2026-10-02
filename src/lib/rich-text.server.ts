import sanitizeHtml from 'sanitize-html';
import { toEditorHtml } from './rich-text';

// Same tag set as the backend. The backend already sanitizes on save; doing it
// again before rendering also covers rows written before that existed.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li', 'h2', 'h3', 'hr'],
  allowedAttributes: { ol: ['start'] },
  disallowedTagsMode: 'discard',
};

export const toSafeHtml = (description: string) => sanitizeHtml(toEditorHtml(description ?? ''), OPTIONS);
