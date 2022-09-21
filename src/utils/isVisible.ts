/**
 * Determine whether or not an specific li element is on view
 * @param li
 * @param container
 * @returns
 */
export default function isVisible(li: HTMLLIElement, container: HTMLUListElement) {
  const { bottom, height, top } = li.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height;
}
