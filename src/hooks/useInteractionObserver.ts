import { useState, useRef, useEffect } from "react";

export const useInteractionObserver = (options?: IntersectionObserverInit) => {
  const [isInteraction, setInteraction] = useState(false);
  const targeetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      
      setInteraction(entry.isIntersecting);
    }, options);

    if (targeetRef.current) {
      console.log("Starting to observe element:", !!targeetRef.current);
      observer.observe(targeetRef.current);
    }

    return () => {
      console.log("Disconnecting observer");
      observer.disconnect();
    };
  }, [options]);

  return { targeetRef, isInteraction };
};
