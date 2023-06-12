import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({component: Component, ...rest}){

    const {currentUser} = useAuth();

    return currentUser ? (
        // <Route {...rest}> { (props) => <Element {...props} /> } </Route>
        <Component />

    ): (
        <Navigate to="/login" />
        

    );

}