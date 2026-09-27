from fastapi import APIRouter

router = APIRouter(
    prefix="/services",
    tags=["Services"],
)


@router.get("/")
def get_services():
    return {
        "services": [
            {
                "id": 1,
                "name": "Digital Marketing",
                "description": "Digital marketing services for businesses.",
            },
            {
                "id": 2,
                "name": "Web Development",
                "description": "Custom websites and web applications.",
            },
        ]
    }