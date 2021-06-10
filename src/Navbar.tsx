import React from "react";
import { Link } from "@reach/router";

export default function Navbar() {
  return (
    <header>
      <Link to="/">Adopt Me!</Link>
      <span style={{ fontSize: "50px" }} role="img" aria-label="logo">
        🐫
      </span>
    </header>
  );
}
