import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, Music, Video } from "lucide-react";
import { AudioPlayer } from "../components/AudioPlayer";
import { PageTransition } from "../components/PageTransition";
import { useTranslation } from "react-i18next";

// --- COMPONENTES AUXILIARES ---

type Tab = 'videos' | 'audios' | 'galeria' | 'repertorio';

function CeremonySection({ data, bgClass, t }: { data: any, bgClass: string, t: any }) {
  const [activeTab, setActiveTab] = useState<Tab>('galeria');

  const tabs = [
    { id: 'videos', label: t('ceremonies.tabs.videos'), icon: <Video size={16} /> },
    { id: 'audios', label: t('ceremonies.tabs.audios'), icon: <Play size={16} /> },
    { id: 'galeria', label: t('ceremonies.tabs.gallery'), icon: <ImageIcon size={16} /> },
    { id: 'repertorio', label: t('ceremonies.tabs.repertoire'), icon: <Music size={16} /> },
  ] as const;

  return (
    <section className={`py-24 ${bgClass} w-full`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Cabecera de la Sección */}
        <div className="flex flex-col items-center text-center mb-16">
          <h3 className="text-4xl font-serif text-text mb-6">{data.title}</h3>
          <p className="text-text-muted font-sans text-lg max-w-2xl font-light">
            {data.description}
          </p>
        </div>

        {/* Navegación de Pestañas */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
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
                {data.images.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md group">
                    <img 
                      src={img} 
                      alt={`Foto de ${data.title}`} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* PESTAÑA: REPERTORIO */}
            {activeTab === 'repertorio' && (
              <motion.div
                key="repertorio"
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
                <div className="space-y-8">
                  {data.repertoire.map((song: any, idx: number) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-gray-100 pb-4"
                    >
                      <p className="text-sm font-bold text-primary uppercase tracking-widest md:w-1/3 shrink-0">{song.moment}</p>
                      <p className="text-text font-sans font-light md:w-2/3">{song.title}</p>
                    </motion.div>
                  ))}
                </div>

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
                    {data.audios.map((audio: any, idx: number) => (
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

export function Ceremonias() {
  const { t } = useTranslation();

  const dataReligiosa = {
    title: t('ceremonies.rel.title'),
    description: t('ceremonies.rel.desc'),
    repertoire: t('ceremonies.rel.rep', { returnObjects: true }) as Array<{moment: string, title: string}>,
    images: [
      "/images/Iglesia/IMG-20240901-WA0000.jpg", 
      "/images/Iglesia/IMG-20240901-WA0003.jpg", 
      "/images/Iglesia/IMG_20240615_171709389.jpg"
    ],
    videos: [
      "https://www.youtube.com/embed/l46vNInmIMc",
      "https://www.youtube.com/embed/-QLR_w3QBA4",
      "https://www.youtube.com/embed/g5r5_7ZtA8Q",
      "https://www.youtube.com/embed/VQVtEttLD8I"
    ],
    audios: []
  };

  const dataCivil = {
    title: t('ceremonies.civ.title'),
    description: t('ceremonies.civ.desc'),
    repertoire: t('ceremonies.civ.rep', { returnObjects: true }) as Array<{moment: string, title: string}>,
    images: [
      "/images/Lugares bonitos/IMG_20240504_120702346_HDR.jpg", 
      "/images/Los 3/Los3a.jpg", 
      "/images/Los 3/3tocandoguay.jpg"
    ],
    videos: [
      "https://www.youtube.com/embed/mJkA2dRw0bc",
      "https://www.youtube.com/embed/-jjl5mF3cuA",
      "https://www.youtube.com/embed/-QLR_w3QBA4",
      "https://www.youtube.com/embed/U2MzDHGcsWo"
    ],
    audios: []
  };

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Centralizado */}
        <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center pt-20 overflow-hidden">
          <motion.img 
            src="/images/Iglesia/IMG_20240615_171709389.jpg" 
            alt="Ceremonias" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-6"
            >
              {t('ceremonies.hero_title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 font-sans text-xl md:text-2xl font-light tracking-wide"
            >
              {t('ceremonies.hero_subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Intro General */}
        <section className="py-24 bg-background text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif text-text mb-8">{t('ceremonies.intro_title')}</h2>
              <p className="text-text-muted font-sans text-lg leading-relaxed font-light">
                {t('ceremonies.intro_text')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ceremonia Religiosa */}
        <CeremonySection data={dataReligiosa} bgClass="bg-surface" t={t} />

        {/* Ceremonia Civil */}
        <CeremonySection data={dataCivil} bgClass="bg-background" t={t} />

      </div>
    </PageTransition>
  );
}
