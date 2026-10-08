/** "RESEARCH_PLATFORM" → "Research platform"; null (field not collected) → "—". */
export const words = (value: string | null) =>
  value === null
    ? '—'
    : value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, ' ');

export const adminDate = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) + ' UTC';
