const extensionToTypeMap = {
  'js': "javascript",
  'jsx': "javascript",
  'ts': "typescript",
  'tsx': "typescript",
  'css': "css",
  'html': "html",
  'json': "json",
  'svg': "svg",
  'png': "png",
  'jpg': "jpg",
  'jpeg': "jpeg",
  'md': "markdown"
};

export const extensionToFileType = (extension) => {
  if (!extension) return undefined;
  return extensionToTypeMap[extension.toLowerCase()];
};
