import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import SignUp from "./pages/signUp.tsx";

function App() {


  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App
