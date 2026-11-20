import asyncio
from fastapi.testclient import TestClient
from main import app
from models import CaseResult, Judge
from services.wikidata_service import WikidataService
from services.wikisource_service import WikisourceService, sanitize_editor_html
from services.popularity import case_popularity
from routes import trending


client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_countries():
    response = client.get("/api/countries")
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert response.json()["total_countries"] == 1
    assert response.json()["countries"][0]["code"] == "ghana"


def test_search_pagination_and_filters(monkeypatch):
    cases = [CaseResult(
        case_id="Q1",
        title="Ghana Case",
        description="A test case",
        date="2024-01-01",
        citation="GH-1",
        court="Supreme Court of Ghana",
        judges=[Judge(name="Ama Mensah")],
        article_url="https://www.wikidata.org/wiki/Q1",
        country="Ghana",
    )]

    async def fake_fetch_cases(self, country):
        return cases

    async def fake_enrich(self, cases):
        return cases

    monkeypatch.setattr(WikidataService, "fetch_cases", fake_fetch_cases)
    monkeypatch.setattr(WikisourceService, "enrich_case", fake_enrich)
    response = client.get("/api/search?country=ghana&year=2024&page=1&page_size=1")

    assert response.status_code == 200
    assert response.json()["total_results"] == 1
    assert response.json()["total_pages"] == 1
    assert response.json()["results"][0]["case_id"] == "Q1"


def test_search_filters_by_court_level(monkeypatch):
    cases = [
        CaseResult(
            case_id="Q1", title="Supreme Case", description="Supreme Court test case",
            date="2024-01-01", citation="SC-1", court="Supreme Court of Ghana",
            judges=[Judge(name="Ama Mensah")], article_url="https://www.wikidata.org/wiki/Q1",
            country="Ghana", court_level="supreme",
        ),
        CaseResult(
            case_id="Q2", title="High Case", description="High Court test case",
            date="1959-09-29", citation="HC-1", court="High Court of Ghana",
            judges=[Judge(name="N. A. Ollennu")], article_url="https://www.wikidata.org/wiki/Q2",
            country="Ghana", court_level="high",
            wikisource_url="https://en.wikisource.org/wiki/Index:Example.pdf",
            commons_file_url="https://commons.wikimedia.org/wiki/File:Example.pdf",
        ),
    ]

    async def fake_fetch_cases(self, country):
        return cases

    monkeypatch.setattr(WikidataService, "fetch_cases", fake_fetch_cases)
    response = client.get("/api/search?country=ghana&court_level=high")

    assert response.status_code == 200
    assert response.json()["total_results"] == 1
    result = response.json()["results"][0]
    assert result["case_id"] == "Q2"
    assert result["court_level"] == "high"
    assert result["wikisource_url"].endswith("Example.pdf")


def test_search_filters_by_case_type_case_insensitively(monkeypatch):
    cases = [
        CaseResult(
            case_id="Q1", title="Republic v Criminal", description="Criminal appeal",
            date="2024-01-01", citation="CR-1", court="Supreme Court of Ghana",
            judges=[Judge(name="Ama Mensah")], article_url="https://www.wikidata.org/wiki/Q1",
            country="Ghana", case_type="criminal",
        ),
        CaseResult(
            case_id="Q2", title="Civil Appeal", description="Civil dispute",
            date="2024-01-01", citation="CV-1", court="Supreme Court of Ghana",
            judges=[Judge(name="Ama Mensah")], article_url="https://www.wikidata.org/wiki/Q2",
            country="Ghana", case_type="general",
        ),
    ]

    async def fake_fetch_cases(self, country):
        return cases

    monkeypatch.setattr(WikidataService, "fetch_cases", fake_fetch_cases)
    response = client.get("/api/search?country=ghana&case_type=Criminal")

    assert response.status_code == 200
    assert response.json()["total_results"] == 1
    assert response.json()["results"][0]["case_id"] == "Q1"


def test_case_detail_returns_saved_editor_html(monkeypatch):
    case = CaseResult(
        case_id="Q1",
        title="Formatted case",
        description="Case description",
        date="2024-01-01",
        citation="SC-1",
        court="Supreme Court of Ghana",
        judges=[Judge(name="Ama Mensah")],
        article_url="https://www.wikidata.org/wiki/Q1",
        full_text="Judgment body",
        full_html="<h2>Judgment</h2><p>Judgment body</p>",
    )

    async def fake_fetch_cases(self, country):
        return [case]

    async def fake_enrich(self, cases):
        return cases

    monkeypatch.setattr(WikidataService, "fetch_cases", fake_fetch_cases)
    monkeypatch.setattr(WikisourceService, "enrich_case", fake_enrich)

    response = client.get("/api/cases/Q1")

    assert response.status_code == 200
    assert response.json()["full_html"] == "<h2>Judgment</h2><p>Judgment body</p>"


def test_partial_court_fetch_is_not_cached(monkeypatch):
    service = WikidataService()
    supreme_case = CaseResult(
        case_id="Q1", title="Supreme Case", description="Supreme", date="2024-01-01",
        citation="SC-1", court="Supreme Court of Ghana", judges=[Judge(name="Judge 1")],
        article_url="https://www.wikidata.org/wiki/Q1", country="Ghana", court_level="supreme",
    )
    high_case = CaseResult(
        case_id="Q2", title="High Case", description="High", date="2023-01-01",
        citation="HC-1", court="High Court of Ghana", judges=[Judge(name="Judge 2")],
        article_url="https://www.wikidata.org/wiki/Q2", country="Ghana", court_level="high",
    )
    attempts = {"supreme": 0}

    async def fake_supreme(country):
        attempts["supreme"] += 1
        if attempts["supreme"] == 1:
            raise RuntimeError("temporary Wikidata failure")
        return [supreme_case]

    async def fake_high(country):
        return [high_case]

    monkeypatch.setattr(service, "fetch_supreme_court_cases", fake_supreme)
    monkeypatch.setattr(service, "fetch_high_court_cases", fake_high)

    first = asyncio.run(service.fetch_cases("ghana"))
    second = asyncio.run(service.fetch_cases("ghana"))

    assert [case.case_id for case in first] == ["Q2"]
    assert {case.case_id for case in second} == {"Q1", "Q2"}
    assert attempts["supreme"] == 2


def test_wikisource_query_ignores_placeholder_citation(monkeypatch):
    observed = {}

    async def fake_search(self, query: str):
        observed["query"] = query
        return None

    monkeypatch.setattr(WikisourceService, "_search_wikisource", fake_search)

    case = CaseResult(
        case_id="Q123",
        title="Cleland Van Lare vs J.A Anthony",
        description="High Court case",
        date="1959-09-29",
        citation="Citation not available",
        court="High Court of Ghana",
        judges=[Judge(name="Justice A")],
        article_url="https://www.wikidata.org/wiki/Q123",
        country="Ghana",
        court_level="high",
    )

    asyncio.run(WikisourceService()._fetch_case_details(case))

    assert observed["query"] == "Cleland Van Lare vs J.A Anthony"


def test_wikisource_html_is_preserved_when_enriching_case(monkeypatch):
    async def fake_search(self, query):
        return {
            "full_text": "Judgment text",
            "full_html": "<h2>Judgment</h2><p>Judgment text</p>",
            "summary": "Judgment text",
        }

    monkeypatch.setattr(WikisourceService, "_search_wikisource", fake_search)

    case = CaseResult(
        case_id="Q123",
        title="High Court case",
        description="Case description",
        date="1959-09-29",
        citation="HC-1",
        court="High Court of Ghana",
        judges=[Judge(name="Justice A")],
        article_url="https://www.wikidata.org/wiki/Q123",
        court_level="high",
    )

    result = asyncio.run(WikisourceService()._fetch_case_details(case))

    assert result.full_html == "<h2>Judgment</h2><p>Judgment text</p>"


def test_wikisource_enrichment_is_limited_to_high_court_cases(monkeypatch):
    cases = [
        CaseResult(
            case_id="Q1", title="Supreme case", description="Supreme", date="2024-01-01",
            citation="SC-1", court="Supreme Court of Ghana", judges=[],
            article_url="https://www.wikidata.org/wiki/Q1", court_level="supreme",
        ),
        CaseResult(
            case_id="Q2", title="High case", description="High", date="2024-01-01",
            citation="HC-1", court="High Court of Ghana", judges=[],
            article_url="https://www.wikidata.org/wiki/Q2", court_level="high",
        ),
    ]
    enriched_ids = []

    async def fake_fetch_details(self, case):
        enriched_ids.append(case.case_id)
        case.full_text = "Wikisource judgment"
        return case

    monkeypatch.setattr(WikisourceService, "_fetch_case_details", fake_fetch_details)

    result = asyncio.run(WikisourceService().enrich_case(cases))

    assert [case.case_id for case in result] == ["Q1", "Q2"]
    assert enriched_ids == ["Q2"]
    assert result[0].full_text is None
    assert result[1].full_text == "Wikisource judgment"


def test_sanitize_editor_html_preserves_formatting_and_removes_unsafe_markup():
    html = (
        '<h2 onclick="alert(1)">Judgment</h2><p><strong>Held</strong> in favor.</p>'
        "<ul><li>First point</li></ul>"
        '<table><tr><th>Issue</th><td colspan="2">Resolved</td></tr></table>'
        '<script>alert(1)</script><a href="javascript:alert(1)">unsafe link</a>'
        '<a href="https://example.org">safe link</a>'
    )

    sanitized = sanitize_editor_html(html)

    assert "<h2>Judgment</h2>" in sanitized
    assert "<strong>Held</strong>" in sanitized
    assert "<ul><li>First point</li></ul>" in sanitized
    assert '<td colspan="2">Resolved</td>' in sanitized
    assert "<script" not in sanitized
    assert "onclick" not in sanitized
    assert 'href="javascript:' not in sanitized
    assert 'href="https://example.org"' in sanitized


def test_sanitize_editor_html_omits_wikisource_page_metadata():
    html = (
        "<html><head><title>Page:Judgment.pdf/1</title></head><body>"
        '<div class="prp-page-qualityheader">This page has been '
        '<a href="/wiki/Help:Page_status">validated</a>.</div>'
        '<div class="pagetext"><div><p>Actual judgment text.</p></div></div>'
        "</body></html>"
    )

    sanitized = sanitize_editor_html(html)

    assert "Actual judgment text." in sanitized
    assert "Page:Judgment.pdf/1" not in sanitized
    assert "Page_status" not in sanitized


def test_wikisource_page_uses_visual_editor_export(monkeypatch):
    observed = {}

    class FakeResponse:
        def raise_for_status(self):
            pass

        def json(self):
            return {
                "visualeditor": {
                    "content": "<h2>Judgment</h2><p><strong>Actual</strong> ruling.</p>"
                }
            }

    class FakeClient:
        def __init__(self, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def get(self, endpoint, params):
            observed.update(params)
            return FakeResponse()

    monkeypatch.setattr("services.wikisource_service.httpx.AsyncClient", FakeClient)
    monkeypatch.setattr("services.wikisource_service.with_retries", lambda operation: operation())

    async def run_export():
        return await WikisourceService()._fetch_page_content("Page:Judgment.pdf/1")

    result = asyncio.run(run_export())

    assert observed == {
        "action": "visualeditor",
        "paction": "parse",
        "page": "Page:Judgment.pdf/1",
        "format": "json",
    }
    assert result["full_html"] == "<h2>Judgment</h2><p><strong>Actual</strong> ruling.</p>"
    assert result["full_text"] == "Judgment\n\nActual ruling."


def test_wikisource_page_falls_back_to_plain_text(monkeypatch):
    class FakeResponse:
        def __init__(self, data, error=False):
            self.data = data
            self.error = error

        def raise_for_status(self):
            if self.error:
                raise RuntimeError("VisualEditor unavailable")

        def json(self):
            return self.data

    class FakeClient:
        def __init__(self, **kwargs):
            pass

        async def __aenter__(self):
            return self

        async def __aexit__(self, *args):
            pass

        async def get(self, endpoint, params):
            if params["action"] == "visualeditor":
                return FakeResponse({}, error=True)
            return FakeResponse({
                "query": {"pages": {"1": {"extract": "Plain judgment text."}}}
            })

    async def direct_retry(operation):
        return await operation()

    monkeypatch.setattr("services.wikisource_service.httpx.AsyncClient", FakeClient)
    monkeypatch.setattr("services.wikisource_service.with_retries", direct_retry)

    result = asyncio.run(WikisourceService()._fetch_page_content("Judgment"))

    assert result["full_text"] == "Plain judgment text."
    assert result["full_html"] == "<p>Plain judgment text.</p>"


def test_trending_uses_popularity_and_full_collection(monkeypatch):
    cases = [
        CaseResult(
            case_id="Q1", title="Supreme Case", description="Supreme", date="2024-01-01",
            citation="SC-1", court="Supreme Court of Ghana", judges=[Judge(name="Judge 1")],
            article_url="https://www.wikidata.org/wiki/Q1", country="Ghana", court_level="supreme",
        ),
        CaseResult(
            case_id="Q2", title="High Case", description="High", date="1959-01-01",
            citation="HC-1", court="High Court of Ghana", judges=[Judge(name="Judge 2")],
            article_url="https://www.wikidata.org/wiki/Q2", country="Ghana", court_level="high",
        ),
    ]

    async def fake_fetch_cases(self, country):
        return cases

    monkeypatch.setattr(trending.WikidataService, "fetch_cases", fake_fetch_cases)
    case_popularity._counts.clear()

    fallback = client.get("/api/trending?country=ghana&limit=2")
    assert fallback.status_code == 200
    assert {item["case_id"] for item in fallback.json()} == {"Q1", "Q2"}

    case_popularity.record([cases[1]])
    ranked = client.get("/api/trending?country=ghana&limit=1")
    assert ranked.status_code == 200
    assert ranked.json()[0]["case_id"] == "Q2"


