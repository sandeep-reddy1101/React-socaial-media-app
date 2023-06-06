import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigation = useNavigate();

    const signInWithGoogle = async ()=>{
        const result = await signInWithPopup(auth, provider);
        navigation("/");
        console.log(result)
    }

    return (
        <div>
            <p>Sign In with google to continue</p>
            <button className="btn btn-primary" onClick={signInWithGoogle}>SignIn with Google</button>
        </div>
    )
}
