---
title: MedSync - Medical Appointment Platform
emoji: 🏥
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# MedSync - Medical Appointment Platform 🏥

A modern medical appointment platform that connects patients with healthcare providers, powered by AI technology.

## 🌟 Live Demo

This application is deployed on Hugging Face Spaces using Docker. Experience the full-stack medical appointment system with:

- 🗺️ Interactive doctor search with maps
- 🤖 AI-powered doctor recommendations
- 📅 Smart appointment scheduling
- 📋 Digital prescription management
- 🔐 Secure authentication

## ✨ Key Features

### For Patients
- **Interactive Map**: Find nearby doctors using Leaflet.js and OpenStreetMap
- **AI Doctor Recommendations**: Get personalized doctor suggestions based on symptoms
- **Smart Scheduling**: AI-optimized appointment booking with availability detection
- **Advanced Search**: Filter by specialization, rating, distance, and experience
- **Responsive Design**: Seamless experience across all devices
- **Secure Authentication**: JWT-based user authentication

### For Doctors
- **Digital Prescriptions**: Create and manage prescriptions with AI assistance
- **AI Prescription Assistant**: Get diagnosis and medication suggestions
- **Appointment Management**: View and manage patient appointments
- **Patient Dashboard**: Track patient history and visits

### AI-Powered Features (Groq Integration)
- **Doctor Matching**: Llama 3.3 70B model analyzes patient requirements
- **Prescription Assistance**: AI-generated diagnosis and medication recommendations
- **Smart Scheduling**: Intelligent time slot optimization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Routing**: React Router v6
- **Maps**: Leaflet.js + react-leaflet
- **Animation**: Framer Motion

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary integration
- **Security**: Helmet, CORS, Rate Limiting

### AI Integration
- **Provider**: Groq AI (Llama 3.3 70B)

### Deployment
- **Platform**: Hugging Face Spaces
- **Container**: Docker (Multi-stage build)
- **Web Server**: Nginx
- **Database**: MongoDB Atlas

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://huggingface.co/spaces/your-username/medsync
cd medsync
```

2. **Set up environment variables**
```bash
cp .env.example backend/.env
# Edit backend/.env with your configuration
```

3. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **Run the application**
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:5000` for the API.

## 🐳 Docker Deployment

### Using Docker Compose (Local)
```bash
docker-compose up --build
```

### Building for Hugging Face Spaces
The included `Dockerfile` is optimized for Hugging Face Spaces deployment with:
- Multi-stage build for optimized image size
- Nginx for serving frontend static files
- Backend API on port 5000
- Exposed on port 7860 (Hugging Face standard)

## 📝 Environment Variables

### Required Variables
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medsync
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-space-name.hf.space
```

### Optional Variables
```bash
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📚 API Documentation

The API follows RESTful conventions with the following main endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/doctors` - List all doctors
- `POST /api/appointments` - Book appointment
- `POST /api/prescriptions` - Create prescription
- `GET /api/users/profile` - Get user profile

Full API documentation available at `/api/docs` when running locally.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet security headers
- Input validation
- XSS protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn/ui for the beautiful UI components
- Groq for AI capabilities
- OpenStreetMap for mapping services
- MongoDB Atlas for database hosting
- Hugging Face for deployment platform

## 📞 Support

For support, please open an issue in the repository or contact the development team.

## 🔗 Links

- [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces)
- [Project Repository](https://github.com/your-username/medsync)
- [Live Demo](https://huggingface.co/spaces/your-username/medsync)

---

Built with ❤️ by the MedSync Team
