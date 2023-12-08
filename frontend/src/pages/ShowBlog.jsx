import React from 'react'
import Loading from "../components/Loading.jsx";
import { SlTrash, SlPencil } from "react-icons/sl";
import { useState, useEffect } from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
const ShowBlog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  console.log(id);
  const navigate = useNavigate();
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/blogs/${id}`)
    .then((response) => {
      console.log(id);
      console.log(response.data.data); 
      setBlog(response.data.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
    });

    // axios.get(`http://localhost:5555/blogs/${id}/comments`)
    // .then((commentsResponse) => {
    //   if (commentsResponse.data.data.length === 0) {
    //     console.log('No comments available for this blog post');
    //     // Handle when there are no comments
    //   } else {
    //     // Process and set comments in your component state
    //     setComments(commentsResponse.data.data);
    //   }
    // })
    // .catch((commentsError) => {
    //   console.error('Error fetching comments:', commentsError);
    //   // Handle errors if the request fails
    // });

  }, []);
  console.log(blog)

  const deleteComment = async(commentId)=>{
    try{
      await axios.delete(`http://localhost:5555/blogs/${id}/comments/${commentId}`);
      const response = await axios.get(`http://localhost:5555/blogs/${id}`);
      setBlog(response.data.data);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div >
      {loading ? (
        <Loading/> 
        ):(
            <div > 
              <div className="p-5 mt-10 ml-10 mb-5 sm:px-0">
                <h1 className="text-3xl font-bold leading-7 text-gray-900">Blog</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">Id: {blog._id}</p>
              </div>
              <div className="mt-6 border-t border-gray-100 p-5 m-10">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
                    <dt className="text-lg font-medium leading-6 text-gray-900">Title</dt>
                    <dd className="mt-1 text-lg leading-6 text-gray-800 sm:col-span-2 sm:mt-0">{blog.title}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
                    <dt className="text-lg font-medium leading-6 text-gray-900">Author</dt>
                    <dd className="mt-1 text-lg leading-6 text-gray-800 sm:col-span-2 sm:mt-0">{blog.author}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
                    <dt className="text-lg font-medium leading-6 text-gray-900">Body</dt>
                    <dd className="mt-1 text-lg leading-6 text-gray-800 sm:col-span-2 sm:mt-0">{blog.body}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-0">
                    <dt className="text-lg font-medium leading-6 text-gray-900">Comments</dt>
                    <dd className="mt-1 text-lg leading-6 text-gray-800 sm:col-span-2 sm:mt-0">
                    {blog.comment ? ( // Check if blog.comment exists
                blog.comment.map((commentObj) => (
                  <div key={commentObj._id} className='flex '>
                    {/* Render individual comment properties here */}
                    <p className='mb-2 mr-2'>- {commentObj.text} </p>
                    <button className = 'mb-2' onClick={() => deleteComment(commentObj._id)}>
                      <SlTrash className='mr-2' /> 
                    </button>
                     <Link to={`/blogs/${blog._id}/comment/edit/${commentObj._id}`} state={{ commentText: commentObj.text }}> <SlPencil/> </Link>
                    
                    {/* Include other comment properties if needed */}
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
                    </dd>
                  </div>
                </dl>
                <Link to={`/blogs/comment/${blog._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 mr-7 rounded">Add comment</button>
                </Link>
              </div>
              
            </div>
        )}

    </div>
  )
}

export default ShowBlog