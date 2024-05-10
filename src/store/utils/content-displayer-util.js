import DOMPurify from 'dompurify';

export function isErrorOccurred(pageContent) {
    return typeof pageContent === "string";
}

export function sanitizeHTMLContent(content) {
    return { __html: DOMPurify.sanitize(content) };
}

export function extractInnerText(htmlText) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    return tempDiv.textContent || tempDiv.innerText || '';
};

export function convertTitleToLink(title){
    return title.toLowerCase().replaceAll(" ","-");
}