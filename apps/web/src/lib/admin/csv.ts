/** Spreadsheet-safe CSV: quotes cells and defuses formulas (=, +, -, @, tab, CR). */
const cell = (value: string): string => {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
};

export function toCsv(
  rows: Record<string, string>[],
  columns: string[],
): string {
  const lines = [columns.map(cell).join(',')];
  for (const row of rows)
    lines.push(columns.map((column) => cell(row[column] ?? '')).join(','));
  return `﻿${lines.join('\r\n')}\r\n`;
}
