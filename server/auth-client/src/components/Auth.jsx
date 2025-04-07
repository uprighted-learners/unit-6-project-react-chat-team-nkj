import React, { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ updateToken }) => {
    const [signup, setSignup] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("Form submitted");
    
            const respones = await fetch(`http://localhost:8080/${signup ? "signup" : "login"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: signup && firstNameRef.current.value,
                lastName: signup && lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        });
        const data = await respones.json();
        console.log(data);
        if (data.Error) throw new Error(data.Error);
        updateToken(data.token, data.User._id);
        navigate("/rooms");
    } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
    }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{signup ? "Signup" : "Login"}</h2>
            <h4>{errorMsg}</h4>
            {signup && (
            <>
                <input ref={firstNameRef} placeholder="First Name" required />
                <input ref={lastNameRef} placeholder="Last Name" required />
            </>
            )}
            <input ref={emailRef} placeholder="Email" required />
            <input ref={passwordRef} placeholder="Password" required />
            <button>Submit</button>
            <button
              type="button"
              onClick={() => {
                setSignup(!signup);
                setErrorMsg("");
              }}
            >
              {signup ? "Need to login" : "Need to signup"}
            </button>
        </form>
    );
};

export default Auth;


