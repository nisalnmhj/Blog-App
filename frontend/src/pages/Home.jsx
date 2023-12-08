import React from "react";
import Loading from "../components/Loading.jsx";
import { BiBookAdd } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { AiFillEdit, AiFillDelete, AiFillEye  } from "react-icons/ai";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/blogs")
      .then((response) => {
        console.log(response.data.data);
        setBlogs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };
  return(
    <div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold my-3 px-4"> Blogs</h1>
          <Link to='/blogs/create'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 mr-7 rounded">
           <span className="flex"> <BiBookAdd className="mx-2 my-1"/> Create Blog</span>
          </button>
          </Link>
        </div>
        
        <div className="flex mx-auto ">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap justify-center mx-auto">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-gradient-to-bl from-blue-100 via-cyan-100 to-purple-300 text-pueple-800 
                                            rounded-lg shadow-md p-6 m-2 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-xl mb-4">{truncateText(blog.body, 100)}</p>
                <p className="text-sm text-gray-500">Author: {blog.author}</p>
                <div className="flex mt-2">
                  <Link to={`/blogs/${blog._id}`}>
                    <AiFillEye className="mr-3 text-2xl transition duration-100 ease-in-out hover:text-blue-700"/>
                  </Link>
                  <Link to = {`/blogs/edit/${blog._id}`}>
                  <AiFillEdit className="mr-3 text-2xl transition duration-100 ease-in-out hover:text-blue-700" /> 
                  </Link>
                  <Link to= {`/blogs/comment/${blog._id} `}>
                    <FaCommentAlt className=" text-xl mr-3 mt-1 transition duration-100 ease-in-out hover:text-blue-700"/>
                  </Link>
                  <Link to={`/blogs/delete/${blog._id}`}>
                  <AiFillDelete className=" text-2xl transition duration-100 ease-in-out hover:text-blue-700"/>
                  </Link>
                </div>
               
              </div>
            ))}
           
          </div>
        )}
      </div>
    </div>
    
     );
};

export default Home;
