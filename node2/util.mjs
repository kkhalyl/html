export const createLink = (fileName) => {
    return `<a href="/${encodeURIComponent(fileName)}">${fileName}</a>`;
};
