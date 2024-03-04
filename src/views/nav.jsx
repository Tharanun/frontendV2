import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import useAuth from '../hooks/useAuth'

const guestNav =[
  {to : '/', text: 'Login'},
  {to : '/register', text: 'Register'}
]

const AdminNav = [
  {to : '/', text: 'Product'},
  {to : '/createProduct', text: 'Create Product'},
  {to : '/memberAll', text: 'Member'},
  {to : '/createMember', text: 'Create Member'},
  {to : '/sellAll', text: 'sell'},
  {to : '/createSell', text: 'Create Sell'},
]


export default function nav() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? AdminNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () =>{
    logout()
    navigate('/')
  }

  return (
    <div>
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg"><a href="">Thara Tree</a></div>
                <div className="flex items-center space-x-12">
                  <div className="text-white flex-none">
                    <ul className='menu menu-horizontal px-2'>
                      {finalNav.map ( el =>(
                        <li key={el.to}>
                          <Link to={el.to}>{el.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-white mx-4">Hello {user?.id ? user.username : 'Welcome'}</div>
                
                {/* Theme Controller */}
                <div className="flex items-center ">
                  <div className="flex ">
                    <label className="flex cursor-pointer gap-2">
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                        <input type="checkbox" value="dark" className="toggle theme-controller"/>
                        <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                  </div>
                  <div className="flex items-center flex-none mx-4">
                    <ul className='menu menu-horizontal px-2'>
                      {user?.id && (
                        <li className='bg-error rounded-lg'>
                            <Link to="#" onClick={hdlLogout}>Logout</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
