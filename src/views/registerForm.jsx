import axios from 'axios'
import {useState, useEffect} from 'react';

export default function RegisterForm() {
  const [input, setInput] = useState({
    username : '',
    password : '',
    tel : '',
    email : ''
  })

  const hdlChange = e =>{
    setInput( prv => ({...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8080/auth/registerAdmin', input)
      console.log(rs)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-primary p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>

        <form onSubmit={ hdlSubmit }>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={input.username}
              onChange={ hdlChange }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={ hdlChange }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>

          {/* Tel */}
          <div className="mb-4">
            <label htmlFor="tel" className="block text-sm font-medium text-white">
              Tel
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={input.tel}
              onChange={ hdlChange }
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
            />
          </div>

          {/* Submit Button */}
          <div className='flex gap-5'>
          <button
            type="reset"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Reset
          </button>
          
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
