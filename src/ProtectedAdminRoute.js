import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_login } from "./login_logic";

const ProtectedAdminRoute = ({children}) =>{

   
    const navigate = useNavigate();
    const [isLoggedUser, setLoggedUser] = useState(false);


    const checkUser = () => {
        const user = get_login();
        if(!user || user === undefined || user.role !== "ROLE_ADMIN"){
            setLoggedUser(false);
            navigate("/")
        }
        setLoggedUser(true);
    }

    useEffect(() => {
        checkUser();
    }, [isLoggedUser])

    return <Fragment>
        {isLoggedUser ? children : null}
    </Fragment>
}



export default ProtectedAdminRoute;