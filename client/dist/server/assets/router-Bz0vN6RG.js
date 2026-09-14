import { n as homeStatsQuery, r as trendingCasesQuery, t as caseOfTheDayQuery } from "./routes-CbQj4YEj.js";
import { t as Route$4 } from "./_caseId-P-0dydQk.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/assets/styles-CkeBFAHa.css";
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "WikiLegal Africa" },
			{
				name: "description",
				content: "Supreme Court case platform for Africa"
			},
			{
				name: "author",
				content: "WikiLegal Africa"
			},
			{
				property: "og:title",
				content: "WikiLegal Africa"
			},
			{
				property: "og:description",
				content: "Supreme Court case platform for Africa"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$2 = () => import("./routes-ab6qM2co.js");
var Route$2 = createFileRoute("/")({
	loader: ({ context }) => Promise.all([
		context.queryClient.ensureQueryData(caseOfTheDayQuery),
		context.queryClient.ensureQueryData(trendingCasesQuery),
		context.queryClient.ensureQueryData(homeStatsQuery)
	]),
	head: () => ({ meta: [
		{ title: "WikiLegal Africa — African Case Law & Legal Archive" },
		{
			name: "description",
			content: "Browse archived Ghanaian judgments, statutes and court records, freely accessible."
		},
		{
			property: "og:title",
			content: "WikiLegal Africa — African Case Law & Legal Archive"
		},
		{
			property: "og:description",
			content: "Landmark judgments, statutes and court records from Ghana, freely accessible."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/judges.tsx
var $$splitComponentImporter$1 = () => import("./judges-BIdVOFaj.js");
var Route$1 = createFileRoute("/judges")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Judges | Ghana Supreme Court Legal Archive" }, {
		name: "description",
		content: "Explore Ghana Supreme Court judges, their cases, Wikipedia articles, and related Commons media."
	}] })
});
//#endregion
//#region src/routes/search.tsx
var $$splitComponentImporter = () => import("./search-B1ld8IRF.js");
var Route = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : "" }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Search Ghana Court Cases" }, {
		name: "description",
		content: "Search Ghana court cases by name, judge, court, year, and keywords."
	}] })
});
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	JudgesRoute: Route$1.update({
		id: "/judges",
		path: "/judges",
		getParentRoute: () => Route$3
	}),
	SearchRoute: Route.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$3
	}),
	CasesCaseIdRoute: Route$4.update({
		id: "/cases/$caseId",
		path: "/cases/$caseId",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function RouteLoading() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-5",
		role: "status",
		"aria-live": "polite",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex w-full max-w-xs flex-col items-center gap-4 text-center",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-1 w-full overflow-hidden rounded-full bg-secondary",
				children: /* @__PURE__ */ jsx("div", { className: "h-full w-1/2 animate-pulse rounded-full bg-gold" })
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Loading page..."
			})]
		})
	});
}
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingMs: 250,
		defaultPendingMinMs: 350,
		defaultPendingComponent: RouteLoading
	});
};
//#endregion
export { getRouter };
