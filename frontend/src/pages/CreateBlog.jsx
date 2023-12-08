import React from "react"
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'
export default function CreateBlog() {
const navigate = useNavigate();
const [content, setContent] = useState('');
const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');

const [loading, setLoading] = useState(false);

const saveBlog = ()=>{
  event.preventDefault();
  setLoading(true);
  const data = {
    title: title,
    author: author,
    body: content,
  }

  axios.post(`http://localhost:5555/blogs`, data)
  .then(()=>{
      setLoading(false);
      navigate('/');
  }).catch((error)=>{
    setLoading(false);
    console.log(error)
  });
}
  


return (
<div className="max-w-2xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
  <form className="space-y-4">
    <div>
      <label htmlFor ="title" className="block font-semibold mb-1">Title:</label>
      <input type="text" id="title" name="title" placeholder="Enter title" 
             className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" 
             value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>
    <div>
      <label htmlFor ="author" className="block font-semibold mb-1">Author:</label>
      <input type="text" id="author" name="author" placeholder="Enter author name"
       className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
       value={author} onChange={(e)=>setAuthor(e.target.value)}/>
    </div>
   
    <div>
      <label htmlFor ="blogContent" className="block font-semibold mb-1">Write your blog:</label>
      <textarea id="blogContent" name="blogContent" placeholder="Write your blog content" rows="8" 
      className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:border-blue-500"
      value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
    </div>
    <div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 
      focus:outline-none mr-4" onClick={saveBlog}>Create Blog</button>
      <Link to='/'>
      <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
      </Link>
    </div>
  </form>
</div>

  )
}
