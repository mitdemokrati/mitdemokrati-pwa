import { EffectCallback, useEffect } from 'react';

export const useOutsideClick = (
  ref: React.Ref<unknown>,
  callback: EffectCallback
): void => {
  const handleClick = (e: Event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
