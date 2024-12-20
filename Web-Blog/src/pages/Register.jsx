import { useState } from "react";
import AuthService from "../../service/auth.service";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...user, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      const currentUser = AuthService.register(user.username, user.password);
      console.log(currentUser.status);
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: currentUser.data.message,
          icon: "success",
        });
        setUser({
          username: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Duplicate usernames in the system",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return <div>  </div>;
};

export default Register;
