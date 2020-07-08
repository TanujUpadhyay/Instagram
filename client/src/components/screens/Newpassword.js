import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

const Newpassword = () => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const { token } = useParams();
  const PostData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#ad1457 pink darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#ad1457 pink darken-3" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <img src="instagram.png" alt="instagram" width="50px" hight="50px" />
        <h2 className="customfornt" style={{ padding: "0px", margin: "5px" }}>
          Instagram
        </h2>
        <input
          type="password"
          placeholder="enter a new password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        />
        <button
          className="btn btnradus waves-effect waves-light #d500f9 purple accent-3"
          onClick={() => PostData()}
        >
          Update password
        </button>
      </div>
    </div>
  );
};

export default Newpassword;
