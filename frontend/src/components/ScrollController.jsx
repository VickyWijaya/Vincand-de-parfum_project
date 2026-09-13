import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollController handles:
 * 1. Automatic scroll reset to top (top: 0) on page reload & navigation.
 * 2. High-performance, luxury scroll entrance animations via Intersection Observer.
 */
export default function ScrollController() {
  const { pathname, hash } = useLocation();

  // 1. Reset Posisi Scroll ke Paling Atas (Scroll to Top)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  // 2. Animasi Muncul yang Halus dan Elegan (Scroll Entrance Animations)
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.05,
    });

    // Timeout allows DOM to render before attaching observers
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in viewport on mount, reveal smoothly
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          // Otherwise observe for scroll entrance
          el.classList.remove('is-revealed');
          observer.observe(el);
        }
      });
    }, 80);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
