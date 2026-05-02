import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Lleváis vuestro propio equipo de amplificación?",
    answer: "Sí, disponemos de equipo de sonido profesional propio y de alta calidad. Nos adaptamos a las necesidades acústicas de cada espacio para garantizar que la música suene perfecta, tanto en iglesias como en fincas abiertas."
  },
  {
    question: "¿Podéis tocar en exteriores (jardines, playas)?",
    answer: "Por supuesto. Tenemos mucha experiencia tocando al aire libre. Solo necesitamos asegurarnos de tener una pequeña zona de sombra (si es pleno verano) y acceso a una toma de corriente cercana para nuestros equipos de sonido."
  },
  {
    question: "¿Podemos pedir una canción que no está en el repertorio?",
    answer: "¡Claro que sí! Entendemos que hay canciones con un valor sentimental muy especial. Si nos avisáis con suficiente antelación, podemos preparar y arreglar prácticamente cualquier tema exclusivamente para vosotros."
  },
  {
    question: "¿Con cuánta antelación debemos reservar?",
    answer: "Recomendamos hacer la reserva con al menos 6-8 meses de antelación, especialmente si os casáis en temporada alta (mayo a octubre). No obstante, siempre podéis consultarnos disponibilidad por si tuviéramos vuestra fecha libre."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white w-full">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-text mb-4">Preguntas Frecuentes</h2>
          <p className="text-text-muted font-sans text-lg">
            Resolvemos las dudas más habituales sobre nuestros servicios.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm bg-[#FCFBF8]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className="font-serif text-lg text-text pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary flex-shrink-0"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-text-muted font-sans font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
