import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import SignUp from "./SingUp";
import { useNavigate } from "react-router-dom";
import { IoIosEyeOff } from "react-icons/io";
import BradLoader from "../component/loader/BradLoader";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  loginContainer: {
    width: "90%",
    margin: "1rem auto",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.color.littleDarker,
  },

  logSvg: {
    objectFit: "contain",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color.littleDarker,
  },
  logAvatar: {
    width: "90%",
    borderRadius: "10px",
  },
  formContainer: {
    width: "45%",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  form: {
    width: "70%",
    margin: "1rem auto",
    backgroundColor: "#fff",
    height: "80%",
    borderRadius: "10px",
    padding: "1rem",
    paddingLeft: "4rem",
  },
  loginTitle: {
    textAlign: "center",
    marginTop: "1rem",
  },
  signinHeader: {
    textAlign: "center",
  },
  inputWrapper: {
    margin: "1.5rem 0",
  },
  input: {
    width: "80%",
    padding: " .8rem .5rem",
    borderRadius: "10px",
    border: "none",
    textAlign: "left",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: theme.color.littleDarker,
  },
  eyeIcon: {
    marginLeft: "-2rem",
    cursor: "pointer",
    marginBottom: "-.3rem",
  },

  inputLabel: {
    marginBottom: ".7rem",
  },

  signBtn: {
    width: "50%",
    padding: ".8rem .5rem",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: ".5rem 0",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
      border: "2px solid #000",
    },
  },
  signup: {
    marginTop: "1.5rem",
    cursor: "pointer",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "blue",
  },

  "@media (max-width: 1000px)": {
    loginContainer: {
      width: '100%',
    },
    logSvg: {
      display: "none",
    },
    loginTitle: {
      fontSize: theme.smallerFont,
      marginTop: "0.5rem",
    },
    formContainer: {
      width: "90%",
      margin: "1rem auto",
      height: "fit-content",
      padding: "1rem 0",
    },
    form: {
      width: "100%",
      padding: "1rem 0 1rem .5rem",
    },
    input: {
      width: "90%",
    },
    signBtn: {
      width: "95%",
      margin: "1rem 0",
    },
    signup: {
      marginTop: "1rem",
    },
  },
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePage, setTogglePage] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const navigator = useNavigate();

  const toHomePage = () => {
    navigator("/gallery");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      setIsLoading(false);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential) {
          setTimeout(() => {
            toHomePage();
          }, 3000);
        }
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setIsLoading(false);
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      });
  };

  const handleSignUp = () => {
    setTogglePage(false);
  };


  return (
    <>
      {togglePage ? (
        <div className={classes.loginContainer}>
          <div className={classes.logSvg}>
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=1060&t=st=1695234585~exp=1695235185~hmac=305d20d3e7b5805fab624ea4784ecc0bbb220b9c45f6d47e69ab868ec685d568"
              alt="svg"
              className={classes.logAvatar}
            />
          </div>
          {isLoading && <BradLoader />}

          <div className={classes.formContainer}>
            <h1 className={classes.loginTitle}>
              Login to access Image Gallery
            </h1>
            {errorMsg && <p className={classes.errorMessage}>{errorMsg}</p>}
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.signinHeader}>
                <h3>Sign In</h3>
                <p>Welcome back please sign in</p>
              </div>

              <div className={classes.inputWrapper}>
                <p className={classes.inputLabel}>Enter Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className={classes.input}
                  placeholder="user@example.com"
                />
              </div>
              <div className={classes.inputWrapper}>
                <p className={classes.inputLabel}>Enter Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={passwordVisibility ? "password" : "text"}
                  className={classes.input}
                  placeholder="1Password"
                />
                <IoIosEyeOff
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                  className={classes.eyeIcon}
                />
              </div>
              <button className={classes.signBtn}>Sign In</button>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span onClick={handleSignUp} className={classes.signup}>
                    Sign up
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </>
  );
};

export default Login;
