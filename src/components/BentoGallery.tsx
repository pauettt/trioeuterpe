import { motion } from "framer-motion";

const photos = [
  { id: 1, src: "/images/Lugares bonitos/IMG_20240504_120702346_HDR.jpg", span: "col-span-2 row-span-2" },
  { id: 2, src: "/images/Instrumentos/Piano.jpg", span: "col-span-1 row-span-1" },
  { id: 3, src: "/images/Iglesia/IMG-20240901-WA0000.jpg", span: "col-span-1 row-span-1" },
  { id: 4, src: "/images/2 de nosotros/Espontanea.jpg", span: "col-span-1 row-span-2" },
  { id: 5, src: "/images/Los 3/IMG_20240518_143311991_HDR.jpg", span: "col-span-2 row-span-1" },
  { id: 6, src: "/images/Marisa/Marisa sola.jpg", span: "col-span-1 row-span-1" },
  { id: 7, src: "/images/Los 3/fiestaaa.jpg", span: "col-span-1 row-span-1" },
];

export function BentoGallery() {
  return (
    <section className="py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-sans tracking-[0.3em] uppercase text-sm mb-4 block">
            Galería Visual
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text mb-4">La Banda Sonora Visual</h2>
          <p className="text-text-muted font-sans max-w-2xl mx-auto text-lg">
            Un vistazo a algunas de las celebraciones donde nuestra armonía ha acompañado momentos únicos.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px] grid-flow-dense"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ scale: 0.98 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer ${photo.span}`}
            >
              <img
                src={photo.src}
                alt="Trio Euterpe Performance"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
