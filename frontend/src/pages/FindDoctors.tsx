import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/shared/SearchBar";
import DoctorCard from "@/components/shared/DoctorCard";

const mockDoctors = [
  {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: 15,
    hospital: "City Heart Center",
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Dr. Michael Chen",
    specialization: "Orthopedic Surgeon",
    experience: 12,
    hospital: "Metro Bone & Joint Clinic",
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialization: "Dermatologist",
    experience: 8,
    hospital: "SkinCare Medical Center",
    rating: 4.7,
    available: false,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Dr. James Wilson",
    specialization: "Neurologist",
    experience: 20,
    hospital: "Neuro Excellence Hospital",
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Dr. Lisa Park",
    specialization: "Pediatrician",
    experience: 10,
    hospital: "Children's Wellness Center",
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Dr. Robert Kumar",
    specialization: "General Physician",
    experience: 18,
    hospital: "Family Health Clinic",
    rating: 4.6,
    available: false,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Available Today", value: "available" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Most Experienced", value: "experienced" },
];

const specializations = [
  "All Specializations",
  "Cardiologist",
  "Orthopedic",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "General Physician",
];

const FindDoctors = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-8 bg-gradient-to-br from-medical-blue-light via-background to-health-green-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Doctor
            </h1>
            <p className="text-muted-foreground">
              Search from our network of trusted healthcare professionals
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <SearchBar variant="page" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-72 flex-shrink-0"
            >
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border sticky top-28">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Filters</h3>
                </div>

                {/* Specialization */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Specialization
                  </label>
                  <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Minimum Rating
                  </label>
                  <div className="flex gap-2">
                    {[4, 4.5, 4.8].map((rating) => (
                      <button
                        key={rating}
                        className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      >
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Experience
                  </label>
                  <div className="space-y-2">
                    {["5+ years", "10+ years", "15+ years"].map((exp) => (
                      <label
                        key={exp}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-muted-foreground">
                          {exp}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Availability
                  </label>
                  <div className="space-y-2">
                    {["Available Today", "Available This Week"].map((avail) => (
                      <label
                        key={avail}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-muted-foreground">
                          {avail}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="hero" className="w-full mt-6">
                  Apply Filters
                </Button>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Mobile Filter Toggle & Quick Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeFilter === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing <span className="font-medium text-foreground">{mockDoctors.length}</span> doctors
              </p>

              {/* Doctor Cards Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDoctors.map((doctor, index) => (
                  <DoctorCard key={doctor.name} {...doctor} index={index} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-10">
                <Button variant="hero-outline" size="lg">
                  Load More Doctors
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden xl:block w-80 flex-shrink-0"
            >
              <div className="bg-card rounded-2xl shadow-card border border-border sticky top-28 overflow-hidden">
                <div className="h-[500px] bg-gradient-to-br from-medical-blue-light to-health-green-light flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Interactive map view coming soon
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindDoctors;
