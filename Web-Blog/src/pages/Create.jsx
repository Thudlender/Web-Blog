import { useState } from "react"
import {useNavigate} from "react-router"
import Swal from "sweetalert2";
import PostService from "../service/post.service";


const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
  if(name === "file"){
    setPostDetail({ ...postDetail, [name]: e.target.files[0] });
  } else {
    setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("file", postDetail.file);
      const response = await PostService.CreatePost(data);
      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post successfully",
          icon: "success",
        }).then(() => {
          setPostDetail({

          });
          navigate("/");
        });
      }
    }catch (error) {

    }
  }

  return (
    <div className="min-h-screen flex item-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={postDetail.title}
            className="shadow appearance-none border rounded w0full py-2
            px-3 text-gray-700 leading-tight focus:out-line-none
            focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="shadow appearance-none border rounded w0full py-2
            px-3 text-gray-700 leading-tight focus:out-line-none
            focus:shadow-outline"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default Create
