import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../Context/AuthContext";
// import { format } from "date-fns"
import { useNavigate } from "react-router";

const Post = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchPost();
  }, [id]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Post ",
      text: "Do you want to delete this post ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        PostService.deleteById(id);
        Swal.fire({
          title: "Delete Post",
          text: "Delete successfully!",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };
  if (!postDetail) return <div>Not Found</div>;
  return (
    <div className="post-page min-h-full min-w-full flex items-center justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-grey-800">
          {postDetail.title}
        </h1>
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">
            {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
          </time>
          <div className="author mb-2">
            <span className="text-blue-500">@{postDetail.author.username}</span>
          </div>
        </div>
        {user.id === postDetail.author._id && (
          <div className="edit-row mb-4 text-center flex items-center justify-center gap-2">
            <a href={`/edit/${postDetail._id}`} className="btn btn-warning">
              Edit Post
            </a>
            <a
              className="btn btn-error"
              onClick={() => handleDelete(postDetail._id)}
            >
              Delete Post
            </a>
          </div>
        )}
        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        ></div>
      </div>
    </div>
  );
};

export default Post;
