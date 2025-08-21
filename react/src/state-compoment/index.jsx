import {useState} from 'react';

const StateCompoment = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = () => {
        setIsLogin(true);
        console.log(isLogin);
    }

    const handleLogout = () => {
        setIsLogin(false);
        console.log(isLogin);
    }

    const RenderUI = () => {
        if(isLogin){
            return (
                <div className={"row"}>
                    <h1 className={"text-white"}>Logout</h1>
                    <button className={"btn btn-danger"} onClick={handleLogout}>Logout</button>
                </div>
            )
        }else {
            return (
                <div className={"row"}>
                    <h1 className={"text-white"}>Login</h1>
                    <button className={"btn btn-primary"} onClick={handleLogin}>Login</button>
                </div>
            )
        }
    }

    return (
        <>
            <div className={"container bg-secondary rounded-1 p-5"}>
                {RenderUI()}
            </div>
        </>
    );
}

export default StateCompoment;
