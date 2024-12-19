import api from "./api";
const API_URL = import.meta.env.VITE_BASE_URL + "/post";

const createPost = async (post) => {
    const response = await api.post(API_URL, post, {
        headers:
    })
}
