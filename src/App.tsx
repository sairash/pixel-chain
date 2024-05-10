import { useNavigate } from "react-router-dom";
import "./App.css";
import Firstpage from "./pages/FIrstpage";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>();

  if (localStorage.getItem("username")) navigate("/events");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [username]);
  return (
    <>
      <Firstpage />
    </>
  );
}

export default App;
