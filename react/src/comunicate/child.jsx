const Child = (props) => {

    const handleReset = (id) => {
        props.reciver(id);
    }

    return (
        <>
            {
                props.userList.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>Username : {user.name}</p>
                            <p>Age : {user.age}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleReset(user.id)}
                            >
                                Change Name
                            </button>
                        </div>
                    )
                })
            }

        </>
    );
}

export default Child;
