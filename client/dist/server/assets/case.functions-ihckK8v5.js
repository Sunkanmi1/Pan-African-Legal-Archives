import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.js";
//#endregion
//#region src/lib/case.functions.ts?tss-serverfn-split
var fallbackCase = {
	slug: "amaechi-v-inec",
	badge: "Landmark Decision",
	citationNumber: "SC. 31/2007",
	title: "Rotimi Amaechi v. Independent National Electoral Commission (INEC) & Ors",
	date: "January 18, 2008",
	court: "Supreme Court of Nigeria",
	bench: "Full Bench: 7 Justices",
	leadJudgmentBy: "Delivered by Justice Aloysius Iyorgyer Katsina-Alu, JSC.",
	paragraphs: [
		"The central issue in this appeal is the interpretation of Section 34 of the Electoral Act 2006 regarding the substitution of candidates for elective offices. The appellant, Rotimi Amaechi, had emerged as the winner of the Peoples Democratic Party (PDP) governorship primaries in Rivers State, only to be substituted by the party with Celestine Omehia.",
		"It is fundamental to the democratic process that political parties must be governed by their own constitutions and the laws of the land. The court cannot allow a political party to act whimsically or capriciously in the selection and substitution of candidates, especially after a clear winner has emerged in a valid primary election.",
		"Justice is not a game of hide and seek. It is a serious business where the rights of parties are determined based on established principles of law and equity. In the instant case, the substitution of the appellant was done in flagrant disregard of the mandatory provisions of the Electoral Act.",
		"The argument that the court cannot interfere in the internal affairs of a political party must be balanced against the duty of the court to ensure that all institutions, including political parties, operate within the ambit of the law. Where there is a clear breach of a statutory provision, the court has the inherent jurisdiction to intervene and grant appropriate reliefs.",
		"Consequently, it is the view of this court that the appellant was the lawful candidate of the PDP for the governorship election in Rivers State held on April 14, 2007. Since the party (PDP) won the election, it is the appellant, and not the substituted candidate, who is deemed in the eyes of the law to have won the said election."
	],
	blockquote: "“The law does not permit a political party to substitute a candidate without ‘cogent and verifiable’ reasons as mandated by the Electoral Act. Substitution based on ‘error’ without further substantiation is insufficient to divest a candidate of his vested mandate.”",
	citation: "[2008] 5 NWLR (Pt. 1080) 227",
	summary: [
		{
			label: "Jurisdiction",
			value: "Supreme Court of Nigeria"
		},
		{
			label: "Bench",
			value: "Katsina-Alu, Oguntade, Mukhtar, Musdapher, Onnoghen, Coomassie, Adekeye"
		},
		{
			label: "Counsel for Appellant",
			value: "L.O. Fagbemi, SAN"
		},
		{
			label: "Wikidata ID",
			value: "Q1056294"
		}
	],
	scan: {
		src: "/assets/judgment-scan-nejMBSzO.jpg",
		alt: "Scanned cover page of the original Supreme Court judgment",
		size: "24MB"
	},
	precedents: [{
		title: "Ugwu v. Ararume",
		cite: "[2007] 12 NWLR (Pt. 1048) 367"
	}, {
		title: "Onuoha v. Okafor",
		cite: "[1983] 14 NSCC 494"
	}]
};
async function fetchBackend(path) {
	const baseUrl = process.env["BACKEND_API_URL"] ?? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_API_BASE_URL": "http://127.0.0.1:8000"
	}["VITE_API_BASE_URL"] ?? "/";
	if (!baseUrl) return null;
	try {
		const res = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
			headers: { Accept: "application/json" },
			signal: AbortSignal.timeout(15e3)
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}
var getCaseBySlug_createServerFn_handler = createServerRpc({
	id: "b797e7abd9d4887f22d350271a59921dcb578ef9e72a23f0eea8244a22360d7b",
	name: "getCaseBySlug",
	filename: "src/lib/case.functions.ts"
}, (opts) => getCaseBySlug.__executeServer(opts));
var getCaseBySlug = createServerFn({ method: "GET" }).validator((data) => data).handler(getCaseBySlug_createServerFn_handler, async ({ data }) => {
	const directResult = await fetchBackend(`/api/cases/${encodeURIComponent(data.slug)}`);
	if (directResult) return toCaseDetail(directResult, data.slug);
	const result = (await fetchBackend(`/api/search?country=ghana&q=${encodeURIComponent(data.slug.replaceAll("-", " "))}`))?.results?.[0];
	if (!result) return fallbackCase;
	return toCaseDetail(result, data.slug);
});
function toCaseDetail(result, slug) {
	const summary = result.opinion_summary || result.description;
	return {
		...fallbackCase,
		slug,
		title: result.title,
		date: result.date,
		court: result.court,
		citation: result.citation,
		bench: `${result.judges.length} Justices`,
		leadJudgmentBy: result.judges[0]?.name ? `Lead judgment by ${result.judges[0].name}.` : fallbackCase.leadJudgmentBy,
		paragraphs: [summary],
		summary: [
			{
				label: "Court",
				value: result.court
			},
			{
				label: "Citation",
				value: result.citation
			},
			{
				label: "Judges",
				value: result.judges.map((judge) => judge.name).join(", ") || "Not listed"
			},
			{
				label: "Source ID",
				value: result.case_id
			}
		]
	};
}
async function fetchCaseRecord(caseId) {
	const baseUrl = process.env["BACKEND_API_URL"] ?? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_API_BASE_URL": "http://127.0.0.1:8000"
	}["VITE_API_BASE_URL"] ?? "/";
	const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/cases/${encodeURIComponent(caseId)}`, {
		headers: { Accept: "application/json" },
		signal: AbortSignal.timeout(15e3)
	});
	if (!response.ok) throw new Error("Case not found.");
	return await response.json();
}
var getCaseById_createServerFn_handler = createServerRpc({
	id: "6ddc46d1704eca737294602bfe0d451ae76af8f4d0920a255b56236ef5d40abf",
	name: "getCaseById",
	filename: "src/lib/case.functions.ts"
}, (opts) => getCaseById.__executeServer(opts));
var getCaseById = createServerFn({ method: "GET" }).validator((data) => data).handler(getCaseById_createServerFn_handler, async ({ data }) => {
	const result = await fetchCaseRecord(data.caseId);
	const judges = result.judges.map((judge) => judge.name).filter(Boolean);
	return {
		badge: result.court_level === "high" ? "High Court case" : "Supreme Court case",
		title: result.title,
		description: result.description,
		date: result.date,
		citation: result.citation,
		court: result.court,
		bench: judges.length ? `${judges.length} Justice${judges.length === 1 ? "" : "s"}` : "Judges not listed",
		articleUrl: result.article_url,
		courtLevel: result.court_level ?? "supreme",
		wikisourceUrl: result.wikisource_url,
		commonsFileUrl: result.commons_file_url,
		commonsPreviewUrl: result.commons_preview_url,
		fullText: result.full_text,
		summary: [
			{
				label: "Court",
				value: result.court
			},
			{
				label: "Citation",
				value: result.citation
			},
			{
				label: "Judges",
				value: judges.join(", ") || "Not listed"
			},
			{
				label: "Wikidata ID",
				value: result.case_id
			}
		]
	};
});
//#endregion
export { getCaseById_createServerFn_handler, getCaseBySlug_createServerFn_handler };
