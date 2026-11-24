import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to check if the component has mounted on the client.
 * Uses useSyncExternalStore to avoid cascading render lint errors in React 19.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
