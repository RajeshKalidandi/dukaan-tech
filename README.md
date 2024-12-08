# Dukaan Tech - Modern E-commerce Dashboard

A modern, responsive e-commerce dashboard built with React, TypeScript, and Tailwind CSS. Features a beautiful dark/light theme, real-time analytics, and comprehensive business management tools.

## Features

- 🌓 Beautiful Dark/Light Theme
- 📊 Real-time Analytics Dashboard
- 👥 Customer Management
- 📈 Sales Reports & Analytics
- 📦 Inventory Management
- 💳 Billing System
- 🔐 Secure Authentication
- 📱 Responsive Design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Hero Icons

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Redis
- Celery

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL
- Redis

### Installation

1. Clone the repository
```bash
git clone https://github.com/RajeshKalidandi/dukaan-tech.git
cd dukaan-tech
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Set up environment variables
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

5. Run the development servers

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Hero Icons](https://heroicons.com)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)
