export function getAfterInputValue(event: InputEvent): string {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (!target) return '';

  const value = target.value;
  const selectionStart = target.selectionStart ?? value.length;
  const selectionEnd = target.selectionEnd ?? value.length;

  switch (event.inputType) {
    case 'insertText':
    case 'insertFromPaste':
      return value.slice(0, selectionStart) + (event.data ?? '') + value.slice(selectionEnd);

    case 'deleteContentBackward':
      return value.slice(0, Math.max(0, selectionStart)) + value.slice(selectionEnd);

    case 'deleteContentForward':
      return value.slice(0, selectionStart) + value.slice(selectionEnd + 1);

    default:
      return value;
  }
}
