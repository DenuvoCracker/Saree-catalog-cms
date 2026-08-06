import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SITE } from "../../constants/site.js";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `font-body text-sm tracking-wide transition-colors ${
      isActive ? "text-gold" : "text-cream/90 hover:text-gold"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-maroon shadow-lg" : "bg-maroon/95"
      }`}
    >
      <nav className="container-boutique flex items-center justify-between px-6 sm:px-10 lg:px-20 h-20" aria-label="Primary">
        <Link to="/" className="font-display text-2xl text-cream tracking-wide">
          {SITE.name}
          <span className="block text-[10px] tracking-[0.3em] uppercase text-gold font-body">
            By {SITE.founderName}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-cream"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-maroon-dark px-6 pb-6 flex flex-col gap-4 animate-fadeUp">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} onClick={() => setOpen(false)} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
