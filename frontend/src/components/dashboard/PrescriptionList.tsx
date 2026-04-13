import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, User, Pill, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Prescription {
  id: string;
  date: string;
  doctor: {
    name: string;
    specialization: string;
    avatar?: string;
  };
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  advice?: string;
  followUpDate?: string;
  isActive: boolean;
}

interface PrescriptionListProps {
  showCreateButton?: boolean;
}

export default function PrescriptionList({ showCreateButton = true }: PrescriptionListProps) {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  // Mock data - replace with actual API call
  const prescriptions: Prescription[] = [
    {
      id: '1',
      date: '2025-12-15',
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100',
      },
      diagnosis: 'Hypertension',
      medications: [
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days',
        },
        {
          name: 'Aspirin',
          dosage: '75mg',
          frequency: 'Once daily',
          duration: '30 days',
        },
      ],
      advice: 'Reduce salt intake, exercise regularly, monitor blood pressure daily',
      followUpDate: '2026-01-15',
      isActive: true,
    },
    {
      id: '2',
      date: '2025-12-01',
      doctor: {
        name: 'Dr. Michael Chen',
        specialization: 'General Physician',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100',
      },
      diagnosis: 'Upper Respiratory Infection',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7 days',
        },
        {
          name: 'Paracetamol',
          dosage: '500mg',
          frequency: 'As needed for fever',
          duration: '5 days',
        },
      ],
      advice: 'Stay hydrated, rest well, avoid cold drinks',
      isActive: false,
    },
    {
      id: '3',
      date: '2025-11-20',
      doctor: {
        name: 'Dr. Emily Rodriguez',
        specialization: 'Dermatologist',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100',
      },
      diagnosis: 'Eczema',
      medications: [
        {
          name: 'Hydrocortisone Cream',
          dosage: '1%',
          frequency: 'Twice daily',
          duration: '14 days',
        },
      ],
      advice: 'Avoid harsh soaps, moisturize regularly',
      followUpDate: '2025-12-20',
      isActive: true,
    },
  ];

  const handleDownload = (prescription: Prescription) => {
    // Implement PDF download logic
    console.log('Downloading prescription:', prescription.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Digital Prescriptions</span>
              </CardTitle>
              <CardDescription>View and manage your medical prescriptions</CardDescription>
            </div>
            {showCreateButton && (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {prescriptions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No prescriptions found</p>
            </div>
          ) : (
            prescriptions.map((prescription, index) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={prescription.doctor.avatar} />
                          <AvatarFallback>{prescription.doctor.name[4]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{prescription.doctor.name}</h4>
                            <Badge variant="secondary">{prescription.doctor.specialization}</Badge>
                            {prescription.isActive && (
                              <Badge className="bg-green-500">Active</Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>Prescribed: {new Date(prescription.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium text-foreground">Diagnosis: {prescription.diagnosis}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Pill className="h-4 w-4" />
                              <span>{prescription.medications.length} medication(s) prescribed</span>
                            </div>
                            {prescription.followUpDate && (
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-green-600">
                                  Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPrescription(prescription)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Prescription Details</DialogTitle>
                              <DialogDescription>
                                Issued on {new Date(prescription.date).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPrescription && (
                              <div className="space-y-6">
                                {/* Doctor Info */}
                                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage src={selectedPrescription.doctor.avatar} />
                                    <AvatarFallback>{selectedPrescription.doctor.name[4]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold text-lg">{selectedPrescription.doctor.name}</h3>
                                    <p className="text-muted-foreground">{selectedPrescription.doctor.specialization}</p>
                                  </div>
                                </div>

                                {/* Diagnosis */}
                                <div>
                                  <h4 className="font-semibold mb-2">Diagnosis</h4>
                                  <p className="text-muted-foreground">{selectedPrescription.diagnosis}</p>
                                </div>

                                {/* Medications */}
                                <div>
                                  <h4 className="font-semibold mb-3">Medications</h4>
                                  <div className="space-y-3">
                                    {selectedPrescription.medications.map((med, idx) => (
                                      <div key={idx} className="p-4 border rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                          <h5 className="font-semibold text-primary">{med.name}</h5>
                                          <Badge>{med.dosage}</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                          <div>
                                            <span className="font-medium">Frequency:</span> {med.frequency}
                                          </div>
                                          <div>
                                            <span className="font-medium">Duration:</span> {med.duration}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Advice */}
                                {selectedPrescription.advice && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Doctor's Advice</h4>
                                    <p className="text-muted-foreground">{selectedPrescription.advice}</p>
                                  </div>
                                )}

                                {/* Follow-up */}
                                {selectedPrescription.followUpDate && (
                                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center space-x-2 text-green-700">
                                      <Calendar className="h-5 w-5" />
                                      <span className="font-semibold">
                                        Follow-up scheduled: {new Date(selectedPrescription.followUpDate).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(prescription)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
