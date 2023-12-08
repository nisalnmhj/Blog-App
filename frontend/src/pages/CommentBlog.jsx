import React, { useState } from "react";
import Loading from "../components/Loading.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CommentBlog = () => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  const postComment = async () => {
    setLoading(true);
    const data = {
      text: comment,
    };
    try {
      await axios.post(`http://localhost:5555/blogs/${id}/comments`, data);
      setLoading(false);
      navigate(`/blogs/${id}`);
      // Fetch comments again after successfully posting a comment
    } catch (error) {
      setLoading(false);
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="col-span-full m-10">
          <label
            htmlFor="about"
            className="block mb-3 text-2xl font-medium leading-6 text-gray-900"
          >
            Comment Section
          </label>
          <div className="mt-2 w-2/4">
            <textarea
              id="comment"
              name="comment"
              rows={5}
              className="flex justify-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={"Add comments"}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <Link to={`/blogs/${id}`}>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 mr-7 rounded"
              onClick={postComment}
            >
              Post Comment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommentBlog;
