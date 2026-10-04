import InterestFormFields from '@/components/InterestFormFields';
import { contactEmail, isContactEmailConfigured } from '@/content/site';

interface InterestFormProps {
  variant?: 'contact' | 'nff';
}

export default function InterestForm({
  variant = 'contact',
}: InterestFormProps) {
  return (
    <div className="form-panel">
      <div className="demo-notice" role="note">
        <strong>Local demonstration mode</strong>
        <span>
          This form validates in your browser but does not retain or send
          information.
        </span>
      </div>
      <InterestFormFields variant={variant} />
      <div className="email-fallback">
        <span>Prefer email?</span>
        {isContactEmailConfigured ? (
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        ) : (
          <strong>Professional address pending confirmation</strong>
        )}
      </div>
    </div>
  );
}
