import { useSyncExternalStore } from 'react';

/**
 * Tiny observable store. Every component that reads it sees the same value,
 * so e.g. changing a setting in the Settings dialog updates a game that is
 * already on screen, and finishing the daily challenge updates the streak
 * shown elsewhere.
 */
export interface Store<T> {
  get(): T;
  set(next: T | ((prev: T) => T)): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<T>(initial: () => T): Store<T> {
  let value: T | undefined;
  let ready = false;
  const listeners = new Set<() => void>();

  const get = () => {
    if (!ready) {
      value = initial();
      ready = true;
    }
    return value as T;
  };

  return {
    get,
    set(next) {
      const prev = get();
      value = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      if (value !== prev) listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
