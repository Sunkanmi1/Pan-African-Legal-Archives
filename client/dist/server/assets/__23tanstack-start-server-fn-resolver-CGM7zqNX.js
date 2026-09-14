//#region \0%23tanstack-start-server-fn-resolver
var manifest = {
	"4b188a1a9df5631b374c518082b1b3e6613eb904e660c8c79bb38c6fade35e92": {
		functionName: "searchCases_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"4c8af6d8d6ba76315b82670da0970f8f8a9f96474bfd64426f1ad45021bef5cb": {
		functionName: "getMediaLibrary_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"6ddc46d1704eca737294602bfe0d451ae76af8f4d0920a255b56236ef5d40abf": {
		functionName: "getCaseById_createServerFn_handler",
		importer: () => import("./case.functions-ihckK8v5.js")
	},
	"a0e9a8d0cd39e9b2986c232d7ed5716c304a09facc10af8ced6469ee8ba9c703": {
		functionName: "getJudges_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"a88c75d9df70bed8b6075d93f6b77e703abd14decd5dab371668a1d9b53d5ac4": {
		functionName: "getAllMedia_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"b797e7abd9d4887f22d350271a59921dcb578ef9e72a23f0eea8244a22360d7b": {
		functionName: "getCaseBySlug_createServerFn_handler",
		importer: () => import("./case.functions-ihckK8v5.js")
	},
	"ce834681437574a06cbf4fbcc6e2287cb5832f209a6b9d4906f5e1699a845843": {
		functionName: "getCaseOfTheDay_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"ecd2b46711742f571ff7e97735a13d687c475378c00152e7a8b000e997b008a7": {
		functionName: "getTrendingCases_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	},
	"ee0482694d1abd655b0f844e1596b692a9904e2441318ccdf002093171c60dd7": {
		functionName: "getHomeStats_createServerFn_handler",
		importer: () => import("./home.functions-BP8baO7h.js")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
