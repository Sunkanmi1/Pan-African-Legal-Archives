import { t as createServerFn } from "./createServerFn-B6xwD7pN.js";
import { t as createServerRpc } from "./createServerRpc-D0NW03sk.js";
//#region src/lib/home.functions.ts?tss-serverfn-split
var commonsFallbackCategory = "Category:Supreme Court of Ghana building";
function caseImageIndex(caseId, imageCount) {
	const hash = Array.from(caseId).reduce((value, character) => value + character.charCodeAt(0), 0);
	return imageCount ? hash % imageCount : 0;
}
var fallbackCaseOfTheDay = {
	caseId: "",
	title: "Ghana case unavailable",
	summary: "The daily Ghana court case is temporarily unavailable.",
	image: "",
	imageAlt: "",
	caseUrl: "/search",
	metadata: [
		{
			label: "Jurisdiction",
			value: "Ghana"
		},
		{
			label: "Court",
			value: "Unavailable"
		},
		{
			label: "Decided",
			value: "Unavailable"
		},
		{
			label: "Judges",
			value: "Unavailable"
		},
		{
			label: "Wikidata QID",
			value: "Unavailable"
		}
	]
};
var fallbackTrending = [{
	country: "Ghana",
	year: "",
	title: "No trending cases available",
	blurb: "Ghana case data is temporarily unavailable.",
	court: "Ghana courts",
	caseId: ""
}];
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
var getCaseOfTheDay_createServerFn_handler = createServerRpc({
	id: "ce834681437574a06cbf4fbcc6e2287cb5832f209a6b9d4906f5e1699a845843",
	name: "getCaseOfTheDay",
	filename: "src/lib/home.functions.ts"
}, (opts) => getCaseOfTheDay.__executeServer(opts));
var getCaseOfTheDay = createServerFn({ method: "GET" }).handler(getCaseOfTheDay_createServerFn_handler, async () => {
	const data = await fetchBackend("/api/case-of-the-day?country=ghana");
	if (!data) return fallbackCaseOfTheDay;
	const matchingMedia = await fetchBackend(`/api/media?query=${encodeURIComponent(data.title)}&limit=10`);
	const media = matchingMedia?.items.length ? matchingMedia : await fetchBackend(`/api/media?category=${encodeURIComponent(commonsFallbackCategory)}&limit=4`);
	const image = media?.items[caseImageIndex(data.case_id, media?.items.length ?? 0)];
	return {
		caseId: data.case_id,
		title: data.title,
		summary: data.opinion_summary || data.description,
		image: image?.thumbnail_url ?? "",
		imageAlt: image?.description || data.title,
		caseUrl: `/cases/${encodeURIComponent(data.case_id)}`,
		metadata: [
			{
				label: "Jurisdiction",
				value: data.country || "Ghana"
			},
			{
				label: "Court",
				value: data.court
			},
			{
				label: "Decided",
				value: data.date
			},
			{
				label: "Judges",
				value: data.judges.map((judge) => judge.name).join(", ")
			},
			{
				label: "Wikidata QID",
				value: data.case_id
			}
		]
	};
});
var getTrendingCases_createServerFn_handler = createServerRpc({
	id: "ecd2b46711742f571ff7e97735a13d687c475378c00152e7a8b000e997b008a7",
	name: "getTrendingCases",
	filename: "src/lib/home.functions.ts"
}, (opts) => getTrendingCases.__executeServer(opts));
var getTrendingCases = createServerFn({ method: "GET" }).handler(getTrendingCases_createServerFn_handler, async () => {
	const cases = (await fetchBackend("/api/trending?country=ghana&limit=4") ?? []).map((item) => ({
		country: item.country ?? "Ghana",
		year: item.date.slice(0, 4),
		title: item.title,
		blurb: item.description,
		court: item.court,
		caseId: item.case_id
	}));
	return cases.length > 0 ? cases : fallbackTrending;
});
var getMediaLibrary_createServerFn_handler = createServerRpc({
	id: "4c8af6d8d6ba76315b82670da0970f8f8a9f96474bfd64426f1ad45021bef5cb",
	name: "getMediaLibrary",
	filename: "src/lib/home.functions.ts"
}, (opts) => getMediaLibrary.__executeServer(opts));
var getMediaLibrary = createServerFn({ method: "GET" }).handler(getMediaLibrary_createServerFn_handler, async () => {
	return (await fetchBackend("/api/media?category=Category%3ASupreme%20Court%20of%20Ghana%20building&limit=3"))?.items?.map((item) => ({
		title: item.title,
		src: item.thumbnail_url,
		caption: item.description || item.title,
		sourcePage: item.source_page,
		license: item.license
	})) ?? [];
});
var getAllMedia_createServerFn_handler = createServerRpc({
	id: "a88c75d9df70bed8b6075d93f6b77e703abd14decd5dab371668a1d9b53d5ac4",
	name: "getAllMedia",
	filename: "src/lib/home.functions.ts"
}, (opts) => getAllMedia.__executeServer(opts));
var getAllMedia = createServerFn({ method: "GET" }).handler(getAllMedia_createServerFn_handler, async () => {
	return (await fetchBackend("/api/media?category=Category%3A1st%20GOIF-Effutu%20workshop%202023&limit=500"))?.items?.map((item) => ({
		title: item.title,
		src: item.thumbnail_url,
		caption: item.description || item.title,
		sourcePage: item.source_page,
		license: item.license
	})) ?? [];
});
var getJudges_createServerFn_handler = createServerRpc({
	id: "a0e9a8d0cd39e9b2986c232d7ed5716c304a09facc10af8ced6469ee8ba9c703",
	name: "getJudges",
	filename: "src/lib/home.functions.ts"
}, (opts) => getJudges.__executeServer(opts));
var getJudges = createServerFn({ method: "GET" }).handler(getJudges_createServerFn_handler, async () => {
	return await fetchBackend("/api/judges?limit=100") ?? [];
});
var getHomeStats_createServerFn_handler = createServerRpc({
	id: "ee0482694d1abd655b0f844e1596b692a9904e2441318ccdf002093171c60dd7",
	name: "getHomeStats",
	filename: "src/lib/home.functions.ts"
}, (opts) => getHomeStats.__executeServer(opts));
var getHomeStats = createServerFn({ method: "GET" }).handler(getHomeStats_createServerFn_handler, async () => {
	return await fetchBackend("/api/stats") ?? {
		archived_cases: 0,
		nations_covered: 1,
		last_update: "Unavailable"
	};
});
var searchCases_createServerFn_handler = createServerRpc({
	id: "4b188a1a9df5631b374c518082b1b3e6613eb904e660c8c79bb38c6fade35e92",
	name: "searchCases",
	filename: "src/lib/home.functions.ts"
}, (opts) => searchCases.__executeServer(opts));
var searchCases = createServerFn({ method: "GET" }).validator((filters) => filters).handler(searchCases_createServerFn_handler, async ({ data }) => {
	const params = new URLSearchParams({ country: "ghana" });
	for (const [key, value] of Object.entries(data)) if (value !== void 0 && value !== "") params.set(key, String(value));
	return await fetchBackend(`/api/search?${params.toString()}`) ?? {
		results: [],
		total_results: 0,
		page: data.page ?? 1,
		page_size: data.page_size ?? 20,
		total_pages: 1
	};
});
//#endregion
export { getAllMedia_createServerFn_handler, getCaseOfTheDay_createServerFn_handler, getHomeStats_createServerFn_handler, getJudges_createServerFn_handler, getMediaLibrary_createServerFn_handler, getTrendingCases_createServerFn_handler, searchCases_createServerFn_handler };
