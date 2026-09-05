import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageTransition } from "../components/PageTransition";
import { Seo } from "../components/Seo";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Seo title={t('seo.not_found.title')} description={t('seo.not_found.description')} />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <span className="font-serif text-8xl text-primary/30 mb-4">404</span>
        <h1 className="font-serif text-3xl text-text mb-4">{t('not_found.title')}</h1>
        <p className="text-text-muted font-sans font-light max-w-md mb-8">
          {t('not_found.text')}
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white font-sans tracking-[0.2em] uppercase text-sm px-10 py-4 rounded-full hover:bg-primary-dark transition-all duration-300"
        >
          {t('not_found.cta')}
        </Link>
      </div>
    </PageTransition>
  );
}
