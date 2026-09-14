import { n as caseDetailQuery, t as Route } from "./_caseId-P-0dydQk.js";
import { t as PageShell } from "./PageShell-BcG-WHR1.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
//#region src/routes/cases/$caseId.tsx?tsr-split=component
function CaseView() {
	const { caseId } = Route.useParams();
	const { data: caseDetail } = useSuspenseQuery(caseDetailQuery(caseId));
	return /* @__PURE__ */ jsx(PageShell, {
		withSidebar: false,
		searchPlaceholder: "Search precedents...",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-10 px-5 py-10 lg:px-10",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col gap-4 border-b border-border pb-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "eyebrow rounded bg-gold-soft px-3 py-1 text-primary",
							children: caseDetail.badge
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: caseDetail.citation
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-3xl text-3xl font-bold leading-tight text-foreground lg:text-[2.5rem]",
						children: caseDetail.title
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("span", { children: caseDetail.date }),
							/* @__PURE__ */ jsx("span", { children: caseDetail.court }),
							/* @__PURE__ */ jsx("span", { children: caseDetail.bench }),
							/* @__PURE__ */ jsxs("span", { children: [caseDetail.commonsFileUrl ? /* @__PURE__ */ jsx("a", {
								href: caseDetail.commonsFileUrl,
								download: true,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-md bg-primary text-center p-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
								children: "Download PDF"
							}) : null, " "] })
						]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-10 lg:grid-cols-[1.7fr_1fr]",
				children: [/* @__PURE__ */ jsxs("article", {
					className: "flex flex-col gap-5",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold text-foreground",
							children: "Case overview"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[15px] leading-8 text-foreground",
							children: caseDetail.description
						}),
						caseDetail.fullText ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("h2", {
							className: "mt-4 text-xl font-bold text-foreground",
							children: "JUDGEMENT"
						}), /* @__PURE__ */ jsx("div", {
							className: "whitespace-pre-wrap text-[15px] leading-8 text-foreground",
							children: caseDetail.fullText
						})] }) : /* @__PURE__ */ jsx("p", {
							className: "rounded-md bg-secondary p-5 text-sm leading-relaxed text-muted-foreground",
							children: "The full judgment text is not yet available for this case. The record above is sourced from Wikidata."
						})
					]
				}), /* @__PURE__ */ jsxs("aside", {
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "card-surface p-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow text-gold",
							children: "Case summary"
						}), /* @__PURE__ */ jsx("dl", {
							className: "mt-4 divide-y divide-border",
							children: caseDetail.summary.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "py-3",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "text-xs text-muted-foreground",
									children: item.label
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 text-sm font-semibold leading-relaxed text-foreground",
									children: item.value
								})]
							}, item.label))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3",
						children: [
							caseDetail.commonsPreviewUrl ? /* @__PURE__ */ jsx("div", {
								className: "overflow-hidden rounded-md border border-border bg-secondary",
								children: /* @__PURE__ */ jsx("img", {
									src: caseDetail.commonsPreviewUrl,
									alt: "First page of the judgment scan from Wikimedia Commons",
									className: "h-auto w-full"
								})
							}) : null,
							caseDetail.wikisourceUrl ? /* @__PURE__ */ jsx("a", {
								href: caseDetail.wikisourceUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
								children: "Read on Wikisource"
							}) : null,
							caseDetail.commonsFileUrl ? /* @__PURE__ */ jsx("a", {
								href: caseDetail.commonsFileUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-md border border-border px-5 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent",
								children: "View judgment scan on Commons"
							}) : null,
							/* @__PURE__ */ jsx("a", {
								href: caseDetail.articleUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-md border border-border px-5 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent",
								children: "View Wikidata record"
							})
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { CaseView as component };
