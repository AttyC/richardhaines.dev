const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const postLayoutTemplate = path.resolve(
    'src/templates/post-layout.js'
  )

  return graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
            category
            author
          }
          fields {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.nodes

    posts.forEach((post, index) => {
      const previous =
        index === post.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: post.fields.slug,
        component: postLayoutTemplate,
        context: {
          slug: post.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/molebox/richardhaines.dev/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })
  }
}
