import Link from "next/link";
import Header from "../components/header/Header";
import useSWR from "swr";

const ALL_BLOGS = `{
  allBlogs{
    id
    slug
    userId
    title
    mainImage
    description
    content
    slug
    tags{
      id
      name
    }
  }
}`;

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Home() {
  const { data, error } = useSWR(ALL_BLOGS, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const { allBlogs } = data;
  console.log("all blogs", allBlogs);
  return (
    <div
      id="home-content"
      className="bg-white mx-auto text-center py-4 md:w-4/5 md:px-0 sm:px-16 sm:w-full"
    >
      <div id="blogs">
        {allBlogs.map((blog) => (
          <div className="w-full flex md:flex-row sm:flex-col justify-center mb-5">
            <a href="/blogs" className="w-8/12">
              <img src={blog.mainImage} />
            </a>
            <div className="flex flex-col justify-start items-center px-4 py-5 w-4/12">
              <a className="flex flex-col items-center" href="/blogs">
                <span className="text-3xl font-bold mb-3">{blog.title}</span>
                <span className="w-10 border-gray-600 border-t-2 mb-3"></span>
                <div className="">
                  {blog.description}
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* <div id="tags" className="w-full">
        <div
          id="tags-header"
          className="py-5 border-b-2 border-gray-800 text-left"
        >
          <a
            className="mt-2 hover:text-red-600 transition ease-in-out duration-700"
            href="/blogs"
          >
            <span className="mr-5">Tags</span> <span>{">"}</span>
          </a>
        </div>
        <div id="tags-content" className="flex flex-row items-center h-56 py-5">
          <a href="/blogs" className="flex-1 mr-3 relative">
            <img src="https://picsum.photos/250/150">Travel</img>
            <div className="absolute bottom-0 w-full text-white font-bold opacity-75 hover:opacity-100 bg-black bg-opacity-50 hover:bg-opacity-75">
              Travel
            </div>
          </a>
          <a href="/blogs" className="flex-1 mx-3 relative">
            <img src="https://picsum.photos/250/150">Travel</img>
            <div className="absolute bottom-0 w-full text-white font-bold opacity-75 hover:opacity-100 bg-black bg-opacity-50 hover:bg-opacity-75">
              Travel
            </div>
          </a>
          <a href="/blogs" className="flex-1 mx-3 relative">
            <img src="https://picsum.photos/250/150">Travel</img>
            <div className="absolute bottom-0 w-full text-white font-bold opacity-75 hover:opacity-100 bg-black bg-opacity-50 hover:bg-opacity-75">
              Travel
            </div>
          </a>
          <a href="/blogs" className="flex-1 ml-3 relative">
            <img src="https://picsum.photos/250/150">Travel</img>
            <div className="absolute bottom-0 w-full text-white font-bold opacity-75 hover:opacity-100 bg-black bg-opacity-50 hover:bg-opacity-75">
              Travel
            </div>
          </a>
        </div>
      </div> */}
    </div>
  );
}
