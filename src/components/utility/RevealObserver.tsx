"use client";
import { useEffect } from "react";

// Fades [data-reveal] elements in as they scroll into view. Elements are only
// ever faded with opacity/transform (never visibility/display), so they stay in
// the accessibility tree, remain focusable, and are found by find-in-page.
// Without JS, or with prefers-reduced-motion, nothing is hidden at all.
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-state", "shown");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      // Leave anything already on screen alone so it doesn't flash out and back in.
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute("data-reveal-state", "hidden");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
