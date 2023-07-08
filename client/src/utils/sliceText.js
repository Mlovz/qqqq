export const sliceText = (text, count) => {
  return text.length > count ? text.slice(0, count) + "..." : text;
};
