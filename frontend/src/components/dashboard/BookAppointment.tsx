import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, User, MapPin, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { groqService } from '../../services/groqService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function BookAppointment({ onBack }: { onBack?: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [aiRecommendedSlots, setAiRecommendedSlots] = useState<string[]>([]);
  const [aiReasoning, setAiReasoning] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    consultationType: 'in-person',
    symptoms: '',
    previousMedicalHistory: '',
    emergencyContact: '',
    notes: '',
  });

  // Simulate getting booked slots for a selected date
  const getBookedSlotsForDate = (date: string): string[] => {
    // In production, this would be an API call
    // Simulating some booked slots
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 1 || dayOfWeek === 3) { // Monday or Wednesday
      return ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
    } else if (dayOfWeek === 2 || dayOfWeek === 4) { // Tuesday or Thursday
      return ['10:00 AM', '01:00 PM', '03:00 PM'];
    }
    return ['09:00 AM', '12:00 PM']; // Other days
  };

  // Generate available time slots (excluding booked ones)
  const generateAvailableSlots = async (date: string) => {
    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];
    
    const booked = getBookedSlotsForDate(date);
    setBookedSlots(booked);
    
    const available = allSlots.filter(slot => !booked.includes(slot));
    setAvailableSlots(available);
    
    // Get AI recommendations
    setIsLoadingSlots(true);
    try {
      const result = await groqService.getOptimizedTimeSlots(booked, formData.symptoms);
      setAiRecommendedSlots(result.recommended);
      setAiReasoning(result.reasoning);
      
      toast({
        title: '✨ Smart Scheduling',
        description: `Found ${available.length} available slots. AI recommends ${result.recommended.length} optimal times.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('AI slot optimization error:', error);
      toast({
        title: '📅 Available Slots',
        description: `Found ${available.length} available slots for ${new Date(date).toLocaleDateString()}`,
        duration: 3000,
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // Handle date selection
  useEffect(() => {
    if (formData.appointmentDate) {
      generateAvailableSlots(formData.appointmentDate);
      setSelectedDate(formData.appointmentDate);
    }
  }, [formData.appointmentDate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Connect to appointmentService.bookAppointment()
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: 'Appointment Booked!',
        description: 'Your appointment has been scheduled successfully. You will receive a confirmation email shortly.',
      });
      
      // Reset form
      setFormData({
        patientName: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        appointmentDate: '',
        appointmentTime: '',
        consultationType: 'in-person',
        symptoms: '',
        previousMedicalHistory: '',
        emergencyContact: '',
        notes: '',
      });
      
      if (onBack) onBack();
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
        description: error.message || 'Failed to book appointment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book an Appointment</CardTitle>
          <CardDescription>Fill in the details below to schedule your appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Personal Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Full Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="John Doe"
                    value={formData.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      required
                      min="1"
                      max="120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-10"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Appointment Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Preferred Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => handleChange('appointmentDate', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select
                    value={formData.consultationType}
                    onValueChange={(value) => handleChange('consultationType', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Smart Time Slot Selection */}
              {formData.appointmentDate && availableSlots.length > 0 && (
                <div className="space-y-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <Label className="text-base font-semibold">AI-Optimized Available Slots</Label>
                    <Badge variant="secondary">
                      {availableSlots.length} slots available
                    </Badge>
                  </div>
                  {aiReasoning && (
                    <p className="text-sm text-muted-foreground italic">
                      💡 {aiReasoning}
                    </p>
                  )}
                  {isLoadingSlots ? (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Analyzing optimal time slots...
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {availableSlots.map((slot) => {
                        const isRecommended = aiRecommendedSlots.includes(slot);
                        return (
                          <Button
                            key={slot}
                            type="button"
                            variant={formData.appointmentTime === slot ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleChange('appointmentTime', slot)}
                            className={`relative ${isRecommended ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                          >
                            {formData.appointmentTime === slot && (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            )}
                            {slot}
                            {isRecommended && (
                              <Sparkles className="h-3 w-3 ml-1 text-primary" />
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Or Enter Custom Time</Label>
                <Input
                  id="appointmentTime"
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => handleChange('appointmentTime', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Medical Information</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Current Symptoms / Reason for Visit *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms or reason for appointment..."
                    value={formData.symptoms}
                    onChange={(e) => handleChange('symptoms', e.target.value)}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousMedicalHistory">Previous Medical History (if any)</Label>
                  <Textarea
                    id="previousMedicalHistory"
                    placeholder="Any chronic conditions, allergies, previous surgeries..."
                    value={formData.previousMedicalHistory}
                    onChange={(e) => handleChange('previousMedicalHistory', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any other information you'd like the doctor to know..."
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading} className="min-w-[150px]">
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
