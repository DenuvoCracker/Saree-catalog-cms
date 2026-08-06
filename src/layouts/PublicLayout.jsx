import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import WhatsAppFloatButton from "../components/layout/WhatsAppFloatButton.jsx";
import ScrollToTop from "../components/layout/ScrollToTop.jsx";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatButton />
      <ScrollToTop />
    </div>
  );
}
