import { useState, useEffect } from "react";
import { Search, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SearchBarProps {
  variant?: "hero" | "page";
  onSearch?: (location: string, specialization: string) => void;
}

const placeholders = [
  "Cardiologist in New York",
  "Orthopedic doctor in Bhubaneswar",
  "Dermatologist in Los Angeles",
  "Pediatrician in Chicago",
  "Neurologist in Miami",
];

const SearchBar = ({ variant = "hero", onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (variant !== "hero") return;

    const currentPlaceholder = placeholders[placeholderIndex];
    let charIndex = isTyping ? 0 : currentPlaceholder.length;
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      const type = () => {
        if (charIndex <= currentPlaceholder.length) {
          setDisplayedPlaceholder(currentPlaceholder.slice(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(type, 80);
        } else {
          timeoutId = setTimeout(() => setIsTyping(false), 2000);
        }
      };
      type();

      return () => clearTimeout(timeoutId);
    } else {
      const deleteText = () => {
        if (charIndex > 0) {
          charIndex--;
          setDisplayedPlaceholder(currentPlaceholder.slice(0, charIndex));
          timeoutId = setTimeout(deleteText, 40);
        } else {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          setIsTyping(true);
        }
      };
      deleteText();

      return () => clearTimeout(timeoutId);
    }
  }, [placeholderIndex, isTyping, variant]);

  const handleSearch = () => {
    onSearch?.(location, specialization);
  };

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`w-full ${
        isHero
          ? "bg-card/80 backdrop-blur-md rounded-2xl shadow-xl p-3 border border-border"
          : "bg-card rounded-xl shadow-lg p-2 border border-border"
      }`}
    >
      <div className={`flex flex-col ${isHero ? "md:flex-row" : "sm:flex-row"} gap-3`}>
        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={`w-full pl-12 pr-4 bg-muted/50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground ${
              isHero ? "py-4 text-base" : "py-3 text-sm"
            }`}
          />
        </div>

        {/* Specialization Input */}
        <div className="flex-1 relative">
          <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder={isHero ? displayedPlaceholder || "Specialization" : "Specialization"}
            className={`w-full pl-12 pr-4 bg-muted/50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-card transition-all text-foreground placeholder:text-muted-foreground will-change-auto ${
              isHero ? "py-4 text-base" : "py-3 text-sm"
            }`}
            style={{ minHeight: isHero ? '56px' : '44px' }}
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          variant="hero"
          size={isHero ? "xl" : "lg"}
          className="gap-2"
        >
          <Search className="w-5 h-5" />
          <span className={isHero ? "" : "hidden sm:inline"}>Search</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
