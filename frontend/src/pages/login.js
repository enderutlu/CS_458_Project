import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(
    Number(localStorage.getItem("loginAttempts")) || 0
  );
  const [isBlocked, setIsBlocked] = useState(
    localStorage.getItem("isBlocked") === "true"
  );
  const [timer, setTimer] = useState(
    Number(localStorage.getItem("timer")) || 10
  );

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();

  function emailRegexCorrect(email) { 
    return emailRegex.test(email);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailRegexCorrect(email)) {
      setError("Email format is incorrect. Email must contain one '@', characters before '@' and after '@'.");
    }
    else {
      AuthService.login(email, password)
        .then((response) => {
          console.log(response.ok);
          if (response.ok) {
            alert("Login Successful!");
            navigate("/success");
            resetLoginState();
          } else {
            setError("Login failed. Wrong email or password.");
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            localStorage.setItem("loginAttempts", newAttempts);
            // Block login after 5 failed attempts
            if (newAttempts >= 5) {
              setIsBlocked(true);
              localStorage.setItem("isBlocked", "true");
              startTimer();
            }
          }
        })
        .catch((error) => {
          console.error("Login Failed:", error);
          setError("Login failed");
        });
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        localStorage.setItem("timer", newTimer);

        if (newTimer === 0) {
          clearInterval(interval);
          resetLoginState();
        }
        return newTimer;
      });
    }, 1000);
  };

  const resetLoginState = () => {
    setLoginAttempts(0);
    setIsBlocked(false);
    setTimer(10);
    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("isBlocked");
    localStorage.removeItem("timer");
  };

  // Clear localStorage on component unmount (optional)
  useEffect(() => {
    return () => {
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("isBlocked");
      localStorage.removeItem("timer");
    };
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential);
    AuthService.checkExistingUser(decoded.email)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data) {
          alert("User with email " +  decoded.email + " already exists.");
          setError("Google login failed. Please try again.");
        } else {
          alert("Google Login Successful!");
          navigate("/success");
        }
      })
      .catch((error) => {
        console.error("Google login failed. Please try again.", error);
      });
  };

  const handleGoogleFailure = () => {
    console.error("Google Login Failed");
    setError("Google login failed. Please try again.");
  };

  

  return (
    <GoogleOAuthProvider clientId="920285886677-sdrd539vgvciuk4tu3q6okggvvdad963.apps.googleusercontent.com"> 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "24rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Login
          </h1>
          {error && (
            <p
              id="error-message"
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Email or Phone Number"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                outline: "none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isBlocked}
              style={{
                width: "100%",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isBlocked ? `Try again in ${timer} seconds` : "Login"}
            </button>
        </form>
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              color: "#4b5563",
            }}
          >
            Or
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}