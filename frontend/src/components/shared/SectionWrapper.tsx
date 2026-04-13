import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "gradient";
}

const SectionWrapper = ({
  children,
  className = "",
  id,
  background = "default",
}: SectionWrapperProps) => {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted/50",
    gradient: "bg-gradient-to-br from-medical-blue-light to-health-green-light",
  };

  return (
    <section id={id} className={`py-20 md:py-28 ${bgClasses[background]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
