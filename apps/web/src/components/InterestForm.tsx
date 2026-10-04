import InterestFormFields from '@/components/InterestFormFields';
import { contactEmail } from '@/content/site';

interface InterestFormProps {
  variant?: 'contact' | 'nff';
}

export default function InterestForm({
  variant = 'contact',
}: InterestFormProps) {
  return (
    <div className="form-panel">
      <InterestFormFields variant={variant} />
      <div className="email-fallback">
        <span>Prefer email?</span>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </div>
    </div>
  );
}
