import { SITE_TITLE } from '/src/constants.js';

export function buildDocumentTitle(pageTitle) {
  return `${pageTitle} - ${SITE_TITLE}`;
}
