import { useEffect, useState } from 'react';

type PageFadeProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function PageFade({ children, className = '', id }: PageFadeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use rAF so the browser paints opacity:0 first, then transitions to 1.
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id={id} className={`page-fade ${isVisible ? 'page-fade--in' : ''} ${className}`}>
      {children}
    </div>
  );
}


