module.exports = {
	backToArchive: {
		url: "/blog/",
		text: "← All Posts"
	},
	layout: "layouts/post.html",
	permalink: "./blog/{% if customSlug %}{{ customSlug | slugify }}{% else %}{{ title | slugify }}{% endif %}/",
	eleventyComputed: {
		eleventyExcludeFromCollections: (data) => data.draft,
	}
};
