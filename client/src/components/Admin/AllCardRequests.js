import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function AllJourneys() {
  const [id, setId] = useState();
  const [bookings, setBookings] = useState();

  if (localStorage.getItem("admin") == null) {
    window.location.replace("/adminlogin");
  }

  useEffect((e) => {
    axios
      .get(`http://localhost:5000/delivery/`)
      .then((res) => {
        if (res.data.length != 0) {
          setBookings(res.data);
        } else {
        }

        console.log(res.data);
      })

      .catch((err) => {
        alert(err);
      });
  }, []);

  const deleteBookings = (e) => {
    const ID = e.target.id;

    axios.delete(`http://localhost:5000/delivery/${ID}`).then((res) => {
      console.log(res.data);
      alert("Booking Deleted");
      window.location.reload();
    });
  };

  return (
    <div className="ml-5" style={{ marginLeft: "50px" }}>
      <h1>All Smart Card Requests</h1>

      {bookings ? (
        <div>
          {bookings.map((booking, index) => (
            <div>
              <Card
                className="mb-2"
                key={booking._id}
                border="primary"
                style={{ width: "35rem" }}
              >
                <Card.Header>
                  {index + 1}. <strong>Request ID - {booking._id}</strong>{" "}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Address : {booking.address}</Card.Title>
                  <Card.Title>User ID : {booking.uniqueID}</Card.Title>
                  <Card.Title>City : {booking.city}</Card.Title>
                  <Card.Title>Province : {booking.province}</Card.Title>
                  <Card.Text>
                    Requsted at {booking.createdAt.substring(0, 10)} ,{" "}
                    {booking.createdAt.substring(11, 16)}
                    <div className="row mt-2">
                      <div className="col-6 md-4">
                        <button
                          className="btn btn-danger"
                          id={booking._id}
                          onClick={(e) => deleteBookings(e)}
                        >
                          Cancel Request
                        </button>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No Card Requests</p>
        </div>
      )}
    </div>
  );
}

export default AllJourneys;
