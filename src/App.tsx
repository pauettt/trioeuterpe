import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Ceremonias } from "./pages/Ceremonias";
import { Coctel } from "./pages/Coctel";
import { OtrosEventos } from "./pages/OtrosEventos";
import { NotFound } from "./pages/NotFound";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CustomCursor } from "./components/CustomCursor";
import { ErrorBoundary } from "./components/ErrorBoundary";

function AppContent() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language.substring(0, 2);
  }, [i18n.language]);

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
