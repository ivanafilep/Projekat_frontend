import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowPredmeti from './predmet/ShowPredmeti';
import Login from './Login';
import ShowStudenti from './studenti/ShowStudenti';
import PredmetForm from './predmet/PredmetForm';
import StudentForm from './studenti/StudentForm';
import PredmetDetails from './predmet/PredmetDetails';
import StudentDetails from './studenti/StudentDetails';
import EditPredmet from './predmet/EditPredmet';
import EditStudent from './studenti/EditStudent';
import Pocetna from './Pocetna';
import { check_login } from './login_logic';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';


// Ivana Filep
//https://github.com/ivanafilep/projekat_brains

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children: [
      {
        path:'/pocetna',
        element:<ProtectedRoute><Pocetna/></ProtectedRoute>

      },
     
       {
        path:'/login',
        element: <Login/>

      },
      {
        path:'predmeti',
        element: <ProtectedRoute><ShowPredmeti/></ProtectedRoute>,
      },
      {
        path: 'predmeti/new_predmet',
        element:<ProtectedAdminRoute><PredmetForm/></ProtectedAdminRoute>
      },

      {path:'predmeti/predmet/:id',
      element: <PredmetDetails/>,
      loader: async({params}) =>{
        const user = check_login("ROLE_ADMIN");
        console.log(user);
        console.log(user.role);
        return fetch(`http://localhost:8080/api/v1/predmet/${params.id}`,{
          method: 'GET',
          headers: {
            "Authorization": user.token,
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          
        })
      }
      },

      {
      path: 'predmeti/predmetEdit/:id',
      element:<EditPredmet/>,
      loader: async({params}) =>{
        const user = check_login("ROLE_ADMIN");
          return fetch(`http://localhost:8080/api/v1/predmet/${params.id}`,{
            method: 'GET',
            headers: {
              "Authorization": user.token,
              "Accept": "application/json",
              'Content-Type': 'application/json',
            },
            body: JSON.stringify()
          });
      }
      },
      {
        path:'studenti',
        element:<ProtectedRoute><ShowStudenti/></ProtectedRoute>
      },
      {
        path: 'studenti/new_student',
        element:<ProtectedRoute><StudentForm/></ProtectedRoute>
      },

      {path:'studenti/student/:id',
      element:<ProtectedAdminRoute><StudentDetails/></ProtectedAdminRoute>,
      loader: async({params}) =>{
        const user = check_login("ROLE_ADMIN");
          return fetch(`http://localhost:8080/api/v1/ucenik/${params.id}`,{
            method: 'GET',
            headers: {
              "Authorization": user.token,
              "Accept": "application/json",
              'Content-Type': 'application/json',
            },
            body: JSON.stringify()
          });
        }
      
      },
      {
        path: 'studenti/studentEdit/:id',
        element: <ProtectedAdminRoute><EditStudent/></ProtectedAdminRoute>,
        loader: async({params}) =>{
          const user = check_login("ROLE_ADMIN");
            return fetch(`http://localhost:8080/api/v1/ucenik/${params.id}`,{
              method: 'GET',
              headers: {
                "Authorization": user.token,
                "Accept": "application/json",
                'Content-Type': 'application/json',
              },
              body: JSON.stringify()
            });
        }
        }

    ]
  }
 
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
