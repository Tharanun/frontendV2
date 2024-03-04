import axios from 'axios'
import {useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  
  const {setUser} = useAuth()

  const [input, setInput] = useState({
    username : '',
    password : ''
  })

  const hdlChange = e =>{
    setInput( prv => ({...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8080/auth/loginAdmin', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8080/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}`}
      })
      console.log(rs1.data)
      setUser(rs1.data)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-primary p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
