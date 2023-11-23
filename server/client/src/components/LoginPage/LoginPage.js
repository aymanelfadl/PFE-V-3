import AuthForm from "./Auth/Auth";
import HeaderBar from "./header/HeaderBar";
import "./LoginPage.css"

export default function LoginPage(){
    return(
        <div>
        <HeaderBar></HeaderBar>
        <AuthForm></AuthForm>
        </div>
    )
}