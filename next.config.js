const withMdxEnhanced = require("next-mdx-enhanced");
const smartypants = require("@silvenon/remark-smartypants");
const remarkSlug = require("remark-slug");

module.exports = withMdxEnhanced({
  layoutPath: "src/mdx_layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [remarkSlug, smartypants],
})({});
