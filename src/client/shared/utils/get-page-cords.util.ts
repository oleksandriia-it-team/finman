export function getPageCoords(element: Element) {
  const rect = element.getBoundingClientRect();

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}