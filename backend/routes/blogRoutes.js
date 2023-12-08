import express from "express";
import { Blog } from "../models/blogPost.js";

const router = express.Router();
//POST request to send a blog withe necessary fields
router.post("/", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.body) {
      console.log("please check all the necessary fields");
      alert("Provide all the necessary fields");
    }
    //const instance = await Model.create({ name: 'John Doe' });
    const newBlog = await Blog.create({
      title: request.body.title,
      author: request.body.author,
      body: request.body.body,
    });
    await newBlog.save();
    return response
      .status(201)
      .json({ message: "Blog post created successfully", data: newBlog });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: message.error });
  }
});

//GET requests to get all of the blogs
router.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

//GET requests to get blog interms of id
router.get("/:blogId", async (request, response) => {
  try {
    const { blogId } = request.params;
    const blog = await Blog.findById(blogId);
    if (blog) {
      console.log("user found!");
    }
    return response.status(200).json({
      count: blog.length,
      data: blog,
    });
  } catch (error) {
    console.log(error);
  }
});

// PUT request to update blogs
router.put("/:blogId", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.body) {
      return response
        .status(500)
        .send({ message: "Send all fields: title, author, publishedYear" });
    }
    const { blogId } = request.params;
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, request.body);
    if (!updatedBlog) {
      console.log("Blog Sucessfully Updated");
    }
    return response.status(200).send({
      message: "Blog updated Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//DELETE request to delete Blog
router.delete("/:blogId", async (request, response) => {
  try {
    const { blogId } = request.params;
    await Blog.findByIdAndDelete(blogId);
    return response.status(200).send({
      message: "Blog Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//POST request to add comments in the Blogs
router.post("/:blogId/comments", async (request, response) => {
  try {
    if (!request.body.comment) {
      console.log("Provide Comments");
    }
    const { blogId } = request.params;
    const { text } = request.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.log("Blog not found");
    }
    blog.comment.push({ text });
    await blog.save();
    return response.status(200).json({
      message: "Comment Sucessfully added",
      data: blog,
    });
  } catch (error) {
    console.log(error);
  }
});

//GET request to get comments in the Blogs  // test it
router.get("/:blogId/comments/:commentsId", async (request, response) => {
  try {
    const { blogId, commentsId } = request.params;
    if (!blogId) {
      console.log("Blog not found");
    }
    if (!commentsId) {
      console.log("Comment not found");
    }
    const comment = Blog.findById(commentsId);

    return response.status(200).json({
      message: "Comment",
      data: comment,
    });
  } catch (error) {
    console.log(error);
  }
});

//PUT request to edit the comments  based on their id
router.put("/:blogId/comments/:commentsId", async (request, response) => {
  try {
    if (!request.body.comment) {
      console.log("please provide edited comments");
    }
    const { blogId, commentsId } = request.params;
    const { text } = request.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.log("Blog not found");
    }
    const commentToUpdate = await blog.comment.id(commentsId);
    if (!commentToUpdate) {
      console.log("Comment not found");
    }
    commentToUpdate.text = text;
    await blog.save();
    return response.status(200).json({
      message: "Comment updated successfully",
      data: commentToUpdate,
    });
  } catch (error) {
    console.log(error);
  }
});

//DELETE request to delete comment based upon their Id
router.delete("/:blogId/comments/:commentId", async (request, response) => {
  try {
    const { blogId, commentId } = request.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.log("Blog not found");
    }
    const commentToDelete = blog.comment.id(commentId);
    if (!commentToDelete) {
      console.log("Comment not found");
    }
    blog.comment.pull(commentId); // Remove the comment from the array

    await blog.save();
    return response.status(200).json({
      message: "Comment Deleted successfully",
      data: commentToDelete,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;