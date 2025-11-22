export function formatDateISO(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}
