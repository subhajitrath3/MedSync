import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  ArrowRight,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  Globe,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionWrapper from "@/components/shared/SectionWrapper";

const values = [
  {
    icon: Heart,
    title: "Patient-First",
    description: "Every decision we make puts patients and their wellbeing at the center.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Healthcare should be accessible to everyone, everywhere, at any time.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in technology, service, and user experience.",
  },
];

const comparisonData = [
  {
    feature: "Doctor Discovery",
    manual: "Phone calls, referrals, trial and error",
    medsync: "Smart search with filters and ratings",
  },
  {
    feature: "Appointment Booking",
    manual: "Multiple calls, waiting on hold",
    medsync: "One-click instant booking",
  },
  {
    feature: "Prescriptions",
    manual: "Paper prescriptions, easy to lose",
    medsync: "Digital, auto-synced, always accessible",
  },
  {
    feature: "Medical History",
    manual: "Scattered across multiple providers",
    medsync: "Unified profile, complete timeline",
  },
  {
    feature: "Data Sharing",
    manual: "Manual faxing, delays",
    medsync: "Instant, secure, real-time",
  },
];

const teamStats = [
  { value: "50+", label: "Team Members" },
  { value: "10+", label: "Countries" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Remote First" },
];

const About = () => {
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
              About MedSync
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Transforming Healthcare, One Connection at a Time
            </h1>
            <p className="text-lg text-muted-foreground">
              We're building the future of healthcare access — where medical data flows securely and instantly between all who need it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-primary-foreground/90 leading-relaxed text-lg">
                A future where medical data flows securely and instantly between patients, doctors, pharmacies, and hospitals — eliminating barriers to quality healthcare.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-8 md:p-10 text-secondary-foreground relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <ul className="space-y-3">
                {[
                  "Reduce paperwork and administrative burden",
                  "Improve accuracy in medical records",
                  "Save patient time with streamlined access",
                  "Enable seamless provider collaboration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-secondary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Why MedSync - Comparison Table */}
      <SectionWrapper background="muted">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-medium">Why Choose Us?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            MedSync vs Traditional Systems
          </h2>
          <p className="text-muted-foreground">
            See how MedSync revolutionizes the healthcare experience
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-muted/50 p-4 md:p-6 border-b border-border">
            <div className="font-semibold text-foreground">Feature</div>
            <div className="font-semibold text-muted-foreground text-center">
              Manual System
            </div>
            <div className="font-semibold text-primary text-center">MedSync</div>
          </div>

          {/* Table Body */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid grid-cols-3 p-4 md:p-6 ${
                index < comparisonData.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="font-medium text-foreground">{row.feature}</div>
              <div className="flex items-start gap-2 justify-center text-center">
                <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5 hidden md:block" />
                <span className="text-sm text-muted-foreground">{row.manual}</span>
              </div>
              <div className="flex items-start gap-2 justify-center text-center">
                <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5 hidden md:block" />
                <span className="text-sm text-foreground">{row.medsync}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-medium">Our Values</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            What Drives Us Every Day
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Team Stats */}
      <SectionWrapper background="gradient">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Team Behind MedSync
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {teamStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient-primary">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
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
            Ready to Join the Future of Healthcare?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Whether you're a patient, provider, or healthcare organization — MedSync is built for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/find-doctors">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default About;
