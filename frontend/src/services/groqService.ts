import Groq from 'groq-sdk';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export const groqService = {
  async getDoctorRecommendations(requirements: string, doctors: any[]): Promise<string[]> {
    try {
      const doctorList = doctors.map(d => `ID: ${d.id}, Name: ${d.name}, Specialization: ${d.specialization}, Rating: ${d.rating}, Experience: ${d.experience} years`).join('\n');
      
      const prompt = `You are a medical AI assistant helping patients find the right doctor.

User Requirements: "${requirements}"

Available Doctors:
${doctorList}

Based on the user's requirements, recommend the most suitable doctor IDs (return ONLY the IDs as a comma-separated list, nothing else).
If the requirements mention specific symptoms or conditions, match them with appropriate specializations.
Consider both specialization relevance and doctor ratings.`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 100,
      });

      const response = completion.choices[0]?.message?.content || '';
      const doctorIds = response.split(',').map(id => id.trim()).filter(Boolean);
      
      return doctorIds.length > 0 ? doctorIds : doctors.slice(0, 3).map(d => d.id);
    } catch (error) {
      console.error('Groq API Error:', error);
      return this.fallbackDoctorRecommendations(requirements, doctors);
    }
  },

  fallbackDoctorRecommendations(requirements: string, doctors: any[]): string[] {
    const keywords = requirements.toLowerCase();
    const recommended: string[] = [];

    if (keywords.includes('heart') || keywords.includes('cardiac') || keywords.includes('chest pain')) {
      recommended.push('1');
    }
    if (keywords.includes('bone') || keywords.includes('joint') || keywords.includes('fracture')) {
      recommended.push('2');
    }
    if (keywords.includes('skin') || keywords.includes('acne') || keywords.includes('rash')) {
      recommended.push('3');
    }
    if (keywords.includes('brain') || keywords.includes('headache') || keywords.includes('nerve')) {
      recommended.push('4');
    }
    if (keywords.includes('child') || keywords.includes('baby') || keywords.includes('pediatric')) {
      recommended.push('5');
    }

    return recommended.length > 0 ? recommended : doctors.slice(0, 3).map(d => d.id);
  },

  async getPrescriptionSuggestions(symptoms: string): Promise<{
    diagnosis: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions: string;
    }>;
  }> {
    try {
      const prompt = `You are an AI medical assistant helping doctors write prescriptions.

Patient Symptoms: "${symptoms}"

Provide a diagnosis and medication recommendations in the following JSON format:
{
  "diagnosis": "Brief diagnosis based on symptoms",
  "medications": [
    {
      "name": "Medication name",
      "dosage": "Dosage amount (e.g., 500mg)",
      "frequency": "How often (e.g., Twice daily)",
      "duration": "How long (e.g., 5 days)",
      "instructions": "Special instructions"
    }
  ]
}

Return ONLY valid JSON, no additional text.`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content || '';
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Groq API Error:', error);
      return this.fallbackPrescriptionSuggestions(symptoms);
    }
  },

  fallbackPrescriptionSuggestions(symptoms: string) {
    const symptomText = symptoms.toLowerCase();
    
    if (symptomText.includes('fever') && symptomText.includes('cough')) {
      return {
        diagnosis: 'Upper Respiratory Tract Infection',
        medications: [
          { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', instructions: 'Take after meals' },
          { name: 'Amoxicillin', dosage: '250mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Complete the course' },
        ],
      };
    }
    
    if (symptomText.includes('headache')) {
      return {
        diagnosis: 'Tension Headache / Migraine',
        medications: [
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '3 days', instructions: 'Do not exceed 3 doses per day' },
        ],
      };
    }
    
    return {
      diagnosis: 'General Consultation Required',
      medications: [
        { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days', instructions: 'Take with breakfast' },
      ],
    };
  },

  async getOptimizedTimeSlots(
    bookedSlots: string[],
    patientPreference?: string
  ): Promise<{ recommended: string[]; reasoning: string }> {
    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];

    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    try {
      const prompt = `You are an AI assistant optimizing appointment scheduling.

Available time slots: ${availableSlots.join(', ')}
Patient preference: "${patientPreference || 'No preference'}"

Recommend the top 3-5 best time slots for the patient and explain why in one sentence.
Return in JSON format:
{
  "recommended": ["slot1", "slot2", "slot3"],
  "reasoning": "Brief explanation"
}`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.4,
        max_tokens: 200,
      });

      const response = completion.choices[0]?.message?.content || '';
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
      }

      throw new Error('Invalid response');
    } catch (error) {
      console.error('Groq API Error:', error);
      return {
        recommended: availableSlots.slice(0, 5),
        reasoning: 'Showing available morning and afternoon slots'
      };
    }
  },
};
