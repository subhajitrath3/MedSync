<div align="center">

# 🏥 MedSync

### AI-Powered Medical Appointment Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live Demo](https://huggingface.co/spaces) • [Documentation](PROJECT_DOCUMENTATION.md) • [Report Bug](../../issues) • [Request Feature](../../issues)**

</div>

---

## 📋 Overview

MedSync is a comprehensive full-stack medical appointment platform that connects patients with healthcare providers. Powered by AI technology using Groq's Llama 3.3 70B model, it delivers intelligent doctor recommendations, smart appointment scheduling, and AI-assisted prescription management.

### ✨ Key Features

#### 👨‍⚕️ For Patients
- 🗺️ **Interactive Map Search** - Find nearby doctors using Leaflet.js and OpenStreetMap integration
- 🤖 **AI-Powered Recommendations** - Get personalized doctor suggestions based on symptoms using Groq AI
- 📅 **Smart Appointment Booking** - AI-optimized scheduling with real-time availability
- 🔍 **Advanced Filtering** - Search by specialization, rating, distance, and experience
- 📱 **Fully Responsive** - Seamless experience across desktop, tablet, and mobile devices
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing

#### 👩‍⚕️ For Doctors
- 📋 **Digital Prescriptions** - Create and manage patient prescriptions digitally
- 🤖 **AI Prescription Assistant** - Get AI-powered diagnosis and medication suggestions
- 📊 **Appointment Management** - View, manage, and track patient appointments
- 👥 **Patient Dashboard** - Access patient history and medical records

#### 🤖 AI Features (Groq Integration)
- **Intelligent Doctor Matching** - Llama 3.3 70B analyzes patient symptoms and requirements
- **Prescription Suggestions** - AI-generated diagnosis and medication recommendations
- **Optimized Scheduling** - Smart time slot recommendations based on urgency

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 18.3.1 |
| **TypeScript** | Type Safety | Latest |
| **Vite** | Build Tool & Dev Server | Latest |
| **Tailwind CSS** | Utility-First CSS | 3.x |
| **shadcn/ui** | Component Library | Latest |
| **React Router** | Client-side Routing | 6.30.1 |
| **Leaflet.js** | Interactive Maps | 1.9.4 |
| **react-leaflet** | React Leaflet Bindings | 4.2.1 |
| **Framer Motion** | Animations | 12.x |
| **React Hook Form** | Form Management | 7.61.1 |
| **Zod** | Schema Validation | 3.25.76 |
| **Groq SDK** | AI Integration | 0.37.0 |
| **TanStack Query** | Data Fetching & Caching | 5.83.0 |
| **date-fns** | Date Utilities | 3.6.0 |
| **Lucide React** | Icon Library | Latest |

### Backend
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | Runtime Environment | 20+ |
| **Express.js** | Web Framework | 4.18.2 |
| **MongoDB** | Database | 7.0+ |
| **Mongoose** | ODM | 8.0.3 |
| **JWT** | Authentication | 9.0.2 |
| **bcryptjs** | Password Hashing | 2.4.3 |
| **Helmet** | Security Headers | 7.1.0 |
| **CORS** | Cross-Origin Resource Sharing | 2.8.5 |
| **Express Validator** | Input Validation | 7.0.1 |
| **Express Rate Limit** | Rate Limiting | 7.1.5 |
| **Cloudinary** | Image Upload & Storage | 2.8.0 |
| **Multer** | File Upload Middleware | 1.4.5 |
| **Morgan** | HTTP Request Logger | 1.10.0 |
| **Compression** | Response Compression | 1.7.4 |
| **Cookie Parser** | Cookie Parsing | 1.4.6 |
| **Nodemailer** | Email Service | 7.0.11 |

### DevOps & Deployment
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container Orchestration |
| **Nginx** | Web Server & Reverse Proxy |
| **Hugging Face Spaces** | Cloud Deployment Platform |

---

## 📁 Project Structure

```
MedSync_JK1/
├── backend/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/        # Business logic & request handlers
│   │   │   ├── authController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── doctorController.js
│   │   │   ├── prescriptionController.js
│   │   │   └── userController.js
│   │   ├── models/             # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Doctor.js
│   │   │   ├── Appointment.js
│   │   │   ├── Prescription.js
│   │   │   ├── Hospital.js
│   │   │   └── Review.js
│   │   ├── routes/             # API endpoints
│   │   │   ├── authRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── doctorRoutes.js
│   │   │   ├── prescriptionRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── middlewares/        # Express middlewares
│   │   │   ├── auth.js         # JWT authentication
│   │   │   ├── roleCheck.js    # Role-based access control
│   │   │   ├── validator.js    # Request validation
│   │   │   └── errorHandler.js # Global error handling
│   │   ├── validators/         # Input validation schemas
│   │   │   ├── authValidator.js
│   │   │   ├── appointmentValidator.js
│   │   │   └── doctorValidator.js
│   │   ├── utils/              # Helper functions
│   │   │   ├── apiResponse.js  # Standardized API responses
│   │   │   ├── helpers.js      # Utility functions
│   │   │   └── tokenGenerator.js # JWT token generation
│   │   ├── config/
│   │   │   └── database.js     # MongoDB connection
│   │   └── app.js              # Express app configuration
│   ├── server.js               # Entry point
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   │   ├── FindDoctorsSection.tsx
│   │   │   │   ├── BookAppointment.tsx
│   │   │   │   ├── CreatePrescription.tsx
│   │   │   │   └── AISymptomChecker.tsx
│   │   │   ├── layout/         # Layout components
│   │   │   ├── shared/         # Shared components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/              # Route pages
│   │   │   ├── Index.tsx       # Homepage
│   │   │   ├── Login.tsx       # Authentication
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx   # User dashboard
│   │   │   ├── FindDoctors.tsx # Doctor search
│   │   │   ├── DigitalPrescription.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/           # API & external services
│   │   │   ├── api.ts          # Axios configuration
│   │   │   ├── authService.ts  # Authentication API
│   │   │   ├── appointmentService.ts
│   │   │   ├── doctorService.ts
│   │   │   ├── prescriptionService.ts
│   │   │   ├── groqService.ts  # Groq AI integration
│   │   │   └── index.ts
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # Authentication state
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useApi.ts
│   │   │   ├── use-toast.ts
│   │   │   └── use-mobile.tsx
│   │   ├── lib/
│   │   │   ├── api.ts          # API client
│   │   │   └── utils.ts        # Utility functions
│   │   ├── types/
│   │   │   └── api.ts          # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Multi-stage production build
├── nginx.conf                  # Nginx configuration
├── start.sh                    # Production startup script
├── package.json                # Root package scripts
├── .spacesignore              # Hugging Face ignore rules
├── deploy-to-hf.ps1           # HF deployment automation
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **MongoDB** 7.0+ (local installation or MongoDB Atlas)
- **Git**
- **Groq API Key** (optional, for AI features) - Get it from [console.groq.com](https://console.groq.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medsync.git
   cd MedSync_JK1
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   Or install separately:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**

   **Backend** - Create `backend/.env`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/medsync
   
   # JWT Authentication
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   
   # CORS
   CLIENT_URL=http://localhost:8080
   
   # Optional: Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **Frontend** - Create `frontend/.env`:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   
   # Groq AI (optional)
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start MongoDB** (if using local instance)
   ```bash
   mongod
   ```

5. **Run the development servers**

   **Option A: Using npm scripts (from root)**
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend  
   npm run dev:frontend
   ```
   
   **Option B: Manually**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - **Frontend**: http://localhost:8080
   - **Backend API**: http://localhost:5000
   - **API Health Check**: http://localhost:5000/health

---

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and start all services**
   ```bash
   npm run docker:up
   # or
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   npm run docker:logs
   # or
   docker-compose logs -f
   ```

3. **Stop services**
   ```bash
   npm run docker:down
   # or
   docker-compose down
   ```

### Production Docker Build

For production deployment with the multi-stage Dockerfile:

```bash
# Build the image
docker build -t medsync:latest .

# Run the container
docker run -d -p 7860:7860 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  -e CLIENT_URL="https://your-domain.com" \
  medsync:latest
```

---

## ☁️ Deploy to Hugging Face Spaces

MedSync is ready for one-click deployment to Hugging Face Spaces with Docker.

### Quick Deployment

1. **Run the automated deployment script**
   ```powershell
   .\deploy-to-hf.ps1
   ```

2. **Configure secrets in your Space**
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Random 32+ character string
   - `CLIENT_URL` - Your Space URL
   - `GROQ_API_KEY` - (Optional) For AI features

3. **Wait for build** (5-10 minutes)

For detailed instructions, see:
- 📖 [DEPLOY_NOW.md](DEPLOY_NOW.md) - Step-by-step guide
- 🚀 [QUICKSTART_HF.md](QUICKSTART_HF.md) - Quick reference
- 📚 [HUGGINGFACE_DEPLOYMENT.md](HUGGINGFACE_DEPLOYMENT.md) - Advanced setup

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/updatePassword` | Update password | Yes |

### Doctor Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/doctors` | Get all doctors | No |
| GET | `/api/doctors/:id` | Get doctor by ID | No |
| GET | `/api/doctors/search` | Search doctors | No |
| POST | `/api/doctors` | Create doctor profile | Yes (Doctor) |
| PUT | `/api/doctors/:id` | Update doctor profile | Yes (Doctor) |

### Appointment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/appointments` | Get user appointments | Yes |
| GET | `/api/appointments/:id` | Get appointment by ID | Yes |
| POST | `/api/appointments` | Book appointment | Yes |
| PUT | `/api/appointments/:id` | Update appointment | Yes |
| DELETE | `/api/appointments/:id` | Cancel appointment | Yes |

### Prescription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/prescriptions` | Get user prescriptions | Yes |
| GET | `/api/prescriptions/:id` | Get prescription by ID | Yes |
| POST | `/api/prescriptions` | Create prescription | Yes (Doctor) |
| PUT | `/api/prescriptions/:id` | Update prescription | Yes (Doctor) |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users/appointments` | Get user appointments | Yes |

---

## 🤖 AI Features

### Groq AI Integration

MedSync uses Groq's Llama 3.3 70B Versatile model for intelligent features:

#### 1. Doctor Recommendations
```typescript
// Get AI-powered doctor recommendations
const recommendations = await groqService.getDoctorRecommendations(
  "I have chest pain and difficulty breathing",
  availableDoctors
);
```

#### 2. Prescription Suggestions
```typescript
// Get AI-generated prescription suggestions
const suggestions = await groqService.getPrescriptionSuggestions(
  "Fever, cough, and body ache for 3 days"
);
```

#### 3. Smart Scheduling
```typescript
// Get optimized appointment time slots
const optimizedSlots = await groqService.getOptimizedTimeSlots(
  bookedAppointments,
  patientSymptoms
);
```

### Configuration

Add your Groq API key to `frontend/.env`:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com)

---

## 🗺️ Map Integration

### Leaflet.js + OpenStreetMap

MedSync uses Leaflet.js for interactive doctor location mapping:

- **Interactive Markers** - Click on doctor locations
- **Custom Popups** - View doctor information
- **Real-time Filtering** - Update map based on search
- **Responsive** - Works on all devices

### Configuration

Map functionality is built-in and requires no additional API keys. Uses OpenStreetMap tiles.

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **CORS Protection** - Configured for specific origins
- ✅ **Helmet Security Headers** - XSS, clickjacking protection
- ✅ **Rate Limiting** - Prevent brute force attacks
- ✅ **Input Validation** - Express Validator & Zod schemas
- ✅ **SQL Injection Prevention** - Mongoose ODM
- ✅ **Error Handling** - Centralized error middleware
- ✅ **Environment Variables** - Sensitive data protection

---

## 📱 Responsive Design

MedSync is fully responsive and works seamlessly on:
- 💻 Desktop (1920px and above)
- 💼 Laptop (1024px - 1919px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

Built with Tailwind CSS mobile-first approach and shadcn/ui components.

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Run Tests Once
```bash
cd backend
npm run test:once
```

---

## 🛠️ Available Scripts

### Root Directory
```bash
npm run install:all      # Install all dependencies
npm run dev:backend      # Run backend dev server
npm run dev:frontend     # Run frontend dev server
npm run build:all        # Build both frontend and backend
npm run docker:build     # Build Docker images
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs
npm run clean            # Clean node_modules
```

### Backend
```bash
npm start               # Start production server
npm run dev            # Start development server with nodemon
npm test               # Run tests in watch mode
npm run test:once      # Run tests once
```

### Frontend
```bash
npm run dev            # Start Vite dev server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## 🌐 Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medsync

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:8080

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)

```env
# API
VITE_API_URL=http://localhost:5000/api

# Groq AI (Optional)
VITE_GROQ_API_KEY=your_groq_api_key
```

---

## 📖 Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Complete project documentation
- **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Deployment guide
- **[QUICKSTART_HF.md](QUICKSTART_HF.md)** - Hugging Face quick start
- **[HUGGINGFACE_DEPLOYMENT.md](HUGGINGFACE_DEPLOYMENT.md)** - Detailed HF deployment
- **[DEPLOYMENT_QUICKREF.txt](DEPLOYMENT_QUICKREF.txt)** - Quick reference card

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**MedSync Team**

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Leaflet.js](https://leafletjs.com/) - Map library
- [Groq](https://groq.com/) - AI infrastructure
- [MongoDB](https://www.mongodb.com/) - Database
- [Hugging Face](https://huggingface.co/) - Deployment platform

---

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

## 🗺️ Roadmap

- [ ] Video consultation integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Electronic health records (EHR)
- [ ] Telemedicine features
- [ ] SMS/Email notifications

---

<div align="center">

**Made with ❤️ by the MedSync Team**

⭐ Star this repository if you found it helpful!

</div>
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Containers
```bash
# Backend
cd backend
docker build -t medsync-backend .
docker run -p 5000:5000 --env-file .env medsync-backend

# Frontend
cd frontend
docker build -t medsync-frontend .
docker run -p 8080:80 medsync-frontend
```

## 📦 Production Build

### Windows
```bash
build.bat
```

### Linux/Mac
```bash
chmod +x build.sh
./build.sh
```

### Manual Build
```bash
# Backend
cd backend
npm install --production

# Frontend
cd frontend
npm install
npm run build
```

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions including:
- Vercel + Render deployment
- Railway deployment
- Heroku deployment
- Docker deployment
- Environment configuration
- Security checklist
- Monitoring setup

## 🤖 AI Features

See [GROQ_AI_INTEGRATION.md](GROQ_AI_INTEGRATION.md) for details on:
- AI doctor recommendations
- Smart prescription assistant
- Intelligent appointment scheduling
- Groq API configuration
- Fallback strategies

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor (protected)

### Appointments
- `GET /api/appointments` - Get appointments (protected)
- `POST /api/appointments` - Book appointment (protected)
- `PUT /api/appointments/:id` - Update appointment (protected)

### Prescriptions
- `GET /api/prescriptions` - Get prescriptions (protected)
- `POST /api/prescriptions` - Create prescription (doctor only)

## 🔒 Security Features

- JWT authentication with httpOnly cookies
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- XSS protection
- MongoDB injection prevention

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review DEPLOYMENT_GUIDE.md

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Video consultations
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Email/SMS notifications
- [ ] Insurance integration

## ⚡ Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Optimized bundle size with code splitting
- Image optimization with Cloudinary

## 🙏 Acknowledgments

- Groq AI for powerful LLM capabilities
- OpenStreetMap for free map data
- shadcn/ui for beautiful components
- MongoDB Atlas for database hosting

---

**Built with ❤️ by the MedSync Team**

**Last Updated**: December 17, 2025
