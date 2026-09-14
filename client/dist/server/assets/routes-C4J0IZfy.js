import { t as queryOptions } from "./queryOptions-CmK3ISSQ.js";
import { i as getTrendingCases, n as getHomeStats, t as getCaseOfTheDay } from "./home.functions-DHVcA4rM.js";
//#region src/routes/index.tsx?tsr-shared=1
var caseOfTheDayQuery = queryOptions({
	queryKey: ["case-of-the-day"],
	queryFn: () => getCaseOfTheDay(),
	staleTime: 6e5,
	refetchInterval: 6e5
});
var trendingCasesQuery = queryOptions({
	queryKey: ["trending-cases"],
	queryFn: () => getTrendingCases(),
	staleTime: 3e5
});
var homeStatsQuery = queryOptions({
	queryKey: ["home-stats"],
	queryFn: () => getHomeStats(),
	staleTime: 3e5
});
//#endregion
export { homeStatsQuery as n, trendingCasesQuery as r, caseOfTheDayQuery as t };
