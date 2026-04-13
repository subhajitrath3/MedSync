import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Users,
  Clock,
  LogOut,
  Bell,
  Settings,
  TrendingUp,
  Plus,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import CreatePrescription from './CreatePrescription.tsx';
import PrescriptionList from './PrescriptionList.tsx';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Helper to get display name with fallback
  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Doctor';
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
    return 'D';
  };

  const quickActions = [
    {
      icon: Plus,
      title: 'New Prescription',
      description: 'Create digital prescription',
      action: () => setActiveTab('create-prescription'),
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      title: 'Today\'s Appointments',
      description: 'View scheduled patients',
      href: '/appointments',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      title: 'Patient Records',
      description: 'Access medical history',
      href: '/patients',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: FileText,
      title: 'All Prescriptions',
      description: 'View past records',
      action: () => setActiveTab('prescriptions'),
      gradient: 'from-pink-500 to-pink-600',
    },
  ];

  const todayAppointments: any[] = [];

  const stats = [
    { label: 'Today\'s Patients', value: '0', icon: Users, color: 'text-blue-600', change: '+0' },
    { label: 'Total Appointments', value: '0', icon: Calendar, color: 'text-green-600', change: '+0' },
    { label: 'Prescriptions', value: '0', icon: FileText, color: 'text-purple-600', change: '+0' },
    { label: 'Avg. Rating', value: '0', icon: TrendingUp, color: 'text-pink-600', change: '+0' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      confirmed: 'default',
      pending: 'secondary',
      completed: 'secondary',
    };
    return variants[status] || 'default';
  };

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
                  Welcome back, Dr. {getDisplayName()}! 👨‍⚕️
                </h1>
                <p className="text-muted-foreground">Ready to make a difference today</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
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
            <TabsTrigger value="create-prescription">Create Prescription</TabsTrigger>
            <TabsTrigger value="prescriptions">All Prescriptions</TabsTrigger>
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
                    {action.href ? (
                      <Link to={action.href}>
                        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full">
                          <CardContent className="p-6">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4`}>
                              <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-semibold mb-1">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ) : (
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
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Today's Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Today's Appointments</span>
                  </CardTitle>
                  <CardDescription>Your scheduled consultations for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todayAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No appointments scheduled for today</p>
                    </div>
                  ) : (
                    <>
                      {todayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.avatar} />
                              <AvatarFallback>{appointment.patient[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{appointment.patient}</p>
                              <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-sm font-medium">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">{appointment.type}</Badge>
                              <Badge variant={getStatusBadge(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
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

          {/* Create Prescription Tab */}
          <TabsContent value="create-prescription">
            <CreatePrescription />
          </TabsContent>

          {/* Prescriptions List Tab */}
          <TabsContent value="prescriptions">
            <PrescriptionList showCreateButton={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
