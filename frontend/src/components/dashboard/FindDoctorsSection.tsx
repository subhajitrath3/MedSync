import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Filter, Navigation, Phone, Mail, Loader2, Target, Sparkles, Brain } from 'lucide-react';
import { groqService } from '../../services/groqService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapView } from '@/components/shared/MapView';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  hospital: string;
  rating: number;
  available: boolean;
  distance?: number;
  image: string;
  phone?: string;
  email?: string;
  address?: string;
  consultationFee?: number;
  coordinates?: [number, number]; // [latitude, longitude]
}

interface FindDoctorsSectionProps {
  onSelectDoctor?: (doctor: Doctor) => void;
}

// Mock doctors data - will be replaced with real API call
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    hospital: 'City Heart Center',
    rating: 4.9,
    available: true,
    distance: 2.3,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    phone: '+1 234-567-8901',
    email: 'sarah.johnson@cityheart.com',
    address: '123 Main St, City Center',
    consultationFee: 150,
    coordinates: [28.6139, 77.2090], // Delhi coordinates
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Orthopedic Surgeon',
    experience: 12,
    hospital: 'Metro Bone & Joint Clinic',
    rating: 4.8,
    available: true,
    distance: 3.7,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
    phone: '+1 234-567-8902',
    email: 'michael.chen@metrobone.com',
    address: '456 Oak Ave, Downtown',
    consultationFee: 180,
    coordinates: [28.6189, 77.2190],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatologist',
    experience: 8,
    hospital: 'SkinCare Medical Center',
    rating: 4.7,
    available: false,
    distance: 1.5,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
    phone: '+1 234-567-8903',
    email: 'emily.rodriguez@skincare.com',
    address: '789 Pine Rd, Medical District',
    consultationFee: 120,
    coordinates: [28.6089, 77.2290],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Neurologist',
    experience: 20,
    hospital: 'Neuro Excellence Hospital',
    rating: 4.9,
    available: true,
    distance: 5.2,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
    phone: '+1 234-567-8904',
    email: 'james.wilson@neuroexcel.com',
    address: '321 Elm St, University Area',
    consultationFee: 200,
    coordinates: [28.6239, 77.1990],
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialization: 'Pediatrician',
    experience: 10,
    hospital: 'Children\'s Wellness Center',
    rating: 4.8,
    available: true,
    distance: 4.1,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face',
    phone: '+1 234-567-8905',
    email: 'lisa.park@childwellness.com',
    address: '654 Maple Dr, Suburbs',
    consultationFee: 100,
    coordinates: [28.6039, 77.2390],
  },
];

// Helper function to generate random coordinates near a location
const generateNearbyCoordinates = (lat: number, lng: number, radiusKm: number): [number, number] => {
  const radiusInDegrees = radiusKm / 111; // Approximate conversion
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  return [lat + y, lng + x];
};

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function FindDoctorsSection({ onSelectDoctor }: FindDoctorsSectionProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'experience'>('rating');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState(5); // km
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [aiRequirements, setAiRequirements] = useState('');
  const [showAiRecommendations, setShowAiRecommendations] = useState(false);
  const [aiRecommendedDoctors, setAiRecommendedDoctors] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const { toast} = useToast();

  // AI-powered doctor recommendation based on user requirements
  const getAiRecommendations = async () => {
    if (!aiRequirements.trim()) {
      toast({
        title: 'Please describe your requirements',
        description: 'Tell us what you\'re looking for in a doctor',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingAi(true);
    
    try {
      const recommended = await groqService.getDoctorRecommendations(
        aiRequirements,
        filteredDoctors
      );

      setAiRecommendedDoctors(recommended);
      setShowAiRecommendations(true);

      toast({
        title: '✨ AI Recommendations Ready',
        description: `Found ${recommended.length} doctors matching your requirements`,
        duration: 3000,
      });
    } catch (error) {
      console.error('AI recommendations error:', error);
      toast({
        title: 'AI Error',
        description: 'Failed to get AI recommendations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  const clearAiRecommendations = () => {
    setShowAiRecommendations(false);
    setAiRecommendedDoctors([]);
    setAiRequirements('');
  };

  // Get user's location and find nearby doctors
  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        
        // Simulate finding doctors near the user
        // In production, this would be an API call: /api/doctors/nearby?lat=X&lng=Y&radius=Z
        const nearbyDoctors = generateNearbyDoctors(newLocation, searchRadius);
        
        setDoctors(nearbyDoctors);
        setIsLoadingLocation(false);
        
        toast({
          title: '✓ Location Detected',
          description: `Found ${nearbyDoctors.length} doctors within ${searchRadius}km`,
          duration: 3000,
        });
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = 'Unable to access your location';
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location permission denied. Please enable location access in browser settings.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information unavailable. Please try again.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out. Please try again.';
        }
        
        setLocationError(errorMessage);
        toast({
          title: 'Location Error',
          description: errorMessage,
          variant: 'destructive',
          duration: 5000,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  // Generate nearby doctors based on user location and radius
  const generateNearbyDoctors = (location: { lat: number; lng: number }, radius: number): Doctor[] => {
    return mockDoctors.map((doctor) => {
      const nearbyCoords = generateNearbyCoordinates(
        location.lat,
        location.lng,
        radius
      );
      const distance = calculateDistance(
        location.lat,
        location.lng,
        nearbyCoords[0],
        nearbyCoords[1]
      );
      
      return {
        ...doctor,
        coordinates: nearbyCoords,
        distance: parseFloat(distance.toFixed(1))
      };
    }).filter(doctor => doctor.distance! <= radius); // Only show doctors within radius
  };

  // Update doctors when search radius changes
  const handleRadiusChange = (newRadius: number) => {
    setSearchRadius(newRadius);
    if (userLocation) {
      const nearbyDoctors = generateNearbyDoctors(userLocation, newRadius);
      setDoctors(nearbyDoctors);
      toast({
        title: 'Search Radius Updated',
        description: `Showing doctors within ${newRadius}km`,
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    // Auto-request location on mount
    requestLocation();
  }, []);

  // Update filtered doctors when radius changes
  useEffect(() => {
    if (userLocation) {
      const nearbyDoctors = generateNearbyDoctors(userLocation, searchRadius);
      setDoctors(nearbyDoctors);
    }
  }, [searchRadius]);

  // Filter and sort doctors
  useEffect(() => {
    let filtered = [...doctors];

    // AI Recommendations filter (takes priority)
    if (showAiRecommendations && aiRecommendedDoctors.length > 0) {
      filtered = filtered.filter(doctor => aiRecommendedDoctors.includes(doctor.id));
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Specialization filter
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(
        (doctor) => doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
      );
    }

    // Sort - Primary by selected criteria, secondary by rating
    filtered.sort((a, b) => {
      // AI recommended doctors appear first
      if (showAiRecommendations) {
        const aIsRecommended = aiRecommendedDoctors.includes(a.id);
        const bIsRecommended = aiRecommendedDoctors.includes(b.id);
        if (aIsRecommended && !bIsRecommended) return -1;
        if (!aIsRecommended && bIsRecommended) return 1;
      }

      switch (sortBy) {
        case 'distance':
          const distanceDiff = (a.distance || 999) - (b.distance || 999);
          return distanceDiff !== 0 ? distanceDiff : b.rating - a.rating;
        case 'rating':
          const ratingDiff = b.rating - a.rating;
          return ratingDiff !== 0 ? ratingDiff : (a.distance || 999) - (b.distance || 999);
        case 'experience':
          const expDiff = b.experience - a.experience;
          return expDiff !== 0 ? expDiff : b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialization, sortBy, doctors, showAiRecommendations, aiRecommendedDoctors]);

  const specializations = [
    'All Specializations',
    'Cardiologist',
    'Orthopedic Surgeon',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'General Physician',
  ];

  return (
    <div className="space-y-6">
      {/* AI Recommendations Input */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Doctor Recommendations
          </CardTitle>
          <CardDescription>
            Describe your symptoms or requirements, and our AI will recommend the best doctors for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: I have been experiencing chest pain and shortness of breath..."
            value={aiRequirements}
            onChange={(e) => setAiRequirements(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button onClick={getAiRecommendations} className="flex-1" disabled={isLoadingAi}>
              <Sparkles className="h-4 w-4 mr-2" />
              {isLoadingAi ? 'Analyzing...' : 'Get AI Recommendations'}
            </Button>
            {showAiRecommendations && (
              <Button onClick={clearAiRecommendations} variant="outline">
                Clear
              </Button>
            )}
          </div>
          {showAiRecommendations && (
            <div className="mt-4">
              <Badge className="bg-primary">
                ✨ Showing {aiRecommendedDoctors.length} AI-recommended doctor{aiRecommendedDoctors.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map View */}
      <Card className="border-0 shadow-md overflow-hidden">
        <div className="relative">
          {isLoadingLocation && (
            <div className="absolute inset-0 bg-white/80 z-[1000] flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Detecting your location...</p>
              </div>
            </div>
          )}
          <MapView 
            center={userLocation ? [userLocation.lat, userLocation.lng] : [28.6139, 77.2090]}
            zoom={userLocation ? 13 : 12}
            height="450px"
            userLocation={userLocation ? [userLocation.lat, userLocation.lng] : null}
            markers={filteredDoctors
              .filter(doctor => doctor.coordinates)
              .map(doctor => ({
                position: doctor.coordinates!,
                title: doctor.name,
                description: `${doctor.specialization} - ${doctor.hospital}`,
                address: doctor.address
              }))}
          />
          <div className="absolute top-4 right-4 z-[1000] flex gap-2">
            <Button
              size="sm"
              onClick={requestLocation}
              disabled={isLoadingLocation}
              className="bg-white hover:bg-gray-100 text-gray-900 shadow-md"
            >
              {isLoadingLocation ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Target className="h-4 w-4 mr-2" />
              )}
              {isLoadingLocation ? 'Locating...' : userLocation ? 'Refresh Location' : 'Find My Location'}
            </Button>
          </div>
          {locationError && (
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              <Badge variant="destructive" className="w-full justify-center py-2">
                {locationError}
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Search Radius Control */}
      {userLocation && (
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Search Radius: <span className="text-primary">{searchRadius}km</span>
                </label>
                <Badge variant="secondary">
                  {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
                </Badge>
              </div>
              <Slider
                value={[searchRadius]}
                onValueChange={(value) => handleRadiusChange(value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1km</span>
                <span>20km</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Search & Filter</span>
            </div>
            {userLocation && (
              <Badge variant="outline" className="text-xs">
                <Navigation className="h-3 w-3 mr-1" />
                Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search doctors, specialization, hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:col-span-1"
            />
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec === 'All Specializations' ? 'all' : spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">✨ Best Rated First</SelectItem>
                <SelectItem value="distance">📍 Nearest First</SelectItem>
                <SelectItem value="experience">👨‍⚕️ Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
          </h3>
          <Badge variant="outline">{selectedSpecialization === 'all' ? 'All Specializations' : selectedSpecialization}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.image} />
                      <AvatarFallback>{doctor.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{doctor.name}</h4>
                            {showAiRecommendations && aiRecommendedDoctors.includes(doctor.id) && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{doctor.rating}</span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.hospital}</span>
                          {doctor.distance && (
                            <Badge variant="secondary" className="text-xs">
                              {doctor.distance} km
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience} years experience</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            ${doctor.consultationFee} consultation fee
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => onSelectDoctor?.(doctor)}
                          disabled={!doctor.available}
                          className="flex-1"
                        >
                          {doctor.available ? 'Book Appointment' : 'Not Available'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>

                      {doctor.available && (
                        <Badge className="mt-2" variant="outline">
                          Available Today
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-lg font-semibold">No doctors found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
