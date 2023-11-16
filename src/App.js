import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
export default function App() {

  const { fetchBlogPosts } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {

    const page = searchParams.get('page') ?? 1;

    if (location.pathname.includes('tags')) {
      let tag = location.pathname.split('/').at(-1).replaceAll("-", " ");
      fetchBlogPosts(page, tag)
    }
    else if (location.pathname.includes('categories')) {
      let category = location.pathname.split('/').at(-1);
      console.log(`Printing in App else if runned and Category is ${category}`);
      fetchBlogPosts(page, null, category);
    }
    else {
      fetchBlogPosts(page);
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <Routes>
        <Route path='/MojBlog/' element={<Home />} />
        <Route path='/categories/:categoryId' element={<Categories category={location.pathname.split('/').at(-1).replaceAll("-", " ")}/>} />
        <Route path='/blog/:blogId' element={<BlogsPage />} />
        <Route path="*" element={<div className=" flex max-h-full h-[100vh] font-bold text-3xl bg-neutral-700 text-white flex-col items-center justify-center">404 | Page Not Found</div>} />
      </Routes>
    </>
  );
}
