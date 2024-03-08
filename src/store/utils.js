import DOMPurify from 'dompurify';

export function isErrorOccurred(pageContent) {
    return typeof pageContent === "string";
}

export function sanitizeHTMLContent(content) {
    return { __html: DOMPurify.sanitize(content) };
}