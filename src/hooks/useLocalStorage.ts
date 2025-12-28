import { useState, useEffect, useCallback } from 'react';

// In-memory pub/sub so multiple hook instances using the same key
// within the same window update immediately.
const subscribers = new Map<string, Set<(v: any) => void>>();

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? (value as (p: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (e) {
          console.error(`Error setting localStorage key "${key}":`, e);
        }

        // notify same-window subscribers (other hook instances)
        const subs = subscribers.get(key);
        if (subs) {
          subs.forEach((cb) => {
            try { cb(valueToStore); } catch (e) { /* ignore subscriber errors */ }
          });
        }

        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    // subscribe for same-window updates
    let subs = subscribers.get(key);
    if (!subs) {
      subs = new Set();
      subscribers.set(key, subs);
    }
    const cb = (v: T) => setStoredValue(v);
    subs.add(cb);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (e) {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      subs!.delete(cb);
      if (subs!.size === 0) subscribers.delete(key);
    };
  }, [key]);

  return [storedValue, setValue];
}
