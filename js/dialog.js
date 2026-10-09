// A <dialog> element also covers its padding ring, so only a click on the dialog itself that lands
// outside its bounding box counts as a click on the backdrop.
export function isBackdropClick(event, dialog) {
  if (event.target !== dialog) return false;
  const r = dialog.getBoundingClientRect();
  return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
}
