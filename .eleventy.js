const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const imageShortcode = require("./src/_11ty/shortcodes/image");
const sortByDisplayOrder = require('./src/_11ty/utils/sort-by-display-order.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  //Plugins
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  //Passthrough copy
  eleventyConfig.addPassthroughCopy("./src/fonts");
	eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy({"./src/favicons": "/"});
	eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");
	eleventyConfig.addPassthroughCopy("./src/scripts");

  //Watch target
	eleventyConfig.addWatchTarget("./src/_includes/css/");
	eleventyConfig.addWatchTarget('./src/scripts/');

  //Filter
  eleventyConfig.addFilter("cssmin", function(code) {
    if(process.env.NODE_ENV === "production") {
      return new CleanCSS({}).minify(code).styles;
    }
    else {
      return code
    }
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	});

  //SHORTCODE
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addPairedShortcode('aside', (content, { id }) => {
    return `<a href="#${id}" id="${id}ref" class="aside-phrase">${content}</a>`;
  });
  eleventyConfig.addPairedShortcode('asideText', (content, { id }) => {
    return `
<aside class="aside" id="${id}" aria-labelledby="${id}ref">
	<details-utils close-esc>
	<details class="flow">
    <summary class="font-weight:500">Aside</summary>
    ${content}
  </details>
	</details-utils>
</aside>
`;
  });

  //Transforms
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if(process.env.NODE_ENV === "production" && this.outputPath && this.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      });
      return minified;
    }

    return content;
  });

  // Collections
	eleventyConfig.addCollection("pages", function(collectionApi) {
		return sortByDisplayOrder(collectionApi.getFilteredByGlob("./src/pages/*.md"));
	});
  eleventyConfig.addCollection("projects", function(collectionApi) {
		return sortByDisplayOrder(collectionApi.getFilteredByGlob("./src/projects/*.md"));
	});
	eleventyConfig.addCollection("posts", function(collectionApi) {
		return sortByDisplayOrder(collectionApi.getFilteredByGlob("./src/posts/*.md"));
	});
  eleventyConfig.addCollection("links", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/links/*.md");
  });

  //Markdown
  let markdownIt = require("markdown-it");
	let markdownItFootnote = require("markdown-it-footnote");
  let options = {
    html: true,
    breaks: true,
    linkify: true
	};
  let markdownLib = markdownIt(options).use(markdownItFootnote);
	eleventyConfig.setLibrary("md", markdownLib);
  markdownLib.renderer.rules.footnote_caption = (tokens, idx/*, options, env, slf*/) => {
    var n = Number(tokens[idx].meta.id + 1).toString();
  
    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }
  
    return n;
  }
  markdownLib.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
		var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
		var refid = id;
		if (tokens[idx].meta.subId > 0) {
			refid += ':' + tokens[idx].meta.subId;
		}
	
		return `
			<sup class="footnote-ref">
				<a href="#fn${id}" id="fnref${refid}"><span class="vh">Footnote</span>${caption}</a>
			</sup>`;
	}
  markdownLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
		var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
		var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
		var refid = id;
		
		if (tokens[idx].meta.subId > 0) {
			id += ':' + tokens[idx].meta.subId;
		}
		if (tokens[idx].meta.subId > 0) {
			refid += ':' + tokens[idx].meta.subId;
		}

		return ``;
	}

  return {
    // dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
		dir: {
			input: 'src',
			output: 'public'
		}
	};
};