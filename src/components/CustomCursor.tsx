import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the cursor position
  const cursorX = useSpring(0, { damping: 25, stiffness: 120, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 120, mass: 0.5 });

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Delegación de eventos: un único listener en document, sin necesidad de
    // reengancharse a elementos nuevos (evita fugas de listeners en cada
    // cambio de pestaña/página, ya que el DOM cambia constantemente).
    const handlePointerOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("a, button, input, [role='button']")) {
        setIsHovering(true);
      }
    };
    const handlePointerOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("a, button, input, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseover", handlePointerOver);
    document.body.addEventListener("mouseout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseover", handlePointerOver);
      document.body.removeEventListener("mouseout", handlePointerOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring (follows with spring) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner dot (instant tracking) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ 
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
          x: { type: "tween", ease: "linear", duration: 0 },
          y: { type: "tween", ease: "linear", duration: 0 }
        }}
      />
    </>
  );
}
