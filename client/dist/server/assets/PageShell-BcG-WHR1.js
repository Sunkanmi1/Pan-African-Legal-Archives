import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/panla.png
var panla_default = "/assets/panla-AZgPRKUV.png";
//#endregion
//#region src/assets/Goif Logo.png
var Goif_Logo_default = "/assets/Goif%20Logo-xTS23Z7_.png";
//#endregion
//#region src/components/site/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "border-t border-border bg-primary text-primary-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1280px] gap-1 px-5 py-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:items-start",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("img", {
							src: panla_default,
							alt: "Africa Legal Archive logo",
							className: "size-10 rounded-full object-cover"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-serif text-lg font-bold",
							children: "PALA"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70",
						children: "A collaborative platform for the preservation and accessibility of African legal knowledge. Operated as a community-driven repository under Creative Commons."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-xs text-primary-foreground/50",
						children: "© 2024 Pan-African Legal Archive. Knowledge is the foundation of justice."
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow text-gold-soft",
					children: "Ecosystem"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-4 space-y-2 text-sm text-primary-foreground/70",
					children: [
						/* @__PURE__ */ jsx("li", { children: "Wikidata" }),
						/* @__PURE__ */ jsx("li", { children: "Wikimedia Commons" }),
						/* @__PURE__ */ jsx("li", { children: "WikiSource" })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow text-gold-soft",
					children: "Legal"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2 text-sm text-primary-foreground/70",
					children: /* @__PURE__ */ jsx("li", { children: "CC by 4.0" })
				})] }),
				/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, {
					to: "https://globalopeninitiative.org/",
					children: [/* @__PURE__ */ jsx("img", {
						src: Goif_Logo_default,
						alt: "GLOBAL OPEN INITIATIVE FOUNDATION logo",
						className: "h-15 w-30"
					}), /* @__PURE__ */ jsx("p", {
						className: "eyebrow text-sm text-primary-foreground/70",
						children: "project by GLOBAL OPEN INNITIATIVE FOUNDATION"
					})]
				}) })
			]
		})
	});
}
//#endregion
//#region src/components/site/Sidebar.tsx
var categories = [{
	label: "Home",
	to: "/",
	icon: "M3 11 12 4l9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"
}, {
	label: "Judges",
	to: "/judges",
	icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7 9a7 7 0 0 1 14 0"
}];
function Sidebar() {
	return /* @__PURE__ */ jsx("aside", {
		className: "hidden w-[248px] shrink-0 self-stretch border-r border-border bg-surface lg:block",
		children: /* @__PURE__ */ jsxs("div", {
			className: "sticky top-[71px] flex flex-col gap-6 p-6",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow text-gold",
					children: "Browse Laws"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Ghana Jurisdiction"
				})] }),
				/* @__PURE__ */ jsx("nav", {
					className: "flex flex-col gap-1",
					children: categories.map((c) => /* @__PURE__ */ jsxs(Link, {
						to: c.to,
						className: "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:font-semibold [&.active]:text-foreground",
						children: [/* @__PURE__ */ jsx("svg", {
							"aria-hidden": true,
							viewBox: "0 0 24 24",
							className: "size-4",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.6",
							children: /* @__PURE__ */ jsx("path", { d: c.icon })
						}), c.label]
					}, c.label))
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/search",
					className: "text-xs font-semibold text-gold hover:underline",
					children: "Browse Case Records →"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto flex flex-col gap-1 border-t border-border pt-5 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: "cursor-default rounded-md px-3 py-2 hover:bg-accent",
						children: "Settings"
					}), /* @__PURE__ */ jsx("span", {
						className: "cursor-default rounded-md px-3 py-2 hover:bg-accent",
						children: "Help"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/site/TopNav.tsx
var links = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Browse",
		to: "/search"
	},
	{
		label: "Judges",
		to: "/judges"
	}
];
function TopNav({ searchPlaceholder = "Search statutes..." }) {
	const [query, setQuery] = useState("");
	function submitSearch(event) {
		event.preventDefault();
		const value = query.trim();
		if (value) window.location.assign(`/search?q=${encodeURIComponent(value)}`);
	}
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-40 border-b border-border bg-primary text-primary-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex h-[71px] max-w-[1280px] items-center gap-6 px-5",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ jsx("img", {
						src: panla_default,
						alt: "Africa Legal Archive logo",
						className: "size-10 rounded-full object-cover"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-serif text-lg font-bold tracking-tight",
						children: "PALA"
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden items-center gap-6 md:flex",
					children: links.map((l) => /* @__PURE__ */ jsx(Link, {
						to: l.to,
						className: "text-sm text-primary-foreground/75 transition-colors hover:text-gold-soft [&.active]:text-gold-soft",
						children: l.label
					}, l.label))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "ml-auto flex items-center gap-3",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submitSearch,
						className: "relative min-w-0 flex-1 sm:flex-none",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Search"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "search",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								"aria-label": "Search Ghana Supreme Court cases",
								placeholder: searchPlaceholder,
								className: "h-9 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 pl-9 pr-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold-soft focus:outline-none sm:w-56 lg:w-72"
							}),
							/* @__PURE__ */ jsxs("svg", {
								"aria-hidden": true,
								viewBox: "0 0 24 24",
								className: "pointer-events-none absolute left-2.5 top-2.5 size-4 text-primary-foreground/50",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ jsx("circle", {
									cx: "11",
									cy: "11",
									r: "7"
								}), /* @__PURE__ */ jsx("path", { d: "m20 20-3.5-3.5" })]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/site/PageShell.tsx
function PageShell({ children, withSidebar = true, searchPlaceholder }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx(TopNav, { searchPlaceholder }),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex w-full max-w-[1280px] flex-1 items-stretch",
				children: [withSidebar ? /* @__PURE__ */ jsx(Sidebar, {}) : null, /* @__PURE__ */ jsx("main", {
					className: "min-w-0 flex-1",
					children
				})]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { PageShell as t };
