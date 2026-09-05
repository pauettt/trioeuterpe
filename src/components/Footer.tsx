import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 bg-white border-t border-gray-100 text-center">
      <h2 className="font-serif text-3xl text-text mb-4">Trío Euterpe</h2>
      <p className="text-text-muted font-sans font-light max-w-md mx-auto mb-8">
        {t('footer.slogan')}
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm font-sans tracking-widest text-text mb-8">
        <a href="mailto:trioeuterpe@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="font-medium uppercase text-primary">{t('footer.email_label')}:</span> trioeuterpe@gmail.com
        </a>
        <span className="hidden md:inline text-gray-300">|</span>
        <a href="tel:+34675615089" className="flex items-center gap-2 hover:text-primary transition-colors">
          <span className="font-medium uppercase text-primary">{t('footer.phone_label')}:</span> +34 675 615 089
        </a>
      </div>

      <div className="flex justify-center mb-12">
        <a 
          href="https://www.youtube.com/@TrioEuterpeMallorca" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
          aria-label="YouTube"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        </a>
      </div>

      <p className="text-xs text-gray-400 font-sans">
        &copy; {year} Trío Euterpe. {t('footer.rights')}
      </p>
    </footer>
  );
}
