import { motion } from "framer-motion";
import { AudioPlayer } from "./AudioPlayer";

export function AudioShowcase() {
  const sampleTracks = [
    { title: "Canon en Re Mayor", composer: "Pachelbel" },
    { title: "Perfect", composer: "Ed Sheeran" },
    { title: "Gabriel's Oboe", composer: "Ennio Morricone" },
    { title: "Viva la Vida", composer: "Coldplay" },
  ];

  return (
    <section className="py-24 px-4 bg-secondary/30 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-sans tracking-[0.3em] uppercase text-sm mb-4 block">
            Nuestra Música
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text mb-6">
            Escucha la Armonía
          </h2>
          <p className="text-text-muted font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Una pequeña muestra de nuestra sonoridad. Dale al play e imagínate caminando hacia el altar o disfrutando de una velada perfecta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleTracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AudioPlayer title={track.title} composer={track.composer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
