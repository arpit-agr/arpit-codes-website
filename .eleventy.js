const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const imageShortcode = require("./src/_11ty/shortcodes/image");
const sortByDisplayOrder = require("./src/_11ty/utils/sort-by-display-order.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);

	//Plugins
	eleventyConfig.addPlugin(directoryOutputPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);

	//Passthrough copy
	eleventyConfig.addPassthroughCopy("./src/fonts");
	eleventyConfig.addPassthroughCopy("./src/images");
	eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });
	eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");
	eleventyConfig.addPassthroughCopy("./src/scripts");

	//Watch target
	eleventyConfig.addWatchTarget("./src/_includes/css/");
	eleventyConfig.addWatchTarget("./src/scripts/");

	//Filter
	eleventyConfig.addFilter("cssmin", function (code) {
		if (process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		} else {
			return code;
		}
	});
	eleventyConfig.addFilter("postDateTime", (dateObj) => {
		return DateTime.fromJSDate(dateObj)
			.setZone("Asia/Calcutta")
			.setLocale("en-IN")
			.toFormat("ff ZZZZ");
	});
	eleventyConfig.addFilter("addNbsp", (str) => {
		if (!str) {
			return;
		}
		let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
		title = title.replace(/"(.*)"/g, '\\"$1\\"');
		return title;
	});
	eleventyConfig.addFilter("isoDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).setZone("Asia/Calcutta").toISODate();
	});
	eleventyConfig.addFilter("toISO", (dateObj) => {
		return DateTime.fromJSDate(dateObj).setZone("Asia/Calcutta").toISO();
	});
	eleventyConfig.addFilter("nextDay", (dateObj) => {
		return DateTime.fromJSDate(dateObj)
			.setZone("Asia/Calcutta")
			.plus({ days: 1 });
	});
	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj)
			.setZone("Asia/Calcutta")
			.toLocaleString(DateTime.DATE_MED);
	});

	//SHORTCODE
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addShortcode(
		"codetitle",
		function (title, heading = "Filename:") {
			return `<div class="codetitle step--1">${heading} ${title}</div>`;
		}
	);
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	//Transforms
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		// Eleventy 1.0+: use this.inputPath and this.outputPath instead
		if (
			process.env.NODE_ENV === "production" &&
			this.outputPath &&
			this.outputPath.endsWith(".html")
		) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
			});
			return minified;
		}

		return content;
	});

	// Collections
	eleventyConfig.addCollection("pages", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/pages/*.md");
	});
	eleventyConfig.addCollection("projects", function (collectionApi) {
		return sortByDisplayOrder(
			collectionApi.getFilteredByGlob("./src/projects/*.md")
		);
	});
	eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/posts/*.md");
	});
	eleventyConfig.addCollection("links", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/links/*.md");
	});
	eleventyConfig.addCollection("stories", function (collectionApi) {
		return collectionApi.getFilteredByGlob("./src/stories/*.md");
	});
	eleventyConfig.addCollection("bookshelf", function (collectionApi) {
		if (process.env.NODE_ENV === "production") {
			return collectionApi
				.getFilteredByGlob("./src/bookshelf/*.md")
				.sort(() => {
					return 0.5 - Math.random();
				});
		} else {
			return collectionApi.getFilteredByGlob("./src/bookshelf/*.md");
		}
	});

	//Markdown
	let markdownIt = require("markdown-it");
	let markdownItFootnote = require("markdown-it-footnote");
	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};
	let markdownLib = markdownIt(options).use(markdownItFootnote);
	eleventyConfig.setLibrary("md", markdownLib);
	markdownLib.renderer.rules.footnote_caption = (
		tokens,
		idx /*, options, env, slf*/
	) => {
		var n = Number(tokens[idx].meta.id + 1).toString();

		if (tokens[idx].meta.subId > 0) {
			n += ":" + tokens[idx].meta.subId;
		}

		return n;
	};
	markdownLib.renderer.rules.footnote_ref = (
		tokens,
		idx,
		options,
		env,
		slf
	) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
		var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
		var refid = id;
		if (tokens[idx].meta.subId > 0) {
			refid += ":" + tokens[idx].meta.subId;
		}

		return `
			<sup class="footnote-ref">
				<a href="#fn${id}" id="fnref${refid}"><span class="vh">Footnote</span>${caption}</a>
			</sup>`;
	};

	return {
		// dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "public",
		},
	};
};
