import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Appears after the user scrolls past one viewport height
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-maroon text-cream shadow-lg flex items-center justify-center
      transition-transform duration-300 hover:-translate-y-1"
    >
      <ArrowUp size={18} />
    </button>
  );
}
