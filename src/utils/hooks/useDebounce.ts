import { useEffect, useState } from "react";

/**
 * This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value when the useDebounce hook has not been called for the specified time period.
 * @param value Value to debounce
 * @param delay Debounce delay (in ms.)
 * @returns Debounced value
 * @see https://useHooks.com/useDebounce/
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
