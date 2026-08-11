import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DashboardPage from "./pages/DashboardPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Layout from "./components/Layout.jsx";
import { RedirectToSignIn, Show } from "@clerk/react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Show when="signed-in">{children}</Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </>
  );
}

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
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
