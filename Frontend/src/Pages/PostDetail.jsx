import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useAuthContext } from "../Context/AuthContext";
// import { format } from "date-fns"
import { useNavigate } from "react-router";

const Post = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fecthPost = async () => {
        const response = await PostService.getPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      };
      fecthPost();
    } catch (error) {
      Swal.fire({
        title: "Post Detail",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  }, [id]);
  return <div></div>;
};

export default Post;
