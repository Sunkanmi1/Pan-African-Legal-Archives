import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createSsrRpc } from "./createSsrRpc-BlvgHNs1.js";
//#region src/lib/home.functions.ts
var getCaseOfTheDay = createServerFn({ method: "GET" }).handler(createSsrRpc("ce834681437574a06cbf4fbcc6e2287cb5832f209a6b9d4906f5e1699a845843"));
var getTrendingCases = createServerFn({ method: "GET" }).handler(createSsrRpc("ecd2b46711742f571ff7e97735a13d687c475378c00152e7a8b000e997b008a7"));
createServerFn({ method: "GET" }).handler(createSsrRpc("4c8af6d8d6ba76315b82670da0970f8f8a9f96474bfd64426f1ad45021bef5cb"));
createServerFn({ method: "GET" }).handler(createSsrRpc("a88c75d9df70bed8b6075d93f6b77e703abd14decd5dab371668a1d9b53d5ac4"));
var getJudges = createServerFn({ method: "GET" }).handler(createSsrRpc("a0e9a8d0cd39e9b2986c232d7ed5716c304a09facc10af8ced6469ee8ba9c703"));
var getHomeStats = createServerFn({ method: "GET" }).handler(createSsrRpc("ee0482694d1abd655b0f844e1596b692a9904e2441318ccdf002093171c60dd7"));
var searchCases = createServerFn({ method: "GET" }).validator((filters) => filters).handler(createSsrRpc("4b188a1a9df5631b374c518082b1b3e6613eb904e660c8c79bb38c6fade35e92"));
//#endregion
export { searchCases as a, getTrendingCases as i, getHomeStats as n, getJudges as r, getCaseOfTheDay as t };
