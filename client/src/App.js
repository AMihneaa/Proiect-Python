// App.js
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Materii from "./views/Materii.views.jsx";
import { Studenti } from "./views/Studenti.views.jsx";
import { Home } from "./views/Home.views.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <h1>Erroare</h1>,
    },
    {
      path: "/courses",
      element: <Materii />,
    },
    {
      path: "/students",
      element: <Studenti />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
