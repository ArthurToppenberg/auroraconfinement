import CountUp from './CountUp';

/** Animate numeric statistics while retaining their original punctuation and units. */
export default function AnimatedNumbers({ text }: { text: string }) {
  return text.split(/(\d[\d,]*(?:\.\d+)?)/g).map((part, index) => {
    if (!/^\d/.test(part)) return part;
    return (
      <CountUp
        key={index}
        as="span"
        value={Number(part.replaceAll(',', ''))}
        decimals={part.split('.')[1]?.length ?? 0}
        grouped={part.includes(',')}
      />
    );
  });
}
