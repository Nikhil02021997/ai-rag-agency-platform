from fastapi import APIRouter

router = APIRouter(
    prefix="/case-studies",
    tags=["Case Studies"],
)


@router.get("/")
def get_case_studies():
    return {
        "case_studies": [
            {
                "id": 1,
                "title": "Brand Growth Campaign",
                "description": "A digital campaign focused on increasing brand awareness.",
            },
            {
                "id": 2,
                "title": "E-commerce Growth",
                "description": "A performance marketing campaign for an e-commerce business.",
            },
        ]
    }