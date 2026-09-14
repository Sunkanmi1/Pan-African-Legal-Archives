import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createSsrRpc } from "./createSsrRpc-BlvgHNs1.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("b797e7abd9d4887f22d350271a59921dcb578ef9e72a23f0eea8244a22360d7b"));
var getCaseById = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("6ddc46d1704eca737294602bfe0d451ae76af8f4d0920a255b56236ef5d40abf"));
//#endregion
//#region src/routes/cases/$caseId.tsx?tsr-shared=1
var caseDetailQuery = (caseId) => queryOptions({
	queryKey: ["case", caseId],
	queryFn: () => getCaseById({ data: { caseId } }),
	staleTime: 3e5
});
//#endregion
//#region src/routes/cases/$caseId.tsx
var $$splitComponentImporter = () => import("./_caseId-NprRvVTJ.js");
var Route = createFileRoute("/cases/$caseId")({
	loader: ({ context, params }) => context.queryClient.ensureQueryData(caseDetailQuery(params.caseId)),
	head: () => ({ meta: [{ title: "Ghana Supreme Court Case — Case Record" }, {
		name: "description",
		content: "Read a Ghana Supreme Court case record and its available metadata."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { caseDetailQuery as n, Route as t };
