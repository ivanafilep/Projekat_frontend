
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    return [
        user,
        (userData) => {
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData);
        },
        () => {
            localStorage.removeItem('user');
            setUser(null);
            navigate('/login');
        }
    ]
}

export const get_login = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}

export const check_login = (roles) => {
    const user = get_login();
          if(user === null){
            const err = {
              cause: 'login',
              message: 'Korisnik nije logovan'
            };
            throw err;
          } else if (roles) {
            console.log(roles);
            console.log(user.role);
            console.log(user);
            const hasAccess = roles == user.role;
            if (!hasAccess) {
              throw new Error('Korisnik nema pravo pristupa.');
            }
        }
    return user;
}

export const valid_login = (roles) => {
    const user = get_login();
          if(user === null){
            return false;
          }else if(roles){
            if(!roles.includes(user.role)){
                console.log(user.role);
                return false;
          }
        }
    return true;
}
