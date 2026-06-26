import React from 'react';

export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = 'true';
  img.src = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#18181b" width="200" height="200"/><text x="100" y="110" text-anchor="middle" fill="#52525b" font-family="monospace" font-size="14" font-weight="bold">IMG</text><text x="100" y="126" text-anchor="middle" fill="#3f3f46" font-family="monospace" font-size="10">UNAVAILABLE</text></svg>'
  );
}
