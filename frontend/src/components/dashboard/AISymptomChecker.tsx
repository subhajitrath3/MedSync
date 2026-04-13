import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Loader2, User, Bot, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: DoctorRecommendation[];
}

interface DoctorRecommendation {
  name: string;
  specialization: string;
  rating: number;
  location: string;
  availability: string;
  experience: number;
}

export default function AISymptomChecker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI health assistant. Please describe your symptoms in detail, and I\'ll help you understand what might be causing them and recommend suitable doctors. \n\n**Note:** This is not a medical diagnosis. Always consult with a healthcare professional.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const mockRecommendations: DoctorRecommendation[] = [
        {
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiologist',
          rating: 4.8,
          location: 'City Hospital, Downtown',
          availability: 'Available Today',
          experience: 15,
        },
        {
          name: 'Dr. Michael Chen',
          specialization: 'Internal Medicine',
          rating: 4.9,
          location: 'MedCare Clinic',
          availability: 'Tomorrow 10 AM',
          experience: 12,
        },
        {
          name: 'Dr. Emily Rodriguez',
          specialization: 'General Physician',
          rating: 4.7,
          location: 'Health Plus Center',
          availability: 'Available Now',
          experience: 10,
        },
      ];

      const aiResponse: Message = {
        role: 'assistant',
        content: `Based on your symptoms (${userMessage}), here's what I found:\n\n**Possible Conditions:**\n- Common Cold or Flu\n- Respiratory Infection\n- Allergic Reaction\n\n**Severity:** Moderate - Requires medical attention within 24-48 hours\n\n**Recommendations:**\n✓ Stay hydrated\n✓ Get adequate rest\n✓ Monitor temperature\n✓ Book an appointment with a specialist\n\nI've found some highly-rated doctors who can help you:`,
        recommendations: mockRecommendations,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span>AI Symptom Checker & Doctor Recommender</span>
          </CardTitle>
          <CardDescription className="text-pink-50">
            Describe your symptoms and get instant doctor recommendations powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Avatar className={`h-8 w-8 ${message.role === 'assistant' ? 'bg-gradient-to-br from-pink-500 to-purple-600' : 'bg-primary'}`}>
                    <AvatarFallback>
                      {message.role === 'assistant' ? (
                        <Bot className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Doctor Recommendations */}
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {message.recommendations.map((doctor, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Card className="border-2 hover:border-primary transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h4 className="font-semibold">{doctor.name}</h4>
                                      <Badge variant="secondary">{doctor.specialization}</Badge>
                                    </div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                      <div className="flex items-center space-x-2">
                                        <span className="text-yellow-500">★</span>
                                        <span>{doctor.rating} Rating</span>
                                        <span>•</span>
                                        <span>{doctor.experience} years exp.</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{doctor.location}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-green-600 font-medium">
                                          {doctor.availability}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <Link to="/find-doctors">
                                    <Button size="sm" className="ml-4">
                                      Book
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                        <Link to="/find-doctors">
                          <Button variant="outline" className="w-full">
                            View All Doctors
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-pink-500 to-purple-600">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl p-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                placeholder="Describe your symptoms (e.g., 'I have a headache and fever for 2 days...')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            <Button type="submit" size="lg" disabled={loading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            ⚠️ This AI tool is for informational purposes only and does not replace professional medical advice.
            Always consult with a qualified healthcare provider for accurate diagnosis and treatment.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
