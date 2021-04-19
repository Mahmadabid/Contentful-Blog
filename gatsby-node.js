const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blogPost.tsx`)

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
            edges {
              node {
                content {
                  raw
                }
                title
                description
                slug
                image {
                  fluid {
                    src
                  }
                  title
                }
                author
              }
            }
          }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.edges

  if (posts.length > 0) {
    posts.forEach((post, index) => {

      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          data: post.node,
          previous,
          next,
        },
      })
    })
  }
}