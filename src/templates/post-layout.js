/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PostNavigation from "./../components/site/blog/post-navigation";
import EditPost from "./../components/site/blog/edit-post";
import Main from "./../components/site/layout/main";
import PostAuthor from "./../components/site/blog/post-author";
import PostDate from "./../components/site/blog/post-date";
import SEO from "gatsby-theme-seo/src/components/seo";
import Twitter from "../components/site/home/twitter";
import gsap from "gsap";
import PageTitle from "./../components/common/page-title";
import Divider from "./../components/common/divider";

const PostLayout = ({ data, pageContext, location }) => {
  const {
    frontmatter,
    body,
    excerpt,
    headings,
    fields: { editLink, slug }
  } = data.mdx;
  const { title, date, author, keywords } = frontmatter;
  const { previous, next } = pageContext;

  React.useEffect(() => {
    gsap.to("body", { visibility: "visible" });
  }, []);

  React.useEffect(() => {
    gsap.fromTo(
      ".post-details",
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        stagger: {
          amount: 1,
          from: "random"
        }
      }
    );

    gsap.fromTo(
      ".post",
      { opacity: 0 },
      { opacity: 1, delay: 1.9, duration: 1 }
    );
  }, []);

  const ogImage = `https://vigilant-jones-f0730c.netlify.app/opengraph?title=${title}&tags=${keywords}&author=@studio_hungry`;

  return (
    <Main>
      <SEO
        title={title}
        description={excerpt}
        keywords={keywords}
        pathname={location.pathname}
        twitter="studio_hungry"
        ogImage={ogImage}
      />
      <section>
        <Divider />
        <PageTitle title={title} />
        <div
          sx={{
            display: "flex",
            flexDirection: ["column", "row", "row"],
            justifyContent: ["space-between", "space-between", "space-evenly"],
            margin: "2em auto"
          }}
        >
          <PostAuthor>Author: {author}</PostAuthor>
          <PostDate> Posted: {date}</PostDate>
          <Twitter />
        </div>
        <Divider />
        <MDXRenderer
          className="post"
          headings={headings}
          slug={slug}
          sx={{ height: "100vh" }}
        >
          {body}
        </MDXRenderer>
        <div
          sx={{
            display: "flex",
            flexDirection: ["column", "row", "row"],
            justifyContent: "space-around",
            margin: "2em auto"
          }}
        >
          <EditPost editLink={editLink}>Edit on GitHub.</EditPost>
          {previous === false ? null : (
            <>
              {previous && (
                <PostNavigation destination={previous.fields.slug}>
                  Previous: {previous.frontmatter.title}
                </PostNavigation>
              )}
            </>
          )}
          {next === false ? null : (
            <>
              {next && (
                <PostNavigation destination={next.fields.slug}>
                  Next: {next.frontmatter.title}
                </PostNavigation>
              )}
            </>
          )}
        </div>
      </section>
    </Main>
  );
};

export default PostLayout;

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        category
        author
        keywords
      }
      body
      excerpt
      headings {
        depth
        value
      }
      fields {
        slug
        editLink
      }
    }
  }
`;
