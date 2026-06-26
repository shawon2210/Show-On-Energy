import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw } from 'lucide-react';

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('[PWA] SW registered:', r);
    },
    onRegisterError(e) {
      console.error('[PWA] SW registration error:', e);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-950/95 border border-lime-500/20 backdrop-blur-md shadow-xl">
      <span className="font-mono text-[11px] font-bold text-lime-400 tracking-wide">
        UPDATE AVAILABLE
      </span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="flex items-center gap-1.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-black px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>REFRESH</span>
      </button>
    </div>
  );
}
