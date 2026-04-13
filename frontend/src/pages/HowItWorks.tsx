import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  Video,
  FileText,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionWrapper from "@/components/shared/SectionWrapper";

const steps = [
  {
    icon: Search,
    title: "Search Doctor",
    description:
      "Find the right specialist based on your location, medical needs, and preferences. Our smart search filters help you discover doctors with the best ratings and availability.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description:
      "Choose a convenient time slot and book your appointment instantly. No phone calls needed — real-time availability at your fingertips.",
    color: "secondary",
  },
  {
    icon: Video,
    title: "Visit or Consult",
    description:
      "Visit the doctor in person or opt for a video consultation from the comfort of your home. Flexible options for modern healthcare.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Digital Prescription",
    description:
      "Receive your prescription digitally, complete with medication details, dosage instructions, and pharmacy recommendations.",
    color: "secondary",
  },
  {
    icon: RefreshCw,
    title: "Auto Sync Across System",
    description:
      "Your prescription and medical records automatically sync across all connected healthcare providers, pharmacies, and your personal health profile.",
    color: "primary",
  },
];

const benefits = [
  "No paperwork or manual record keeping",
  "Instant access to your medical history",
  "Seamless coordination between providers",
  "Secure, encrypted data transfer",
  "Available 24/7 on any device",
  "HIPAA compliant platform",
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-blue-light via-background to-health-green-light opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              Simple Process
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How MedSync Works
            </h1>
            <p className="text-lg text-muted-foreground">
              From finding a doctor to receiving your prescription — everything happens seamlessly in one unified platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Steps */}
      <SectionWrapper>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block -translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border inline-block max-w-lg ${
                        isEven ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-background ${
                        step.color === "primary"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      <Icon className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground" />
                    </motion.div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Empty space for layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper background="gradient">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">Why MedSync?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Benefits of a Unified System
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              MedSync eliminates the fragmentation in healthcare by connecting all stakeholders — patients, doctors, pharmacies, and hospitals — on a single, secure platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Sync Diagram */}
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
              <div className="text-center mb-8">
                <h3 className="font-semibold text-lg text-foreground">
                  Real-Time Data Flow
                </h3>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Center Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg z-10">
                    <RefreshCw className="w-8 h-8 text-primary-foreground animate-spin" style={{ animationDuration: '3s' }} />
                  </div>

                  {/* Orbiting Items */}
                  {["Patient", "Doctor", "Pharmacy", "Hospital"].map(
                    (item, index) => {
                      const angle = (index * 90 - 45) * (Math.PI / 180);
                      const radius = 100;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <motion.div
                          key={item}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-card rounded-xl shadow-card border border-border flex items-center justify-center"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                        >
                          <span className="text-xs font-medium text-foreground">
                            {item}
                          </span>
                        </motion.div>
                      );
                    }
                  )}

                  {/* Connection Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 256 256"
                  >
                    {[0, 1, 2, 3].map((i) => {
                      const angle = (i * 90 - 45) * (Math.PI / 180);
                      const x = 128 + Math.cos(angle) * 70;
                      const y = 128 + Math.sin(angle) * 70;
                      return (
                        <line
                          key={i}
                          x1="128"
                          y1="128"
                          x2={x}
                          y2={y}
                          stroke="hsl(var(--border))"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join MedSync today and experience the future of healthcare access.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/find-doctors">
                Find a Doctor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default HowItWorks;
