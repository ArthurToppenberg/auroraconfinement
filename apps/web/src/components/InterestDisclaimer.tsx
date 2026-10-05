interface InterestDisclaimerProps {
  includeNonBinding?: boolean;
}

export default function InterestDisclaimer({
  includeNonBinding = true,
}: InterestDisclaimerProps) {
  return (
    <ul className="interest-disclaimers">
      {includeNonBinding && (
        <li>
          <span>
            <strong>Non-binding</strong>: Expresses early interest only and
            helps validate institutional demand for our research platforms.
          </span>
        </li>
      )}
      <li>
        <span>
          <strong>Data privacy</strong>: Used solely to respond to your enquiry.
          See our <a href="/privacy">Privacy Notice</a>.
        </span>
      </li>
    </ul>
  );
}
