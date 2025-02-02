# Multilingual FAQ System

A robust FAQ management system built with Node.js, Express, and MongoDB that supports multilingual content with WYSIWYG editing capabilities.

## Features

- Multi-language FAQ management (English, Hindi, Bengali)
- Rich text editing support using CKEditor
- Automated translation using Google Translate API
- Redis-based caching for improved performance
- RESTful API with language selection
- Comprehensive test coverage
- Docker support for easy deployment

## Tech Stack

- Backend: Node.js & Express.js
- Database: MongoDB with Mongoose
- Cache: Redis
- Editor: CKEditor integration
- Translation: Google Translate API
- Testing: Jest & Supertest

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis
- Google Cloud account (for translation API)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/multilingual-faq-system.git
cd multilingual-faq-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/faq_system
REDIS_URL=redis://localhost:6379
GOOGLE_TRANSLATE_API_KEY=your_api_key
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── faqController.js      # FAQ CRUD operations
├── middleware/
│   └── redis.js              # Redis caching middleware
├── models/
│   └── faq.js               # FAQ MongoDB model
├── routes/
│   └── faqRoutes.js         # API routes
├── services/
│   └── translationServices.js # Translation service
├── tests/
│   └── faq.test.js          # FAQ testing suite
├── .env                      # Environment variables
├── app.js                    # Express app configuration
├── package.json             
├── package-lock.json
└── server.js                # Server entry point
```

## API Documentation

### Endpoints

#### Get FAQs
```
GET /api/faqs
```

Query Parameters:
- `lang`: Language code (en, hi, bn) [default: en]

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "question": "How do I reset my password?",
      "answer": "<p>Follow these steps...</p>",
      "language": "en"
    }
  ]
}
```

#### Create FAQ
```
POST /api/faqs
```

Request Body:
```json
{
  "question": "How do I reset my password?",
  "answer": "<p>Follow these steps...</p>",
  "language": "en"
}
```

### Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Caching Strategy

The system implements a two-level caching strategy:
1. In-memory Redis cache for frequently accessed FAQs
2. Database query caching for optimized performance

Cache keys are structured as: `faq:{id}:{language}`

## Testing

Run the test suite:
```bash
npm test
```


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Git Commit Guidelines

Follow conventional commit messages:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or modifying tests
- `refactor:` Code refactoring
- `style:` Code style changes
- `chore:` Routine tasks, maintenance


## Support

For support, email ayushikatroliya17h@gmail.com or open an issue in the repository.
