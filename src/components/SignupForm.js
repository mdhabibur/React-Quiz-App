import Form from "./Form";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignupForm(){

    //always put the hooks at top level otherwise it will not work
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading] = useState();


    const {signup} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        //do the validation
        if(password !== confirmPassword){
            return setError("passwords don't match");
        }

        //do the sign up, there will be loading state
        try{
            setError("");
            setLoading(true);
            await signup(email, password, username);
            navigate("/"); //after signup take to dashboard/homepage
        }catch(err) {
            console.log(err);
            setLoading(false);
            serError("Failed to create an account"); 
        }




    }
 
    


    return(

        <Form style={{ height: "500px" }} onSubmit={handleSubmit}>

        <TextInput type="text" placeholder="Enter name" icon="person" required
        value={username} onChange={(e)=> setUsername(e.target.value)}
        />
        <TextInput type="text" placeholder="Enter email" icon="alternate_email" required
        value={email} onChange={(e)=> setEmail(e.target.value)}

        />
        <TextInput type="password" placeholder="Enter password" icon="lock" required
        value={password} onChange={(e)=> setPassword(e.target.value)}

        />
        <TextInput type="text" placeholder="confirm password" icon="lock_clock" required
        value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}

        />

        <Checkbox text="I agree to the Terms & Conditions" required
        value={agree} onChange={(e)=> setAgree(e.target.value)}

        />
        <Button disabled={loading} type="submit"> <span>Submit Now</span></Button>
        {/* when the button is loading, disable it to prevent the multi clicking  */}

        {error && <p className="error"> {error} </p> }



        <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
        </div> 



    </Form>


    );
}