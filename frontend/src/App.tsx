import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Layout from "./components/Layout.jsx";
import { RedirectToSignIn, Show } from "@clerk/react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/sign-in/*",
          element: <SignInPage />,
        },
        {
          path: "/sign-up/*",
          element: <SignUpPage />,
        },
        {
          path: "/pricing",
          element: <PricingPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
