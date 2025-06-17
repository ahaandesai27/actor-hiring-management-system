import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import apiurl from '../../apiurl';
import axios from "axios";

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      try {
        event.preventDefault()
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await axios.post(`${apiurl}/auth/login`, {
          username: username,
          password: password
        })

        const {accessToken} = response.data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          window.location.href = '/home';
        }
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response && error.response.status === 401) {
          alert("Invalid username or password. Please try again.");
        } else {
          alert("An error occurred while logging in. Please try again later.");
        }
      }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6 p-10 rounded-lg border border-gray-500 relative bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg" onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#ffbf00]">
                    Login to your account
                </h1>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  required
                  placeholder="Enter username "
                  ref={usernameRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>    
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  ref={passwordRef}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>

            <div className="text-md text-center">
                <span className="text-white font-semibold">Don't have an account? </span>
                <a href="/signup" className="font-semibold text-red-600 hover:text-[#ffbf00]">Sign up</a>
            </div>
          </form>

        </div>
      </div>
    );
}

export default Login