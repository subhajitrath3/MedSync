import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Clock,
  Building2,
  Users,
  Pill,
  Activity,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionWrapper from "@/components/shared/SectionWrapper";

const flowSteps = [
  { icon: Users, label: "Doctor", color: "primary" },
  { icon: ArrowRight, label: "", isArrow: true },
  { icon: FileText, label: "MedSync", color: "gradient" },
  { icon: ArrowRight, label: "", isArrow: true },
  { icon: Users, label: "Patient", color: "secondary" },
  { icon: ArrowRight, label: "", isArrow: true },
  { icon: Pill, label: "Pharmacy", color: "primary" },
  { icon: ArrowRight, label: "", isArrow: true },
  { icon: Building2, label: "Hospital", color: "secondary" },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "256-bit AES encryption protects all data in transit and at rest.",
  },
  {
    icon: Eye,
    title: "Role-Based Access",
    description: "Only authorized healthcare providers can access relevant patient data.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Fully compliant with healthcare data protection regulations.",
  },
];

const mockPrescriptions = [
  {
    date: "Dec 12, 2024",
    doctor: "Dr. Sarah Johnson",
    diagnosis: "Upper Respiratory Infection",
    medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
    status: "Active",
  },
  {
    date: "Nov 28, 2024",
    doctor: "Dr. Michael Chen",
    diagnosis: "Joint Pain",
    medications: ["Naproxen 250mg", "Calcium Supplement"],
    status: "Completed",
  },
  {
    date: "Oct 15, 2024",
    doctor: "Dr. Emily Rodriguez",
    diagnosis: "Skin Allergy",
    medications: ["Cetirizine 10mg", "Hydrocortisone Cream"],
    status: "Completed",
  },
];

const DigitalPrescription = () => {
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
              <FileText className="w-4 h-4" />
              Digital Prescriptions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Paperless Prescriptions, Seamless Care
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience the future of prescriptions — instant digital delivery, automatic syncing, and a complete medical profile that grows with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prescription Flow */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Prescription Automation Flow
          </h2>
          <p className="text-muted-foreground">
            From doctor's desk to pharmacy counter — fully automated
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4"
        >
          {flowSteps.map((step, index) => {
            if (step.isArrow) {
              return (
                <ArrowRight
                  key={index}
                  className="w-5 h-5 text-muted-foreground hidden sm:block"
                />
              );
            }

            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg ${
                    step.color === "gradient"
                      ? "bg-gradient-to-br from-primary to-secondary"
                      : step.color === "primary"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                >
                  <Icon className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground" />
                </div>
                <span className="mt-2 text-sm font-medium text-foreground">
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      {/* Digital Medical Profile */}
      <SectionWrapper background="gradient">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">Your Health Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Digital Medical Profile
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every consultation, prescription, and medical record automatically becomes part of your comprehensive health profile. No more carrying folders or remembering past medications.
            </p>

            <div className="space-y-4">
              {[
                { icon: Activity, text: "Auto-updated consultation history" },
                { icon: Pill, text: "Complete prescription records" },
                { icon: FileText, text: "Lab reports and diagnostics" },
                { icon: Clock, text: "Chronological medical timeline" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-6 shadow-xl border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Medical Timeline</h3>
              <span className="text-xs text-muted-foreground">Last 3 months</span>
            </div>

            <div className="space-y-4">
              {mockPrescriptions.map((rx, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/50 rounded-xl p-4 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {rx.date}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rx.status === "Active"
                          ? "bg-secondary/20 text-secondary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium">
                    {rx.diagnosis}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rx.doctor}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {rx.medications.map((med, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Security Section */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-medium">Security First</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Your Data, Fully Protected
          </h2>
          <p className="text-muted-foreground">
            We employ industry-leading security measures to ensure your medical data remains private and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-muted/50 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8"
        >
          {["HIPAA Compliant", "SOC 2 Type II", "ISO 27001", "GDPR Ready"].map(
            (badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-medium text-foreground">{badge}</span>
              </div>
            )
          )}
        </motion.div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Building Your Digital Health Profile
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Book your first appointment and experience seamless digital prescriptions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/find-doctors">
                Find a Doctor
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default DigitalPrescription;
