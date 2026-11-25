'use client';

import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';

export function CopyButton({
  value,
  label = 'Copiar',
  share = false,
}: {
  value?: string;
  label?: string;
  share?: boolean;
}) {
  const [message, setMessage] = useState('');
  async function copy() {
    const text = share ? window.location.href : value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setMessage('Copiado');
    } catch {
      setMessage(
        share ? 'Copie o endereço pela barra do navegador.' : 'Selecione o texto e copie manualmente.',
      );
    }
  }
  const Icon = share ? Share2 : Copy;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button type="button" className="button secondary" onClick={copy} disabled={!share && !value}>
        <Icon size={16} aria-hidden="true" />
        {label}
      </button>
      <span className={message ? 'inline-status' : 'sr-only'} role="status">
        {message}
      </span>
    </span>
  );
}
