import React from "react";
const resizeEvent = window.addEventListener("resize", () => {
  const orientationType = window.screen.orientation.type;
  // console.log(orientationType);
  orientationType === "landscape-primary" && console.log("landscape");
});

const Orientation = () => {
  return <div></div>;
};

export default Orientation;
