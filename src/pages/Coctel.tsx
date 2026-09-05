import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, Music, Video } from "lucide-react";
import { AudioPlayer } from "../components/AudioPlayer";
import { PageTransition } from "../components/PageTransition";
import { Seo } from "../components/Seo";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

// --- COMPONENTES AUXILIARES ---

type Tab = 'videos' | 'audios' | 'galeria' | 'repertorio';
type RepCategory = 'clasico' | 'moderno' | 'mixto' | 'welcome';

interface CoctelAudio {
  title: string;
  composer: string;
  src?: string;
}

interface EventImage {
  src: string;
  position?: string;
}

interface EventData {
  title: string;
  description: string;
  repertoire: Record<RepCategory, string[]>;
  images: (string | EventImage)[];
  videos: string[];
  audios: CoctelAudio[];
}

function EventSection({ data, bgClass, t }: { data: EventData, bgClass: string, t: TFunction }) {
  const [activeTab, setActiveTab] = useState<Tab>('galeria');
  const [activeRepCategory, setActiveRepCategory] = useState<RepCategory>('clasico');

  const tabs = [
    { id: 'videos', label: t('ceremonies.tabs.videos'), icon: <Video size={16} /> },
    { id: 'audios', label: t('ceremonies.tabs.audios'), icon: <Play size={16} /> },
    { id: 'galeria', label: t('ceremonies.tabs.gallery'), icon: <ImageIcon size={16} /> },
    { id: 'repertorio', label: t('ceremonies.tabs.repertoire'), icon: <Music size={16} /> },
  ] as const;

  const repCategories = [
    { id: 'clasico', label: t('coctel.repertoire_categories.clasico') },
    { id: 'moderno', label: t('coctel.repertoire_categories.moderno') },
    { id: 'mixto', label: t('coctel.repertoire_categories.mixto') },
    { id: 'welcome', label: t('coctel.repertoire_categories.welcome') },
  ] as const;

  const activeRepList = data.repertoire?.[activeRepCategory] ?? [];

  return (
    <section className={`py-24 ${bgClass} w-full`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Navegación de Pestañas */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white border border-gray-200 text-text-muted hover:border-primary/50 hover:text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={`active-tab-pill-${data.title}`}
                    className="absolute inset-0 bg-primary rounded-full shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Submenú de Categorías de Repertorio */}
        <AnimatePresence>
          {activeTab === 'repertorio' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 pt-2">
                {repCategories.map((cat) => {
                  const isActive = activeRepCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveRepCategory(cat.id as RepCategory)}
                      className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'bg-white border border-gray-200 text-text-muted hover:border-primary/50 hover:text-primary'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId={`active-rep-category-pill-${data.title}`}
                          className="absolute inset-0 bg-primary-dark rounded-full shadow-lg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Área de Contenido */}
        <div className="min-h-[400px] relative">
          <AnimatePresence mode="wait">
            
            {/* PESTAÑA: GALERÍA */}
            {activeTab === 'galeria' && (
              <motion.div
                key="galeria"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {data.images.map((item, idx: number) => {
                  const src = typeof item === 'string' ? item : item.src;
                  const position = typeof item === 'object' ? item.position : undefined;
                  return (
                    <div key={idx} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md group">
                      <img 
                        src={src} 
                        alt={`Foto de ${data.title}`} 
                        style={position ? { objectPosition: position } : undefined}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* PESTAÑA: REPERTORIO */}
            {activeTab === 'repertorio' && (
              <motion.div
                key={`repertorio-${activeRepCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-primary/20 shadow-sm relative"
              >
                {/* Marcos decorativos */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/40"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/40"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/40"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/40"></div>

                <h4 className="text-2xl font-serif text-center text-primary-dark mb-10">{t('ceremonies.repertoire_title')}</h4>
                {activeRepList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                    {activeRepList.map((song, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 1) }}
                        className="flex items-baseline gap-3 border-b border-gray-100 pb-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <p className="text-text font-sans font-light">{song}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Music className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h5 className="text-xl font-serif text-text mb-2">{t('ceremonies.empty.coming_soon')}</h5>
                    <p className="text-text-muted font-sans font-light">
                      {t('ceremonies.empty.repertoire_text')}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* PESTAÑA: VIDEOS */}
            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`w-full ${data.videos.length === 0 ? "flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-2xl border border-dashed border-gray-300" : ""}`}
              >
                {data.videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {data.videos.map((video: string, idx: number) => (
                      <div key={idx} className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-primary/10">
                        <iframe
                          width="100%"
                          height="100%"
                          src={video}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-serif text-text mb-2">{t('ceremonies.empty.coming_soon')}</h4>
                    <p className="text-text-muted font-sans font-light">
                      {t('ceremonies.empty.videos_text')}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* PESTAÑA: AUDIOS */}
            {activeTab === 'audios' && (
              <motion.div
                key="audios"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center h-full min-h-[300px] bg-white rounded-2xl border border-dashed border-gray-300"
              >
                {data.audios.length > 0 ? (
                  <div className="w-full max-w-2xl mx-auto space-y-4 py-8 px-4">
                    {data.audios.map((audio, idx) => (
                      <AudioPlayer key={idx} title={audio.title} composer={audio.composer} src={audio.src} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <Play className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-serif text-text mb-2">{t('ceremonies.empty.coming_soon')}</h4>
                    <p className="text-text-muted font-sans font-light">
                      {t('ceremonies.empty.audios_text')}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- PÁGINA PRINCIPAL ---

export function Coctel() {
  const { t } = useTranslation();

  const dataCoctel = {
    title: t('coctel.section_title'),
    description: t('coctel.section_desc'),
    repertoire: t('coctel.rep', { returnObjects: true }) as Record<'clasico' | 'moderno' | 'mixto' | 'welcome', string[]>,
    images: [
      "/images/Lugares bonitos/IMG_20240504_120702346_HDR.jpg",
      "/images/Instrumentos/Cello instrumento.JPG",
      { src: "/images/Los 3/3 en jardin.jpg", position: "25% center" }
    ],
    videos: [
      "https://www.youtube.com/embed/YIMM2q_5jok",
      "https://www.youtube.com/embed/kl_5G1XTSfI",
      "https://www.youtube.com/embed/zto4Me-EDVw",
      "https://www.youtube.com/embed/-QLR_w3QBA4",
      "https://www.youtube.com/embed/mOzWBRRuVPE",
      "https://www.youtube.com/embed/qsA90Sac9Vw",
      "https://www.youtube.com/embed/pB5zcDkEssw"
    ],
    audios: [
      { title: "We Are the Champions", composer: "Queen", src: "/audios/We are the champions.mp3" },
      { title: "La Bella y la Bestia", composer: "BSO Disney (Alan Menken)", src: "/audios/bella y bestia.mp3" }
    ]
  };

  return (
    <PageTransition>
      <Seo title={t('seo.coctel.title')} description={t('seo.coctel.description')} />
      <div className="w-full relative overflow-hidden bg-surface">

        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center pt-20 overflow-hidden">
          <motion.img 
            src="/images/Marisa/Marisa sola.jpg" 
            alt="Cócteles y Aperitivos" 
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6"
            >
              {t('coctel.hero_title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 font-sans text-xl md:text-2xl font-light"
            >
              {t('coctel.hero_subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Description */}
        <section className="py-24 bg-background text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif text-text mb-8">{t('coctel.intro_title')}</h2>
              <p className="text-text-muted font-sans text-lg leading-relaxed font-light mb-6">
                {t('coctel.intro_p1')}
              </p>
              <p className="text-text-muted font-sans text-lg leading-relaxed font-light">
                {t('coctel.intro_p2')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs Layout */}
        <EventSection data={dataCoctel} bgClass="bg-surface" t={t} />
        
      </div>
    </PageTransition>
  );
}
