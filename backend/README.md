# MedSync Backend API

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Documentation

For complete setup instructions and API documentation, see [BACKEND_SETUP_GUIDE.md](./BACKEND_SETUP_GUIDE.md)

## API Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT

## Project Structure
```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── models/       # Database models
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   ├── middlewares/  # Custom middlewares
│   ├── utils/        # Utility functions
│   └── validators/   # Input validation
├── tests/            # Test files
└── server.js         # Entry point
```

## Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests in watch mode
- `npm run test:once` - Run tests once

## License
MIT
