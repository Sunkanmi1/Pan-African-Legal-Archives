import { r as getJudges } from "./home.functions-CmYphqUR.js";
import { t as PageShell } from "./PageShell-BcG-WHR1.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/judges.tsx?tsr-split=component
function JudgesPage() {
	const [judges, setJudges] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Promise.all([getJudges()]).then(([profiles]) => {
			setJudges(profiles);
		}).finally(() => setLoading(false));
	}, []);
	return /* @__PURE__ */ jsx(PageShell, {
		withSidebar: false,
		searchPlaceholder: "Search Ghana cases...",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-8 px-5 py-10 lg:px-10",
			children: [
				/* @__PURE__ */ jsxs("header", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow text-gold",
						children: "Ghana Supreme Court"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-3xl font-bold text-foreground",
						children: "Judges and Legal Voices"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: "Explore judges connected to Ghanaian cases, with links to available Wikipedia articles and related Commons media."
					})
				] }),
				loading ? /* @__PURE__ */ jsx("p", {
					className: "py-12 text-center text-sm text-muted-foreground",
					children: "Loading judge profiles..."
				}) : null,
				!loading && judges.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
					children: "No judge profiles are currently available."
				}) : null,
				/* @__PURE__ */ jsx("section", {
					className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
					children: judges.map((judge) => {
						const content = /* @__PURE__ */ jsxs(Fragment, { children: [judge.media[0] ? /* @__PURE__ */ jsx("img", {
							src: judge.media[0].src,
							alt: judge.media[0].caption || judge.name,
							loading: "lazy",
							className: "h-44 w-full object-cover"
						}) : null, /* @__PURE__ */ jsxs("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "eyebrow text-gold",
									children: "Judge"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-2 text-lg font-bold text-foreground",
									children: judge.name
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [judge.case_count.toLocaleString(), " cases indexed"]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-sm font-semibold text-gold",
									children: "View on Wikipedia"
								}),
								judge.media[0]?.license ? /* @__PURE__ */ jsxs("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: ["Image license: ", judge.media[0].license]
								}) : null
							]
						})] });
						return judge.wikipedia_url ? /* @__PURE__ */ jsx("a", {
							href: judge.wikipedia_url,
							target: "_blank",
							rel: "noreferrer",
							className: "card-surface block overflow-hidden transition-shadow hover:shadow-lg",
							children: content
						}, judge.name) : /* @__PURE__ */ jsx("article", {
							className: "card-surface overflow-hidden",
							children: content
						}, judge.name);
					})
				})
			]
		})
	});
}
//#endregion
export { JudgesPage as component };
