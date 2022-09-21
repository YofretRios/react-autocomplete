export default function highlightKeyWord(text: string, search: string) {
  const pattern = new RegExp(search, 'igm');
  let replaced = text.replace(pattern, (match) => `<mark>${match}</mark>`);

  return { __html: replaced };
}
