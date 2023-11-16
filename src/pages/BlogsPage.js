import React, { useState } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
const BlogsPage = () => {
  const baseUrl = "https://codehelp-apis.vercel.app/api/get-blog";
  const [newPost, setNewPost] = useState([]);
  const [oldPost, setOldPost] = useState([]);
  const navigation = useNavigate();
  const location = useLocation();
  const { loading, setPosts, setLoading, setPage, setTotalPages } =
    useContext(AppContext);
  let tag = location.pathname.split("/").at(-1);

  async function fetchD() {
    let url = `${baseUrl}?blogId=${tag}`;
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Api Response in Blog see", data);
      setPage(1);
      setNewPost(data.relatedBlogs);
      setOldPost(data.blog)
      setTotalPages(1);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchD();
  }, [location.pathname,location.search]);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <Header />
      <div className="mt-[80px]">
        <div className="w-11/12 max-w-2xl mx-auto flex gap-8 items-center mb-3">
          <button className="border py-2 px-6" onClick={() => navigation(-1)}>
            Back
          </button>
        </div>
        {loading ? (
          <div className="min-h-[80vh] w-full flex justify-center items-center">
            <p className="text-center font-bold text-3xl">Loading</p>
          </div>
        ) : (
          <div className="w-11/12 max-w-2xl flex flex-col justify-center items-center">
            {
               setTotalPages(1)
            }
            <div key={oldPost.id} className="w-11/12 max-w-2xl mx-auto mb-10 mt-5">
                  
                    <p className="font-bold text-lg">{oldPost.title}</p>
                  
                  <p className="text-sm my-1">
                    By <span className="italic">{oldPost.author}</span> on{" "}
                      <span className="font-semibold underline cursor-pointer">
                        {oldPost.category}
                      </span>
                  </p>
                  <p className="text-sm">Posted On {oldPost.date}</p>
                  <p className="mt-4 mb-2">{oldPost.content}</p>
                  <div className="flex flex-wrap gap-x-2 items-center">
                    
                  </div>
                </div>
            <h1 className="text-2xl font-bold w-11/12 max-w-2xl my-5 ">Related Blog</h1>
            {
              newPost.map((post) => (
                <div key={post.id} className="w-11/12 max-w-2xl mx-auto mb-10 mt-5">
                  <NavLink to={`/blog/${post.id}`}>
                    <p className="font-bold text-lg">{post.title}</p>
                  </NavLink>
                  <p className="text-sm my-1">
                    By <span className="italic">{post.author}</span> on{" "}
                    <NavLink
                      to={`/categories/${post.category.replaceAll(" ", "-")}`}
                    >
                      <span className="font-semibold underline cursor-pointer">
                        {post.category}
                      </span>
                    </NavLink>
                  </p>
                  <p className="text-sm">Posted On {post.date}</p>
                  <p className="mt-4 mb-2">{post.content}</p>
                  <div className="flex flex-wrap gap-x-2 items-center">
                    {post.tags.map((tag, index) => (
                      <NavLink
                        key={index}
                        to={`/categories/${tag.replaceAll(" ", "-")}`}
                      >
                        <span className="text-xs font-semibold underline text-blue-700 cursor-pointer">{`#${tag}`}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
          
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default BlogsPage;
