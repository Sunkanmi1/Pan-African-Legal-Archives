import { X as __toESM, c as require_jsx_runtime, q as require_react } from "./__23tanstack-start-server-fn-resolver-DYGRXsYa.js";
import { n as Link } from "./createSsrRpc-CR1ROAQz.js";
import { t as useSearch } from "./useSearch-Bux5FJkr.js";
import { a as searchCases } from "./home.functions-DHVcA4rM.js";
import { t as PageShell } from "./PageShell-Dc661c-j.js";
//#region src/routes/search.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q: initialQuery } = useSearch({ from: "/search" });
	const [query, setQuery] = (0, import_react.useState)(initialQuery);
	const [year, setYear] = (0, import_react.useState)("");
	const [judge, setJudge] = (0, import_react.useState)("");
	const [caseType, setCaseType] = (0, import_react.useState)("");
	const [courtLevel, setCourtLevel] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [page, setPage] = (0, import_react.useState)(1);
	const [totalPages, setTotalPages] = (0, import_react.useState)(1);
	const [loading, setLoading] = (0, import_react.useState)(Boolean(initialQuery));
	const [error, setError] = (0, import_react.useState)(false);
	async function loadResults(nextPage = 1) {
		setLoading(true);
		setError(false);
		const filters = {
			q: query.trim(),
			page: nextPage,
			page_size: 20,
			judge: judge.trim() || void 0,
			case_type: caseType.trim() || void 0,
			court_level: courtLevel || void 0,
			year: year ? Number(year) : void 0
		};
		try {
			const response = await searchCases({ data: filters });
			setResults(response.results);
			setTotal(response.total_results);
			setPage(response.page);
			setTotalPages(response.total_pages);
		} catch {
			setError(true);
			setResults([]);
			setTotal(0);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (initialQuery.trim()) loadResults();
	}, []);
	function submit(event) {
		event.preventDefault();
		if (query.trim() || year || judge.trim() || caseType.trim() || courtLevel) loadResults(1);
		else {
			setResults([]);
			setTotal(0);
			setPage(1);
			setTotalPages(1);
			setError(false);
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		withSidebar: false,
		searchPlaceholder: "Search Ghana cases...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8 px-5 py-10 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-gold",
						children: "Ghana Case Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-bold text-foreground",
						children: "Find a Ghana court case"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Search by case name, judge, court, year, or keyword."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "card-surface grid gap-4 p-5 md:grid-cols-[1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "case-search",
							children: "Search cases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "case-search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Try Tetteh v Hayford",
							className: "h-11 rounded-md border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90",
							children: "Search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 md:col-span-2 md:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: ["Year", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: year,
										onChange: (event) => setYear(event.target.value),
										inputMode: "numeric",
										placeholder: "Any year",
										className: "mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm font-normal text-foreground outline-none focus:border-gold"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: ["Judge", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: judge,
										onChange: (event) => setJudge(event.target.value),
										placeholder: "Any judge",
										className: "mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm font-normal text-foreground outline-none focus:border-gold"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: [
										"Case type",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: caseType,
											onChange: (event) => setCaseType(event.target.value),
											list: "case-type-options",
											placeholder: "Criminal",
											className: "mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm font-normal text-foreground outline-none focus:border-gold"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("datalist", {
											id: "case-type-options",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Criminal" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Constitutional" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Commercial" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Family" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Labour" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Tax" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "Land" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "General" })
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: ["Court", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: courtLevel,
										onChange: (event) => setCourtLevel(event.target.value),
										className: "mt-1 h-10 w-full rounded-md border border-input bg-surface px-3 text-sm font-normal text-foreground outline-none focus:border-gold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Any court"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "supreme",
												children: "Supreme Court"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "high",
												children: "High Court"
											})
										]
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4 border-b border-border pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-foreground",
								children: "Search results"
							}), !loading && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [total.toLocaleString(), " cases found"]
							}) : null] }), totalPages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Page ",
									page,
									" of ",
									totalPages
								]
							}) : null]
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "Loading cases..."
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-12 text-center text-sm text-destructive",
							children: "We could not retrieve cases. Please try again."
						}) : null,
						!loading && !error && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "Enter a case, year, judge, or court to search Ghana's case records."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-4",
							children: results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, { result }, result.case_id))
						}),
						totalPages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: page === 1,
								onClick: () => void loadResults(page - 1),
								className: "rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground disabled:opacity-40",
								children: "Previous"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: page === totalPages,
								onClick: () => void loadResults(page + 1),
								className: "rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground disabled:opacity-40",
								children: "Next"
							})]
						}) : null
					]
				})
			]
		})
	});
}
function ResultCard({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-surface p-5 transition-shadow hover:shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow rounded bg-mint px-2 py-0.5 text-mint-foreground",
						children: result.court_level === "high" ? "High Court" : "Supreme Court"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow rounded bg-gold-soft px-2 py-0.5 text-primary",
						children: result.case_type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: result.date
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-lg font-bold text-foreground",
				children: result.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					result.citation,
					" · ",
					result.court
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-foreground",
				children: result.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: result.judges.map((judge) => judge.name).join(", ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cases/$caseId",
					params: { caseId: result.case_id },
					className: "text-sm font-semibold text-gold hover:underline",
					children: "Read case"
				})]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
