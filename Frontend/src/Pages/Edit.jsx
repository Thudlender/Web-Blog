// import { useImperativeHandle, useRef } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor";
import { useAuthContext } from "../Context/AuthContext";
const Edit = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const { user } = useAuthContext();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    summary: "",
    file: null,
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostsById(id);
        if (response.status === 200) {
          if (user.id !== response.data.author._id) {
            navigate("/");
          }
          setPost(response.data);
          setContent(response.data.content);
        }
      } catch (error) {
        Swal.fire({
          title: "Update Post",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPost({ ...post, [name]: e.target.files[0] });
    } else {
      setPost({ ...post, content: content });
    }
  };
    const handleSubmit = async () => {
      try {
        const data = new FormData();
        data.set("title", post.title);
        data.set("summary", post.summary);
        data.set("content", post.content);
        data.set("file", post.file);
        const response = await PostService.updatePostById
        (id, data);
        if (response.status === 200) {
          Swal.fire({
            title: "Update Post",
            text: "Update post successfully",
            icon: "success",
          }).then(() => {
            setPost({
              title: "",
              summary: "",
              content: "",
              file: null,
            });
            navigate("/");
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Create Post",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
  
  return (
    <div>Edit</div>
  )
}

export default Edit