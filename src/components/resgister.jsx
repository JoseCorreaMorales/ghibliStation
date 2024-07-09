import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GhibliContext from "../context/ghibliContext";
import "@picocss/pico";
import "../style/theme.css";
import "../style/login.css";
import loginImg from "../assets/loginImg.svg";
import AuthForm from "./AuthForm";
import { createuser } from "../services/usersServices";
import { ThreeDModel } from './login'

const Image = () => {
  return (
    <div className="img-container">
      <img src={loginImg} alt="login image" title="Sign-up image" />
    </div>
  );
};

function Signup() {
  const navigate = useNavigate();
  const { loginUser } = useContext(GhibliContext);
  async function handleFormSubmit(name, username, password) {
    try {
      const userCredential = await createuser(name, username, password);
      const userData = userCredential.user
      loginUser({ email: userData.email, uid: userData.uid });
      navigate("/home");
      window.location.reload();
      console.log("User created:", userData.email, userData.uid);      
    } catch (error) {
      console.log("Error:", error);
    }
  }
  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div data-theme="dark" className="container container-flex">
          <AuthForm
            onFormSubmit={handleFormSubmit}
            buttonText={"Sign-up"}
            isLogin={false}
          ></AuthForm>
          {/* <Image /> */}
            <ThreeDModel />
        </div>
      </form>
    </>
  );
}

export default Signup;
