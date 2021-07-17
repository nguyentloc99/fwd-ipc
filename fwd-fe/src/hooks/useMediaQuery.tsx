import { useEffect, useState } from 'react';

export function useMatchMedia(query: string, initialMatch = false) {
  const [matches, setMatches] = useState(initialMatch);

  useEffect(() => {
    const mediaQuery = matchMedia(query);
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };
    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);

    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}
