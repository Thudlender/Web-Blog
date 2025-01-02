import React, { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { user: savedUser, logout } = useAuthContext();
    useEffect(() => {
      setUser(savedUser);
    }, [savedUser]);
    const handleLogout = () => {
      Swal.fire({
        title: "Logout",
        text: "Do you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
          Swal.fire({
            title: "Logout",
            text: "Logout successfully!",
            icon: "success",
          });
        }
      });
    };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menus?.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.link}>{item.text}</a>
                </li>
              );
            })}
          </ul> */}
        </div>
        <a className="btn btn-ghost text-xl" href="/">
          SE NPRU Blog
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* <ul className="menu menu-horizontal px-1">
          {menus?.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.link}>{item.text}</a>
              </li>
            );
          })}
        </ul> */}
      </div>
      {user ? (
        <>
          <div className="navbar-end space-x-1">
            <a href="/create" className="btn btn-outline btn-secondary">
              Create a new post
            </a>
            <a className="btn btn-outline" onClick={handleLogout}>
              Logout({user.username})
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-end space-x-1">
            <a href="/login" className="btn btn-outline btn-primary">
              Login
            </a>
            <a href="/register" className="btn btn-outline btn-accent">
              Register
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar
