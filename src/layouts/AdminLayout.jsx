import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "../services/authService.js";
import { SITE } from "../constants/site.js";

const LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await signOut();
    toast.success("Signed out");
    navigate("/admin/login");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm transition-colors ${
      isActive ? "bg-gold/15 text-maroon font-semibold" : "text-ink/70 hover:bg-cream-dark"
    }`;

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gold/20 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="px-6 py-6 border-b border-gold/10">
          <p className="font-display text-xl text-maroon">{SITE.name}</p>
          <p className="text-xs text-ink/50 font-body">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={() => setOpen(false)}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm font-body text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-ink/40 z-30 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-6 h-16 bg-white border-b border-gold/20">
          <p className="font-display text-lg text-maroon">{SITE.name} Admin</p>
          <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
