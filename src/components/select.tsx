import { ChevronDown } from 'lucide-react';
import type { ComponentProps } from 'react';

export function Select(props: ComponentProps<'select'>) {
  return (
    <div className="select-wrap">
      <select {...props} />
      <ChevronDown size={17} aria-hidden="true" />
    </div>
  );
}
