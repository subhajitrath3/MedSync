import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  MapPin,
  Clock,
  User,
  LogOut,
  Bell,
  Settings,
  Activity,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import PrescriptionList from './PrescriptionList.tsx';
import BookAppointment from './BookAppointment.tsx';
import FindDoctorsSection from './FindDoctorsSection.tsx';

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Helper to get display name with fallback
  const getDisplayName = () => {
    console.log('Current user in PatientDashboard:', user);
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Helper to get initials
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const quickActions = [
    {
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule with a doctor',
      action: () => setActiveTab('book-appointment'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: MapPin,
      title: 'Find Doctors',
      description: 'AI-powered doctor search',
      action: () => setActiveTab('find-doctors'),
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: FileText,
      title: 'My Prescriptions',
      description: 'View digital records',
      action: () => setActiveTab('prescriptions'),
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const upcomingAppointments: any[] = [];

  const healthStats = [
    { label: 'Appointments', value: '0', icon: Calendar, color: 'text-blue-600' },
    { label: 'Prescriptions', value: '0', icon: FileText, color: 'text-green-600' },
    { label: 'Doctors', value: '0', icon: User, color: 'text-purple-600' },
    { label: 'Health Score', value: '0%', icon: Activity, color: 'text-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.jpeg" 
                alt="MedSync Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-lg"
              />
              <span className="text-xl font-bold text-gray-900">MedSync</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={logout} className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {getDisplayName()}! 👋
                </h1>
                <p className="text-muted-foreground">Manage your health journey in one place</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {healthStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color.replace('text-', 'from-')} to-opacity-20`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="find-doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="book-appointment">Book Appointment</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={action.action}
                      className="border-0 shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full"
                    >
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Upcoming Appointments</span>
                  </CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No upcoming appointments</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setActiveTab('book-appointment')}
                      >
                        Book Your First Appointment
                      </Button>
                    </div>
                  ) : (
                    <>
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.avatar} />
                              <AvatarFallback>{appointment.doctor[4]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{appointment.doctor}</p>
                              <p className="text-sm text-muted-foreground">{appointment.specialization}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-sm font-medium">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{appointment.date} • {appointment.time}</span>
                            </div>
                            <Badge variant="secondary" className="mt-1">
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Appointments
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <PrescriptionList />
          </TabsContent>

          {/* Find Doctors Tab */}
          <TabsContent value="find-doctors">
            <FindDoctorsSection onSelectDoctor={(doctor) => {
              setSelectedDoctor(doctor);
              setActiveTab('book-appointment');
            }} />
          </TabsContent>

          {/* Book Appointment Tab */}
          <TabsContent value="book-appointment">
            <BookAppointment onBack={() => setActiveTab('overview')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
