import Link from 'next/link';
import { site } from '@/content/site';

export function Brand() {
  const [first, ...rest] = site.name.split(' ');
  return (
    <Link className="brand" href="/" aria-label={`${site.name} — início`}>
      <svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true">
        <rect width="48" height="48" rx="11" fill="currentColor" />
        <path
          d="m12 15 9 9-9 9m13-9h11m-5-5 5 5-5 5"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
      <span>
        {first}
        <span className="brand-rest">{' ' + rest.join(' ')}</span>
      </span>
    </Link>
  );
}
