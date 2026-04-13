import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Loader2, Sparkles, Brain, FileText, Pill } from 'lucide-react';
import { groqService } from '../../services/groqService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function CreatePrescription() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<{diagnosis: string, medications: Array<{name: string, dosage: string, frequency: string, duration?: string, instructions?: string}>} | null>(null);
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentId: '',
    diagnosis: '',
    advice: '',
    followUpDate: '',
  });
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' },
  ]);

  // AI-powered diagnosis and medication suggestions
  const getAiSuggestions = async () => {
    if (!symptoms.trim()) {
      toast({
        title: 'Please enter symptoms',
        description: 'Describe the patient\'s symptoms to get AI suggestions',
        variant: 'destructive',
      });
      return;
    }

    setAiLoading(true);
    try {
      const suggestions = await groqService.getPrescriptionSuggestions(symptoms);

      setAiSuggestions(suggestions);
      toast({
        title: '✨ AI Suggestions Ready',
        description: `Generated diagnosis and ${suggestions.medications.length} medication suggestions`,
        duration: 3000,
      });
    } catch (error) {
      console.error('AI prescription error:', error);
      toast({
        title: 'AI Error',
        description: 'Failed to generate suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Apply AI suggestion to diagnosis
  const applyDiagnosisSuggestion = (diagnosis: string) => {
    setFormData(prev => ({ ...prev, diagnosis }));
    toast({
      title: 'Diagnosis Applied',
      description: 'AI suggestion added to diagnosis field',
      duration: 2000,
    });
  };

  // Apply AI suggestion to medications
  const applyMedicationSuggestion = (med: {name: string, dosage: string, frequency: string}) => {
    const newMed: Medication = {
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: '7 days',
      instructions: 'After meals'
    };
    setMedications(prev => [...prev, newMed]);
    toast({
      title: 'Medication Added',
      description: `${med.name} added to prescription`,
      duration: 2000,
    });
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', frequency: '', duration: '', instructions: '' },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: 'Prescription Created',
        description: 'Digital prescription has been successfully created and sent to patient.',
      });

      // Reset form
      setFormData({
        patientId: '',
        appointmentId: '',
        diagnosis: '',
        advice: '',
        followUpDate: '',
      });
      setMedications([{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create prescription',
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
    >
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-600 text-white">
          <CardTitle>Create Digital Prescription</CardTitle>
          <CardDescription className="text-blue-50">
            Fill in the details to generate a digital prescription for your patient
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient & Appointment Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient *</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData({ ...formData, patientId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith</SelectItem>
                    <SelectItem value="2">Emma Wilson</SelectItem>
                    <SelectItem value="3">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointmentId">Appointment *</Label>
                <Select
                  value={formData.appointmentId}
                  onValueChange={(value) => setFormData({ ...formData, appointmentId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Today 10:00 AM - John Smith</SelectItem>
                    <SelectItem value="2">Today 11:30 AM - Emma Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* AI Prescription Assistant */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">AI Prescription Assistant</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Powered by AI
                  </Badge>
                </div>
                <CardDescription>
                  Enter patient symptoms to get AI-powered diagnosis and medication suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Patient Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., high fever, persistent cough, severe headache..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="button"
                  onClick={getAiSuggestions}
                  disabled={!symptoms.trim() || aiLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Get AI Suggestions
                    </>
                  )}
                </Button>

                {aiSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-2"
                  >
                    {/* Suggested Diagnosis */}
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          <Label className="text-sm font-semibold">Suggested Diagnosis</Label>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => applyDiagnosisSuggestion(aiSuggestions.diagnosis)}
                          className="h-7 text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700 pl-6">{aiSuggestions.diagnosis}</p>
                    </div>

                    {/* Suggested Medications */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="h-4 w-4 text-blue-600" />
                        <Label className="text-sm font-semibold">Suggested Medications</Label>
                      </div>
                      {aiSuggestions.medications.map((med, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-lg border border-blue-200 flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {med.dosage} • {med.frequency} • {med.duration}
                            </p>
                            {med.instructions && (
                              <p className="text-xs text-gray-500 mt-1 italic">{med.instructions}</p>
                            )}
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => applyMedicationSuggestion(med)}
                            className="h-7 text-xs ml-2"
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis *</Label>
              <Textarea
                id="diagnosis"
                placeholder="Enter the diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                rows={3}
                required
              />
            </div>

            {/* Medications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Medications *</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
              </div>

              {medications.map((medication, index) => (
                <Card key={index} className="p-4 border-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-semibold">Medication {index + 1}</Label>
                      {medications.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMedication(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Medicine Name *</Label>
                        <Input
                          placeholder="e.g., Paracetamol"
                          value={medication.name}
                          onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dosage *</Label>
                        <Input
                          placeholder="e.g., 500mg"
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency *</Label>
                        <Select
                          value={medication.frequency}
                          onValueChange={(value) => handleMedicationChange(index, 'frequency', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Once daily">Once daily</SelectItem>
                            <SelectItem value="Twice daily">Twice daily</SelectItem>
                            <SelectItem value="Three times daily">Three times daily</SelectItem>
                            <SelectItem value="Four times daily">Four times daily</SelectItem>
                            <SelectItem value="As needed">As needed</SelectItem>
                            <SelectItem value="Before meals">Before meals</SelectItem>
                            <SelectItem value="After meals">After meals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration *</Label>
                        <Input
                          placeholder="e.g., 7 days"
                          value={medication.duration}
                          onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Special Instructions</Label>
                      <Input
                        placeholder="e.g., Take with food"
                        value={medication.instructions}
                        onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Doctor's Advice */}
            <div className="space-y-2">
              <Label htmlFor="advice">Doctor's Advice</Label>
              <Textarea
                id="advice"
                placeholder="Additional recommendations for the patient"
                value={formData.advice}
                onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                rows={4}
              />
            </div>

            {/* Follow-up Date */}
            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Create Prescription
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
