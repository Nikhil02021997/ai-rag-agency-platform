from fastapi import APIRouter

router = APIRouter(
    prefix="/case-studies",
    tags=["Case Studies"],
)

# TODO: replace the metrics below with your real client results before launch.
CASE_STUDIES = [
    {
        "id": 1,
        "slug": "growth",
        "title": "Brand growth campaign",
        "service": "Influencer marketing + digital marketing",
        "media": "influencer-marketing",
        "challenge": "A consumer brand needed awareness with a new audience, without paying for follower counts that never turn into customers.",
        "approach": [
            "Sourced and vetted creators whose audience matched the brand's buyers",
            "Briefed micro and macro creators on one campaign message",
            "Tracked engagement and click-through weekly, shifting budget to the creators that performed"
        ],
        "target": "Reach and engagement rate, agreed before launch",
        "metrics": [
            {
                "value": 1.8,
                "suffix": "M",
                "decimals": 1,
                "label": "Combined creator reach"
            },
            {
                "text": "Weekly",
                "label": "Engagement reports"
            }
        ]
    },
    {
        "id": 2,
        "slug": "ecommerce",
        "title": "E-commerce performance",
        "service": "Google & Meta Ads",
        "media": "google-meta-ads",
        "challenge": "An online store was spending on ads with no clear return, and no one could say which campaigns were actually paying for themselves.",
        "approach": [
            "Rebuilt Google Search and Shopping campaigns around a ROAS target",
            "Set up Meta prospecting and retargeting funnels",
            "Tested creative and adjusted bids every week instead of set-and-forget"
        ],
        "target": "Return on ad spend, agreed before launch",
        "metrics": [
            {
                "value": 4.2,
                "suffix": "x",
                "decimals": 1,
                "label": "ROAS"
            },
            {
                "value": 18,
                "prefix": "-",
                "suffix": "%",
                "label": "Cost per click"
            },
            {
                "value": 6.1,
                "suffix": "%",
                "decimals": 1,
                "label": "Click-through rate"
            }
        ]
    },
    {
        "id": 3,
        "slug": "search",
        "title": "Search & organic growth",
        "service": "SEO",
        "media": "seo",
        "challenge": "A business with a good product was invisible in search, ranking behind competitors for the terms its customers actually use.",
        "approach": [
            "Fixed technical issues holding back crawling and speed",
            "Mapped keywords to what customers search for and built content around them",
            "Restructured key pages and reported rank and traffic monthly"
        ],
        "target": "Organic traffic and ranking for agreed keywords",
        "metrics": [
            {
                "prefix": "+",
                "value": 212,
                "suffix": "%",
                "label": "Organic traffic"
            },
            {
                "text": "#1",
                "label": "Ranking for priority terms"
            }
        ]
    },
    {
        "id": 4,
        "slug": "ai",
        "title": "AI support assistant",
        "service": "AI & RAG systems",
        "media": "ai-rag",
        "challenge": "A support team kept answering the same questions by hand, and a generic chatbot kept guessing wrong answers about their product.",
        "approach": [
            "Ingested the company's own documents, FAQs and product pages",
            "Built retrieval so every answer is drawn from those sources",
            "Tested against real questions and shared a working build every week"
        ],
        "target": "Answer accuracy on real customer questions, agreed before build",
        "metrics": [
            {
                "text": "Your docs",
                "label": "Every answer sourced from"
            },
            {
                "text": "Weekly",
                "label": "Working builds shared"
            }
        ]
    }
]


@router.get("/")
def get_case_studies():
    return {"case_studies": CASE_STUDIES}
