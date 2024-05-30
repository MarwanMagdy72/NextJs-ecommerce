
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" py-3 bg-dark  text-white footer  "    id="footer">
      <div className="info text-center">
        © {currentYear} Powered by <span className="fw-bold"> Eng Marwan Magdy</span>
      </div>

    </footer>
  );
}
