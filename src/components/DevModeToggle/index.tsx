import { Bug } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsDevMode, toggleDevMode } from '@/state/devMode/devModeStore';

/**
 * Small navbar button that toggles the runtime "dev mode" flag. When on,
 * error fallbacks reveal stack traces even in production builds. State is
 * persisted to localStorage.
 */
const DevModeToggle = () => {
  const enabled = useIsDevMode();

  return (
    <button
      type="button"
      onClick={toggleDevMode}
      aria-pressed={enabled}
      title={enabled ? 'Dev mode: ON (click to disable)' : 'Dev mode: OFF (click to enable)'}
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 text-sm rounded border transition-colors',
        enabled
          ? 'bg-accent text-accent-foreground border-accent'
          : 'bg-transparent text-muted-foreground hover:bg-muted',
      )}
    >
      <Bug className="size-4" />
      <span>Dev</span>
    </button>
  );
};

export default DevModeToggle;
