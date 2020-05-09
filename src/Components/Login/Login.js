import React from 'react';
import Auth from './useAuth';


const Login = () => {
    const auth=Auth()
    console.log(auth);

    const handleSignIn=()=>{
        auth.signInwithGoogle()
        .then(res=>{
            window.location.pathname= '/review'
        })
    }

    const handleSignOut=()=>{
        auth.signOut()
        .then(res=>{
            window.location.pathname= '/'
        })
    }
    return (
        <div>
            <h1>Join the party</h1>
            {
                auth.user? <button onClick={handleSignOut} className="btn btn-danger">Log out</button>:
                <button onClick={handleSignIn} className="btn btn-danger">Login</button>
            }
            
        </div>
    );
};

export default Login;