import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
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
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
          M.toast({
            html: "Profile pic is updated..",
            classes: "#ad1457 pink darken-3",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file, e) => {
    setImage(file);
    e.target.value = "";
  };

  // const delteprofile = () => {
  //   fetch("/deleteuser", {
  //     method: "delete",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: state._id,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div style={{ maxWidth: "900px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading"}
              alt={state ? state.title : "profile pic"}
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn btnradus waves-effect wavaes-light #d500f9 purple accent-3">
            <span>Update pic</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0], e)}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div>
        {/* <button className="btn waves-effect wavaes-light #d500f9 purple accent-3">
          <i
            className="material-icons"
            style={{ color: "red" }}
            onClick={() => {
              delteprofile();
            }}
          >
            delete
          </i>
        </button> */}
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
