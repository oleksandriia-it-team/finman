import { useEffect, useState } from 'react';

export function useObserver(target: Element | null | undefined): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!target) {
      return setVisible(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        setVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.5 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return visible;
}
