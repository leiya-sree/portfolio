import { useEffect, useState } from 'react';

export default function TypingText({ words, className = '' }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= words.length) {
      const reset = setTimeout(() => setIndex(0), 1600);
      return () => clearTimeout(reset);
    }

    const current = words[index];

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? 45 : 90
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words]);

  const text = words[index]?.slice(0, subIndex) ?? '';

  return (
    <span className={className}>
      <span className="gradient-text-animated">{text}</span>
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent text-transparent align-middle">
        |
      </span>
    </span>
  );
}
