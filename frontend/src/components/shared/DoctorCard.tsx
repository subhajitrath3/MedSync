import { motion } from "framer-motion";
import { Star, MapPin, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  name: string;
  specialization: string;
  experience: number;
  hospital: string;
  rating: number;
  available: boolean;
  image: string;
  index?: number;
}

const DoctorCard = ({
  name,
  specialization,
  experience,
  hospital,
  rating,
  available,
  image,
  index = 0,
}: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border group"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {available && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-card flex items-center justify-center">
              <div className="w-2 h-2 bg-secondary-foreground rounded-full" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-primary font-medium">{specialization}</p>
          
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              {experience} yrs
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {rating}
            </span>
          </div>
        </div>
      </div>

      {/* Hospital */}
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 text-primary" />
        <span className="truncate">{hospital}</span>
      </div>

      {/* Availability Badge */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            available
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Clock className="w-3 h-3" />
          {available ? "Available Today" : "Next Available: Tomorrow"}
        </span>
      </div>

      {/* Quick Book Button */}
      <Button
        variant="hero"
        className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Quick Book
      </Button>
    </motion.div>
  );
};

export default DoctorCard;
