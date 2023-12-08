import React, { useState, useEffect} from "react";
import Loading from "../components/Loading.jsx";
import { Link, useNavigate, useParams, useLocation  } from "react-router-dom";
import axios from "axios";

const EditComment = () => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { id, commentId } = useParams();

  useEffect(() => {
    if (location.state && location.state.commentText) {
      setComment(location.state.commentText);
    }
  }, [location.state]);

  console.log(id );
  console.log( commentId );
  const postComment = async () => {
    setLoading(true);
    const data = {
      text: comment,
    };
    try {
      await axios.put(`http://localhost:5555/blogs/${id}/comments/${commentId}`, data);
      setLoading(false);
      navigate(`/blogs/${id}`, { state: { updatedComment: data } });
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
            Edit your Comment
          </label>
          <div className="mt-2 w-2/4">
            <textarea
              id="comment"
              name="comment"
              rows={5}
              className="flex justify-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={comment}
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
              Change Comment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EditComment;
