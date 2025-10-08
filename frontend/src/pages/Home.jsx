import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="main-div">
      <center>
        <div>
          <h1 className="first-heading">The ultimate in <br />
            luxury real estate</h1>
          <p className="second-heading">I want to <span>buy </span>a <span>house/apartment</span><br />
            in <span>"select a location"</span></p>
        </div>
        <div>
          <Link to="/Properties">
            <button className="button">FIND A PROPERTY</button>
          </Link>
        </div>
      </center>
    </div>
  );
}
