// Animações de Scroll, não mexer
"use client"
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

// Função 1: Animação de cima para baixo
export const ScrollFromTop = ({
  children,
  className = "",
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Função 2: Animação de baixo para cima
export const ScrollFromBottom = ({
  children,
  className = "",
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Função 3: Animação da esquerda para a direita
export const ScrollFromLeft = ({
  children,
  className = "",
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Função 4: Animação da direita para a esquerda
export const ScrollFromRight = ({
  children,
  className = "",
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Função 5: Aparecer gradativamente (fade in)
export const ScrollFadeIn = ({
  children,
  className = "",
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
