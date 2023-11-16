import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-y-10 my-4">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <p className="text-center font-bold text-3xl">No Blogs Found !</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="w-11/12 max-w-2xl mx-auto">
            <NavLink to={`/blog/${post.id}`}>
            <p className="font-bold text-lg">{post.title}</p>
            </NavLink> 
            <p className="text-sm my-1">
              By <span className="italic">{post.author}</span> on{" "}
              <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
              <span className="font-semibold underline cursor-pointer">{post.category}</span>
              </NavLink>
            </p>
            <p className="text-sm">Posted On {post.date}</p>
            <p className="mt-4 mb-2">{post.content}</p>
            <div className="flex flex-wrap gap-x-2 items-center">
              {post.tags.map((tag, index) => (
                <NavLink key={index} to={`/categories/${tag.replaceAll(" ","-")}`}>
                <span
                  
                  className="text-xs font-semibold underline text-blue-700 cursor-pointer">{`#${tag}`}</span>
                  </NavLink>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
