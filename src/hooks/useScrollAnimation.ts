import { useEffect, useRef } from 'react';

/**
 * Hook to add smooth fade-in animation when element scrolls into view
 * @param options - IntersectionObserver options
 * @returns ref to attach to the element
 */
export const useScrollAnimation = (
  options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
};

/**
 * Hook to automatically add scroll animations to all text elements
 * This is useful for applying animations globally without manually adding refs
 */
export const useAutoScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Function to process elements
    const processElements = () => {
      // Select text elements more specifically
      const textSelectors = [
        'h1:not(.scroll-fade-in)',
        'h2:not(.scroll-fade-in)',
        'h3:not(.scroll-fade-in)',
        'h4:not(.scroll-fade-in)',
        'h5:not(.scroll-fade-in)',
        'h6:not(.scroll-fade-in)',
        'p:not(.scroll-fade-in)',
        'li:not(.scroll-fade-in)',
      ].join(', ');

      const textElements = document.querySelectorAll(textSelectors);

      // Filter elements to exclude those in specific containers or with specific classes
      const filteredElements = Array.from(textElements).filter((el) => {
        const element = el as HTMLElement;
        
        // Skip if already has scroll animation or is in excluded containers
        if (
          element.classList.contains('scroll-fade-in') ||
          element.classList.contains('word-animate') ||
          element.closest('video') ||
          element.closest('[class*="video"]') ||
          element.closest('[class*="ripple"]') ||
          element.closest('nav') || // Exclude navbar
          element.closest('button') || // Exclude buttons (they have their own interactions)
          element.closest('input') || // Exclude inputs
          element.closest('textarea') || // Exclude textareas
          element.closest('label') // Exclude labels
        ) {
          return false;
        }

        // Only include if element has visible text content
        const text = element.textContent?.trim() || '';
        return text.length > 0 && element.offsetHeight > 0;
      });

      filteredElements.forEach((el) => {
        const element = el as HTMLElement;
        element.classList.add('scroll-fade-in');
        observer.observe(element);
      });
    };

    // Process elements after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(processElements, 100);

    // Also process on DOM mutations (for dynamic content)
    const mutationObserver = new MutationObserver(() => {
      processElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
};
