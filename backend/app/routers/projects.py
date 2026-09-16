"""Projects router — GET /projects."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/projects", tags=["projects"])

# Fallback seed data used if the MySQL `projects` table is empty,
# so the API always returns meaningful data for the portfolio.
SEED_PROJECTS = [
    {
        "title": "AI-Based Road Quality Monitoring System",
        "description": (
            "AI-powered road quality monitoring platform using the YOLOv8 object detection "
            "model to identify potholes and road defects from uploaded images. Integrated "
            "GPS-based location tracking and built a dashboard for visualization and reporting."
        ),
        "tech_stack": ["React", "Tailwind CSS", "Python", "FastAPI", "MySQL", "YOLOv8"],
        "github_url": "https://github.com/leiya-sree/road-quality-monitoring",
        "demo_url": "https://road-quality-monitoring.demo.app",
        "image": "https://images.pexels.com/photos/2599538/pexels-photo-2599538.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "featured": True,
        "sort_order": 0,
    },
    {
        "title": "AI-Powered College Placement Portal",
        "description": (
            "AI-driven placement portal with resume screening, job-role matching, resume "
            "feedback and personalized upskilling recommendations."
        ),
        "tech_stack": ["React", "FastAPI", "MongoDB", "REST API"],
        "github_url": "https://github.com/leiya-sree/college-placement-portal",
        "demo_url": "https://college-placement-portal.demo.app",
        "image": "https://images.pexels.com/photos/590573/pexels-photo-590573.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "featured": False,
        "sort_order": 1,
    },
]


@router.get("", response_model=list[schemas.ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    """Return all portfolio projects. Falls back to seed data if the table is empty."""
    try:
        rows = crud.list_projects(db)
    except Exception as exc:  # noqa: BLE001 - surface a clear 500 to the client
        raise HTTPException(status_code=500, detail=f"Database error: {exc}") from exc

    if not rows:
        return SEED_PROJECTS

    out = []
    for r in rows:
        out.append(
            {
                "id": r.id,
                "title": r.title,
                "description": r.description,
                "tech_stack": (r.tech_stack or "").split(",") if r.tech_stack else [],
                "github_url": r.github_url,
                "demo_url": r.demo_url,
                "image": r.image,
                "featured": bool(r.featured),
                "sort_order": r.sort_order,
                "created_at": r.created_at,
            }
        )
    return out
