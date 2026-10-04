'use client';

export default function PrintButton() {
  return (
    <button
      className="button primary"
      type="button"
      data-print-page
      onClick={() => window.print()}
    >
      Print or save as PDF
    </button>
  );
}
