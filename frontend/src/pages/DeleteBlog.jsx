import React from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'
const DeleteBlog = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  console.log(id);
  const navigate = useNavigate();
  const deleteBlog = ()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/blogs/${id}`)
    .then(()=>{
      setLoading(false);
      navigate('/');
    }).catch((error)=>{
      setLoading(false);
      console.log(error);
    });
  }
  return (
    <div>
       <h1 className="text-3xl font-bold my-3 px-4 flex justify-center"> Delete Blog</h1>
       <div className='flex flex-col items-center border border-blue-400 rounded-xl max-w-md p-8 mx-auto bg-white shadow-md'>
        <h3 className='text-2xl font-semibold mb-6'>Are you sure you want to delete this blog?</h3>
        <div className='flex justify-center space-x-4'>
          <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none transition-colors duration-300 ease-in-out"
          onClick={deleteBlog}
          >
            Delete Blog
          </button>
          <Link to='/'>
          <button
           type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none transition-colors duration-300 ease-in-out"
          >
          Cancel
          </button>
          </Link>
        </div>
    </div>

    </div>
  )
}

export default DeleteBlog