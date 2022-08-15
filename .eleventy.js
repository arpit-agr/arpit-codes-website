const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const imageShortcode = require("./src/_11ty/shortcodes/image");
const sortByDisplayOrder = require('./src/_11ty/utils/sort-by-display-order.js');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

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
	// eleventyConfig.addPassthroughCopy("./src/scripts");

  //Watch target
	// eleventyConfig.addWatchTarget("./src/_includes/css/");
	// eleventyConfig.addWatchTarget('./src/scripts/');

  //Filter
  eleventyConfig.addFilter("cssmin", function(code) {
    if(process.env.NODE_ENV === "production") {
      return new CleanCSS({}).minify(code).styles;
    }
    else {
      return code
    }
  });

  //SHORTCODE
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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

  // COLLECTIONS
	eleventyConfig.addCollection("projects", function(collectionApi) {
		return sortByDisplayOrder(collectionApi.getFilteredByGlob("./src/projects/*.md"));
	});
	eleventyConfig.addCollection("pages", function(collectionApi) {
		return sortByDisplayOrder(collectionApi.getFilteredByGlob("./src/pages/*.md"));
	});

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