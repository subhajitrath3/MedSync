import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  variant?: "default" | "large";
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
  variant = "default",
}: FeatureCardProps) => {
  const isLarge = variant === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 ${
        isLarge ? "p-8" : "p-6"
      }`}
    >
      <div
        className={`rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 ${
          isLarge ? "w-16 h-16" : "w-12 h-12"
        }`}
      >
        <Icon className={`text-primary ${isLarge ? "w-8 h-8" : "w-6 h-6"}`} />
      </div>

      <h3 className={`font-semibold text-foreground mb-2 ${isLarge ? "text-xl" : "text-lg"}`}>
        {title}
      </h3>

      <p className={`text-muted-foreground leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}>
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
