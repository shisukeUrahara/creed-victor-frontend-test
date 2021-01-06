import React from 'react';

function Navbar({account}) {
    // console.log("**@ the navbar account is , ",account);
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          Weenus Token
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-primary">
              {account}
            </small>

            

          </li>
        </ul>

      </nav>
    )
}

export default Navbar
