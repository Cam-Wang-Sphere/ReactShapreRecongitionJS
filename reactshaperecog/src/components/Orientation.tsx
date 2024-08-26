import React from "react";
const orientation = window.addEventListener("resize", () => {
  const potrait = window.screen.orientation.type;
  console.log(potrait);
});

const Orientation = () => {
  return <div></div>;
};

export default Orientation;
