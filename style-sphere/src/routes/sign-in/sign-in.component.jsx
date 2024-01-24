import { signInWithGooglePopUp,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = ()=>{
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        // console.log(response);
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return(
        <div>   
            <h1>SIGN IN</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
        </div>
    )
}
export default SignIn;
