import { homeHero } from '@/content/site';

export default function InterestDisclaimer({
  context,
  className = 'registration-notice',
}: {
  context?: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {context && <>{context} </>}
      {homeHero.invitation}
      <span className="registration-privacy">
        How we handle your data: <a href="/privacy">Privacy Notice</a>.
      </span>
    </p>
  );
}
