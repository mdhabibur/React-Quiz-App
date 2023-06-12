import TextInput from "./TextInput";
import Form from "./Form";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";


export default function LoginForm(){

        //always put the hooks at top level otherwise it will not work

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    
        const [error, setError] = useState();
        const [loading, setLoading] = useState();
    
    
        const {login} = useAuth();
        const navigate = useNavigate();
    
        async function handleSubmit(e){
            e.preventDefault();

            //do the sign up, there will be loading state
            try{
                setError("");
                setLoading(true);
                await login(email, password);
                navigate("/"); //after signup take to dashboard/homepage
            }catch(err) {
                console.log(err);
                setLoading(false);
                serError("Failed to login"); 
            }

    
        }


    return(
        <Form style={{ height: "330px" }} onSubmit={handleSubmit}>

        <TextInput
          type="text"
          placeholder="Enter email"
          icon="alternate_email"
          required
          value={email} onChange={(e)=> setEmail(e.target.value)}
        />

        <TextInput type="password" placeholder="Enter password" icon="lock" 
        required
        value={password} onChange={(e)=> setPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit"> <span>Submit Now</span></Button>
        {error && <p className="error"> {error} </p> }

        <div className="info">
          Don't have an account? <Link to="/signup">Signup</Link> instead.
        </div>
      </Form>
    );
}