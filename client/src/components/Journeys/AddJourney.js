import React, { useEffect, useState } from "react";
import axios from "axios";

import { Col, Form, Row } from "react-bootstrap";

function AddJourney() {
  const [uniqueID, setUniqueID] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");

  const [validated, setValidated] = useState(false);

  useEffect((e) => {
    //Runs on every render

    const len = localStorage.getItem("token").length;
    let result = localStorage.getItem("token").slice(1, len - 1);
    const abc = { token: result };

    axios
      .post("http://localhost:5000/user/view", abc)
      .then((res) => {
        setUniqueID(res.data.uniqueID);

        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  });

  const addJourney = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const newStudent = {
        uniqueID: uniqueID,
        start,
        end,
        distance,
        price: price,
      };

      await axios
        .post("http://localhost:5000/journey/add", newStudent)
        .then((res) => {
          alert("Journey Booked");
          console.log(res.data);
        });
    }
    setValidated(true);
  };

  const calcDistance = (e) => {
    const price = distance * 50;

    setPrice(price);
  };

  return (
    <div>
      <div style={{ marginLeft: "380px" }}>
        <div className="container mt-3">
          <div
            className="shadow-sm p-3 mb-5 bg-white rounded"
            style={{ maxWidth: "600px" }}
          >
            <h1>Add New Journey</h1>
            <hr />

            {price && <h2>Price : Rs.{price}/=</h2>}

            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => addJourney(e)}
            >
              <div>
                <label for="image">Distance in km*</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid" className=" mb-2">
                  Please provide Password
                </Form.Control.Feedback>
                <button
                  value={distance}
                  onClick={(e) => calcDistance(e.target.value)}
                >
                  {" "}
                  Calc Price
                </button>
              </div>
              <Row>
                <Col>
                  <div>
                    <label for="description">Starting Point</label>
                    <input
                      type="text"
                      id="description"
                      className="form-control mb-3 "
                      placeholder="Starts From"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      required
                    />
                  </div>
                </Col>

                <Col>
                  <div>
                    <label for="users">Ending Point </label>
                    <input
                      type="text"
                      id="users"
                      className="form-control col-md-2 mb-3"
                      placeholder="Ends At"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      required
                    />
                  </div>
                </Col>
              </Row>

              <div>
                <label for="image"> Price</label>
                <input
                  type="text"
                  id="image"
                  className="form-control mb-3"
                  placeholder="Price"
                  disabled
                  value={`Rs ${price}`}
                  required
                />
                <Form.Control.Feedback type="invalid" className=" mb-2">
                  Please Confirm Password
                </Form.Control.Feedback>
              </div>
              <button
                style={{ width: "100%" }}
                type="submit"
                class=" btn btn-danger btn-lg btn-block"
              >
                {" "}
                Add Journey
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJourney;
