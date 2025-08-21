import Child from "./child.jsx";
import {useState} from "react";

const Comunicate = () => {
    const [userList, setUserList] = useState([
        {
            id : 1,
            name : "Cybersoft",
            age : 17
        },
        {
            id: 2,
            name : "Johnson",
            age : 22
        },
        {
            id: 3,
            name : "January",
            age : 32
        }
    ]);


    const handleChangeUser = (id) => {
        setUserList(userList.map(user =>
            user.id === id ? { ...user, name: user.name = "VaiLon"} : user
        ));
    };

    const handleReciver = (id) => {
        setUserList(userList.map((user) =>
            user.id === id ? { ...user, name: user.name = "Reset Name" } : user
        ))
    }

    return (
        <>
            <div className={"border rounded bg-primary-subtle"}>
                <h1>Comunicate</h1>
                {
                    userList.map((user) => {
                        return (
                            <>
                                <div key={user.id}>
                                    <p>Username : {user.name}</p>
                                    <p>Age : {user.age}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleChangeUser(user.id)}
                                    >
                                        Change Name
                                    </button>
                                </div>
                            </>
                        )
                    })
                }
                <div className={"border rounded bg-primary text-white-50"}>
                    <Child userList={userList} reciver={handleReciver}/>
                </div>
            </div>
        </>
    );
}

export default Comunicate;
