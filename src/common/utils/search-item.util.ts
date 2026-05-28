export function searchItem(text: string, search: string): boolean {
  return text.toLowerCase().includes(search.toLowerCase());
}
