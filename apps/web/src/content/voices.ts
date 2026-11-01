export interface Voice {
  quote: string;
  name: string;
  role: string;
}

// PLACEHOLDERS ONLY. Replace each entry with a real anecdote, name and role
// once the person has approved the exact wording in writing (AGENTS.md), then
// remove `placeholder` and the notice in the home page section.
export const placeholder = true;

export const voices: readonly Voice[] = [
  {
    quote:
      'Placeholder: a short personal anecdote from a leader in fusion will appear here once supplied and approved.',
    name: 'Name Surname',
    role: 'Title, Organisation',
  },
  {
    quote:
      'Placeholder: a short personal anecdote from a leader in fusion will appear here once supplied and approved.',
    name: 'Name Surname',
    role: 'Title, Organisation',
  },
  {
    quote:
      'Placeholder: a short personal anecdote from a leader in fusion will appear here once supplied and approved.',
    name: 'Name Surname',
    role: 'Title, Organisation',
  },
];
