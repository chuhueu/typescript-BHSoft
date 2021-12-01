import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./home.css";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/userSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Home = () => {
  const [readMore, setReadMore] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "");
  const dispatch = useAppDispatch();
  const des =
    "Tony Stark creates the Ultron Program to protect the world, but when the peacekeeping program becomes hostile, The Avengers go into action to try and defeat a virtually impossible enemy together. Earth's mightiest heroes must come together once again to protect the world from global extinction.";
  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <header
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://www.themoviedb.org/t/p/original/bcpI5BKBtifdcDjFHsVM6DRi5iU.jpg")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="nav">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <Link to="/register">
          {!user ? (
            <button className="buttonLogin">Register</button>
          ) : (
            <button className="buttonLogin" onClick={() => dispatch(logout())}>
              Log out
            </button>
          )}
        </Link>
      </div>
      <div className="info">
        <h1 className="banner_title">Age of Ultron</h1>
        <span className="desc">
          {readMore ? des : truncate(des, 150)}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "show less" : "read more"}
          </button>
        </span>
        <div className="buttons">
          {!user ? (
            <Popup
              trigger={
                <button className="play">
                  <PlayArrow />
                  <span>Play</span>
                </button>
              }
              modal
              nested
            >
              {(
                close: React.MouseEventHandler<HTMLButtonElement> | undefined
              ) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">Oops!</div>
                  <div className="content">
                    You are not logged in. Please login to use this feature
                  </div>
                  <div className="actions">
                    <Link to="/register" className="button">
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </Popup>
          ) : (
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          )}
          {!user ? (
            <Popup
              trigger={
                <button className="more">
                  <InfoOutlined />
                  <span>Info</span>
                </button>
              }
              modal
              nested
            >
              {(
                close: React.MouseEventHandler<HTMLButtonElement> | undefined
              ) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header">Oops!</div>
                  <div className="content">
                    You are not logged in. Please login to use this feature
                  </div>
                  <div className="actions">
                    <Link to="/register" className="button">
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </Popup>
          ) : (
            <button className="more">
              <InfoOutlined />
              <span>Info</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Home;
