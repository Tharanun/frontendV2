import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../src/views/LoginForm'
import RegisterForm from '../src/views/registerForm'
import useAuth from '../src/hooks/useAuth'
import Nav from '../src/views/nav'
import CreateProduct from '../src/views/createProduct'
import ProductAll from '../src/views/ProductAll'
import CreateMember from '../src/views/member'
import MemberAll from '../src/views/MemberAll'
import CreateSell from '../src/views/CreateSell'
import SellAll from '../src/views/SellAll'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
    <Nav/>
    <Outlet/>
    </>,
    children: [
      {index: true, element: <LoginForm/>},
      {path: '/register', element:<RegisterForm/>}
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
    <Nav/>
    <Outlet/>
    </>,
    children : [
      {index: true, element: <ProductAll/>},
      {path: '/createProduct', element: <CreateProduct/>},
      {path: '/memberAll', element: <MemberAll/>},
      {path: '/createMember', element: <CreateMember/>},
      {path: '/sellAll', element: <SellAll/>},
      {path: '/createSell', element: <CreateSell/>},
    ]
  }
])
export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? adminRouter : guestRouter
  return (
    <RouterProvider router={finalRouter}/>
  )
}
