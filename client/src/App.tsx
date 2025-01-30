import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart, Home, Layout, Login, Product, Order } from './routes/index.route';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'product/:id',
          element: <Product />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Login /> 
        },
        {
          path: '/cart',
          element: <ProtectedRoute>
            <Cart />
          </ProtectedRoute> 
          // loader: cartLoader
        },
        {
          path: '/order',
          element: <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      ]
    }
  ])

  return (
     <RouterProvider router={router} />
  );
}

export default App
