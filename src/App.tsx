import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Ceremonias } from "./pages/Ceremonias";
import { Coctel } from "./pages/Coctel";
import { OtrosEventos } from "./pages/OtrosEventos";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CookieBanner } from "./components/CookieBanner";
import { CustomCursor } from "./components/CustomCursor";

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <main className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-primary-dark flex flex-col relative">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/ceremonias" element={<Ceremonias />} />
              <Route path="/cocteles" element={<Coctel />} />
              <Route path="/otros-eventos" element={<OtrosEventos />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
