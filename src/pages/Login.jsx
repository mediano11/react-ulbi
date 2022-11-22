import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
    return (
        <div>
            <h1>Log in page</h1>
            <form>
                <MyInput type= "text" placeholder="Login"/>
                <MyInput type="password" placeholder="Password"/>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    );
};

export default Login;