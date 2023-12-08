import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import DeleteBlog from './pages/DeleteBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import CommentBlog from './pages/CommentBlog.jsx'
import EditComment from './pages/EditComment.jsx'
import DeleteComment from './pages/DeleteComment.jsx'
import ShowBlog from './pages/ShowBlog.jsx'
 
import './App.css'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/blogs/:id' element={<ShowBlog/>}/>
      <Route path='/blogs/create' element={<CreateBlog/>}/>
      <Route path='/blogs/edit/:id' element={<EditBlog/>}/>
      <Route path='/blogs/comment/:id' element={<CommentBlog/>}/>
      <Route path='/blogs/delete/:id' element={<DeleteBlog/>}/>
      <Route path='/blogs/:id/comment/edit/:commentId' element={<EditComment/>}/>
      <Route path='/blogs/deletecomment/:id' element={<DeleteComment/>}/>
    </Routes>
    </>
  )
}

export default App
