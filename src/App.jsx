import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col box-border  bg-gray-100">
      <div className="h-1/5 w-full sticky   top-0 left-0 right-0 opacity-60 z-40 ">
        <Header />
      </div>
      <main className="flex h-2/3 min-h-40 items-center justify-center w-full">
        <Outlet />
      </main>
      <div className="max-h-[100]">
        <Footer />
      </div>
    </div>
  ) : (
    ""
  );
}

export default App;
