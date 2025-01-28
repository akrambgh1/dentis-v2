import React from "react";

import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav>
        <ul className="flex justify-center gap-10 bg-gray-800 text-white p-4">
          <li>
            <Link to="/dentist/register/">Reginster</Link>
          </li>
          <li>
            <Link to="/dentist/Login/">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
