import React from "react";
import PropTypes from "prop-types";
import marked from 'marked'
import Head from 'next/head'

const fetcher = (query) =>
  fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const allBlogsQueryString = `{ 
  allBlogs 
  { 
    id 
    slug 
    userId 
    title 
    description 
    content 
    slug 
    tags { 
      id 
      name 
    } 
  } 
}`;

export const getStaticPaths = async () => {
  const posts = await fetcher(allBlogsQueryString);
  const { allBlogs } = posts;
  const paths = allBlogs.map((blog) => {
    console.log("blog", blog);
    return { params: { slug: blog.slug } };
  });
  console.log("paths", paths);
  return {
    paths,
    fallback: false,
  };
};

const singleBlogQueryString = (slug) => `{
  blogBySlug(slug: "${slug}"){
    id
    slug
    userId
    title
    description
    content
    tags{
      name
    }
  }
}`;

export const getStaticProps = async ({ params: { slug } }) => {
  console.log("get static props:");
  console.log("slug", slug);
  const { blogBySlug } = await fetcher(singleBlogQueryString(slug));
  console.log("single post", blogBySlug);
  // console.log('post content', blogBySlug.content)
  const htmlString = marked(blogBySlug.content)
  // console.log('htmlString', htmlString)
  return {
    props: {
      seoData: {title: blogBySlug.title, description: blogBySlug.description},
      htmlString: htmlString
    }
  }
};

const Post = ({seoData, htmlString}) => {
  console.log('seo data', seoData)
  console.log('htmlString', htmlString)
  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta title="description" content={seoData.description}/>
      </Head>
      <div dangerouslySetInnerHTML={{__html: htmlString}}/>
    </>
  );
};

Post.propTypes = {
  seoData: PropTypes.object,
  htmlString: PropTypes.string
};

export default Post;
