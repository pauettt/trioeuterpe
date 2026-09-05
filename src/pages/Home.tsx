import { useTranslation } from "react-i18next";
import { Hero } from "../components/Hero";
import { TrioPresentation } from "../components/TrioPresentation";
import { BentoGallery } from "../components/BentoGallery";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { PageTransition } from "../components/PageTransition";
import { Seo } from "../components/Seo";

export function Home() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} />
      <div className="w-full relative overflow-hidden">
        <Hero />
        <TrioPresentation />
        
        {/* Separador de pentagrama - Transición entre secciones */}
        <div className="w-full bg-background pb-12 pt-8">
          <div className="w-full max-w-4xl mx-auto h-16 flex flex-col justify-center gap-2 opacity-30">
            <div className="h-[1px] w-full bg-primary-dark"></div>
            <div className="h-[1px] w-full bg-primary-dark"></div>
            <div className="h-[1px] w-full bg-primary-dark"></div>
            <div className="h-[1px] w-full bg-primary-dark"></div>
            <div className="h-[1px] w-full bg-primary-dark"></div>
          </div>
        </div>

        <BentoGallery />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </div>
    </PageTransition>
  );
}
