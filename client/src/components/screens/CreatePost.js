import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CretePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ad1457 pink darken-3" });
          } else {
            M.toast({
              html: "Created post Successfully",
              classes: "#ad1457 pink darken-3",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          M.toast({
            html: "Somthing wents wrong plz try again",
            classes: "#ad1457 pink darken-3",
          });
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clon");
    data.append("cloud_name", "instagramcloud");
    fetch("https://api.cloudinary.com/v1_1/instagramcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
        M.toast({
          html: "Somthing wents wrong plz try again",
          classes: "#ad1457 pink darken-3",
        });
      });
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn btnradus #d500f9 purple accent-3">
          <span>Uplaod Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn btnradus waves-effect waves-light #d500f9 purple accent-3"
        onClick={() => postDetails()}
      >
        Post
      </button>
    </div>
  );
};

export default CretePost;
