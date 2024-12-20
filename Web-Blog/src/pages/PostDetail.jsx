import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Post = () => {
  const [postDetail, setPostDetail] = useState(null)
  const {id} = useParams();
  useEffect(()=>{
    try {
      const response = await PostService.getPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
    } catch (error) {
      Swal.fire({
        title: "Post Detail",
        text: error?.response?.data?.message || error.message,
          icon: "error",
      });
    }
  }, [id])
  return (
    <div>
      
    </div>
  )
}

export default Post
