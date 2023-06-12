import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


function App() {
  return (

    <Router>

    <AuthProvider>
    <Layout>
       <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/signup" element={<PublicRoute component={Signup} />} />
        <Route exact path="/login" element={<PublicRoute component={Login} />} />

        <Route exact path="/quiz" element={<PrivateRoute component={Quiz} />} />
        <Route exact path="/result" element={<PrivateRoute component={Result} />} />


          {/* <Home />
          <Signup /> 
          <Login />
          <Quiz />
          <Result /> */}

       </Routes>
       
      </Layout>
    </AuthProvider>

    </Router>


  );
}

export default App;


