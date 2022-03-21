import React from "react";

export default function Button({
  onClick = () => {},
  text = "",
  colorButton = "danger",
  key,
  mr = "",
  type = "button",
}) {
  return (
    <>
      <button
        onClick={onClick}
        key={key}
        type={type}
        class={`btn btn-${colorButton} mr-${mr}`}
      >
        {text}
      </button>
    </>
  );
}
