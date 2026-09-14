import { c as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-DYGRXsYa.js";
import { n as Link } from "./createSsrRpc-CR1ROAQz.js";
import { t as useSuspenseQuery } from "./useSuspenseQuery-B4rGsk2G.js";
import { n as homeStatsQuery, r as trendingCasesQuery, t as caseOfTheDayQuery } from "./routes-C4J0IZfy.js";
import { t as PageShell } from "./PageShell-DWnBKIZq.js";
//#region src/routes/index.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function formatLastUpdate(value) {
	if (value === "Unavailable") return value;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : date.toLocaleString([], {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function Index() {
	const { data: caseOfTheDay } = useSuspenseQuery(caseOfTheDayQuery);
	const { data: trending } = useSuspenseQuery(trendingCasesQuery);
	const { data: homeStats } = useSuspenseQuery(homeStatsQuery);
	const stats = [
		{
			label: "Archived Cases",
			value: homeStats.archived_cases.toLocaleString()
		},
		{
			label: "Nations Covered",
			value: homeStats.nations_covered.toLocaleString()
		},
		{
			label: "Last Update",
			value: formatLastUpdate(homeStats.last_update)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		withSidebar: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-14 px-5 py-10 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-6 lg:grid-cols-[1.6fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "relative overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-hero)]",
						children: [caseOfTheDay.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: caseOfTheDay.image,
							alt: caseOfTheDay.imageAlt,
							width: 1280,
							height: 720,
							className: "absolute inset-0 size-full object-cover opacity-25"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-col gap-5 p-8 lg:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow w-fit rounded-md bg-gold-soft px-3 py-1 text-primary",
									children: "Case of the Day"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "max-w-xl text-3xl font-bold leading-tight lg:text-[2.75rem]",
									children: caseOfTheDay.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-2xl text-sm leading-relaxed text-primary-foreground/80 lg:text-base",
									children: caseOfTheDay.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: caseOfTheDay.caseUrl,
										className: "rounded-md bg-gold-soft px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90",
										children: "Read Full Judgment"
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "card-surface p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-gold",
							children: "Case Metadata"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-4 divide-y divide-border",
							children: caseOfTheDay.metadata.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-muted-foreground",
									children: m.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right text-sm font-semibold text-foreground",
									children: m.value
								})]
							}, m.label))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-5 sm:grid-cols-3",
					children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-3xl font-bold text-foreground",
							children: s.value
						})]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground",
						children: "Trending Cases"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						search: { q: "" },
						className: "text-sm font-semibold text-gold hover:underline",
						children: "Browse All →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
					children: trending.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: `/cases/${encodeURIComponent(c.caseId || "")}`,
						search: { q: c.caseId ? c.title : "" },
						className: "card-surface flex flex-col gap-3 p-5 transition-shadow hover:shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow rounded bg-mint px-2 py-0.5 text-mint-foreground",
									children: c.country
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: c.year
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold leading-snug text-foreground",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: c.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-auto pt-3 text-xs font-semibold text-gold",
								children: c.court
							})
						]
					}, c.caseId || c.title))
				})] })
			]
		})
	});
}
//#endregion
export { Index as component };
