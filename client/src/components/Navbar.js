import axios from "axios";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [name, setName] = useState();

  useEffect((e) => {
    //Runs on every render

    if (localStorage.getItem("token") != null) {
      console.log("useEffect Called");

      const len = localStorage.getItem("token").length;

      let result = localStorage.getItem("token").slice(1, len - 1);
      const abc = { token: result };

      axios
        .post("http://localhost:5000/user/view", abc)
        .then((res) => {
          console.log(res.data.userId);
          const ids = res.data.userId;
          const name = res.data.name;
          setName(name);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      console.log("useEffect Called");
    }
  }, []);

  const logout = (e) => {
    if (window.confirm("You Want To LogOut ")) {
      const token = localStorage.removeItem("token");

      if (token == null) {
        alert("logOut Success ");
        window.location.reload();
      }
    }
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark ml-2">
        <img
          src="https://icon-library.com/images/traveling-icon/traveling-icon-15.jpg"
          width="35"
          height="35"
          class="d-inline-block align-top m-2 "
          alt=""
          loading="lazy"
        />
        <a class="m-2 navbar-brand" href="/dashboard">
          Smart Tickets
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/dashboard">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>

            {localStorage.getItem("token") == null ? (
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
            ) : (
              <ul class="navbar-nav">
                <li class="nav-item ">
                  <a class="nav-link" href="/dashboard">
                    {name}{" "}
                  </a>
                </li>

                <li class="nav-item ">
                  <a class="nav-link" onClick={logout}>
                    {" "}
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
