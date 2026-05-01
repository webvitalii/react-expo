import { Store, useSelector } from '@tanstack/react-store';

const STORAGE_KEY = 'app.devMode';

interface DevModeState {
  enabled: boolean;
}

const readInitialState = (): DevModeState => {
  if (typeof window === 'undefined') return { enabled: false };
  try {
    return { enabled: window.localStorage.getItem(STORAGE_KEY) === '1' };
  } catch {
    return { enabled: false };
  }
};

export const devModeStore = new Store<DevModeState>(readInitialState());

const persist = (enabled: boolean) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore storage errors (private mode, quota, etc.) */
  }
};

export const toggleDevMode = () => {
  devModeStore.setState((state) => {
    const next = !state.enabled;
    persist(next);
    return { enabled: next };
  });
};

export const setDevMode = (enabled: boolean) => {
  devModeStore.setState(() => {
    persist(enabled);
    return { enabled };
  });
};

/**
 * Reactive hook — component re-renders when the flag flips.
 * Use inside real React function components.
 */
export const useIsDevMode = () => useSelector(devModeStore, (s) => s.enabled);

/**
 * Non-reactive snapshot — safe to call in render-prop callbacks
 * (which are invoked as plain functions, not components, so hooks cannot run).
 * Reads the current store value but will not trigger re-render on change.
 */
export const isDevModeEnabled = () => devModeStore.state.enabled;
