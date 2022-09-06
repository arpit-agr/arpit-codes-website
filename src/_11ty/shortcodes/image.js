const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, loading, className = '', fetchpriority) {
  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./public/img/"
  });

  let imageAttributes = {
    class: className,
    alt,
    sizes,
    loading,
    fetchpriority,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;