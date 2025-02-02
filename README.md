# Multilingual FAQ System

A robust Django-based FAQ management system with multilingual support, automatic translation, and caching capabilities.

## 📋 Features

* Multilingual FAQ management with automatic translation
* Rich text editing support via CKEditor
* REST API with language selection
* Redis-based caching for optimized performance
* Google Translate API integration
* Comprehensive admin interface
* Extensive test coverage

## 🚀 Installation

### Prerequisites

* Python 3.8+
* Redis Server
* PostgreSQL
* Virtual Environment

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/multilingual-faq.git
cd multilingual-faq
```

### Step 2: Set Up Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Environment Configuration
Create a `.env` file in the project root:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@localhost:5432/faq_db
REDIS_URL=redis://localhost:6379/1
GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key
```

### Step 5: Database Setup
```bash
python manage.py migrate
python manage.py createsuperuser
```

### Step 6: Start Redis Server
```bash
redis-server
```

### Step 7: Run Development Server
```bash
python manage.py runserver
```

## 📖 API Documentation

### Base URL
```
http://localhost:8000/api/v1/
```

### Authentication
All API endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### 1. List FAQs
```http
GET /api/v1/faqs/
```

Query Parameters:
* `lang`: Language code (e.g., 'en', 'hi', 'bn')
* `page`: Page number for pagination
* `page_size`: Number of items per page

Response:
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/v1/faqs/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "question": "What is this service?",
            "answer": "<p>This is a multilingual FAQ system...</p>",
            "created_at": "2024-02-02T10:00:00Z"
        }
    ]
}
```

#### 2. Create FAQ
```http
POST /api/v1/faqs/
```
Request Body:
```json
{
    "question": "What is this service?",
    "answer": "<p>This is a multilingual FAQ system...</p>"
}
```

#### 3. Update FAQ
```http
PUT /api/v1/faqs/{id}/
```

#### 4. Delete FAQ
```http
DELETE /api/v1/faqs/{id}/
```

## 🔧 Configuration

### Redis Cache Settings
In `settings.py`:
```python
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env('REDIS_URL'),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
```

### CKEditor Configuration
```python
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': 800,
    },
}
```

## 🧪 Running Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_models.py
```

## 🤝 Contributing

### Setting Up Development Environment

1. Fork the repository
2. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes
4. Run tests
5. Submit a pull request

### Commit Message Convention
Follow conventional commits:

* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `test`: Adding or modifying tests
* `refactor`: Code refactoring
* `style`: Code style changes
* `chore`: Maintenance tasks

### Code Style

* Follow PEP 8 guidelines
* Use flake8 for linting
* Add docstrings to all functions and classes
* Keep functions focused and single-purpose
* Write descriptive variable names

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the CHANGELOG.md
5. Get at least one code review

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support
For support, please:

* Check the FAQ section in the Wiki
* Open an issue
* Contact the maintainers at support@example.com

## 🙏 Acknowledgments

* Django REST Framework
* Google Translate API
* Redis
* CKEditor

## 📊 Project Status
Active development - Contributions welcome!
