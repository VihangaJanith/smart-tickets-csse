import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { createRef } from "react";
import * as htmlToImage from "html-to-image";

const createFileName = (extension = "", ...names) => {
  if (!extension) {
    return "";
  }

  return `${names.join("")}.${extension}`;
};

function Tempory() {
  const ref = createRef(null);

  const takeScreenShot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node);
    return dataURI;
  };

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const [tokens, setTokens] = useState("");

  useEffect((e) => {
    //Runs on every render

    const len = localStorage.getItem("token").length;
    let result = localStorage.getItem("token").slice(1, len - 1);
    const abc = { token: result };

    axios
      .post("http://localhost:5000/user/view", abc)
      .then((res) => {
        setTokens(res.data.uniqueID);

        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  });

  return (
    <div className="container">
      <h1>Temporary QRCode</h1>
      <p>
        Use this QRCode as your Smart Card till you get the permanent Smart Card
      </p>
      <button
        onClick={downloadScreenshot}
        style={{ width: "100%" }}
        type="submit"
        class=" btn btn-danger btn-lg btn-block"
      >
        {" "}
        Download QR Code{" "}
      </button>
      <div ref={ref} style={{ background: "white", padding: "16px" }}>
        <div style={{ height: "200px", margin: "0 auto", width: "200px" }}>
          <QRCode
            download={true}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={tokens}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}

export default Tempory;
