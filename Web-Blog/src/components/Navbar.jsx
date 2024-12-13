import React, { useState } from 'react';
import AuthService from '../../service/auth.service';
import LoginBtn from './LoginBtn';
import RegisterBtn from './RegisterBtn';

const Navbar = () => {
  const [user, setUser] = useState(null);
  // const 
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Web Blog</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <div className="flex space-x-4 ">
              {/* Register and Login Buttons */}
              <RegisterBtn />
              <LoginBtn />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar

