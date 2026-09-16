# Leiya Sree M — Portfolio

A modern, premium, fully responsive Full Stack Developer portfolio built for a Computer Science Engineering graduate (2026 Fresher).

## Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React 19 (Vite), Tailwind CSS, Framer Motion, React Router DOM, React Icons, Axios |
| Backend  | Python, FastAPI, REST APIs, SQLAlchemy, Pydantic |
| Database | MySQL                                        |

## Folder Structure

```
portfolio/
├── frontend/          # this Vite app (root of the repo)
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── backend/           # FastAPI service
    └── app/
        ├── routers/
        ├── main.py
        ├── database.py
        ├── models.py
        ├── schemas.py
        └── crud.py
```

## Frontend

```bash
npm install
npm run dev
```

The app runs on http://localhost:5173.

### Environment

The contact form writes to a provisioned Supabase table (`contact_messages`) out of
the box so it works with zero backend setup. To point projects at the FastAPI backend
instead, set `VITE_API_URL` in a `.env` file:

```
VITE_API_URL=http://localhost:8000
```

When the backend is unavailable, the frontend automatically falls back to local seed data.

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create the MySQL database + tables
mysql -u root -p < schema.sql

# Configure the connection (optional — defaults to localhost:3306/portfolio)
cp .env.example .env

uvicorn app.main:app --reload
```

The API runs on http://localhost:8000 with interactive docs at http://localhost:8000/docs.

### Endpoints

| Method | Path        | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/projects` | List all portfolio projects          |
| POST   | `/contact`  | Submit a contact-form message        |
| GET    | `/resume`   | Resume metadata + download link      |

## Features

- Dark-mode-first premium UI with glassmorphism, gradient backgrounds, blur effects
- Sticky responsive navbar with scroll-spy + mobile menu
- Hero with typing animation, floating tech icons, orbit rings, mouse glow
- Animated stats, experience timeline, project filter + modal gallery
- Framer Motion section reveals, scroll progress bar, back-to-top, loading screen
- Lazy-loaded route sections, 404 page, SEO meta tags
- Contact form persisted to Supabase (with FastAPI/MySQL backend alternative)

---

Made with care by Leiya Sree M — React • FastAPI • MySQL
