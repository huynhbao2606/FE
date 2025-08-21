import React from 'react';
import Swal from "sweetalert2";
const HandleClick = () => {
    Swal.fire({
        title: 'Success!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Nice'
    }).then(r =>{
        console.log(r.dismiss)
    } )
}
const HandleParams = (a,b) => {
    const resault = a + b;
    Swal.fire({
        title: 'Success!',
        text: "Tổng Là: " + resault,
        icon: 'success',
        confirmButtonText: 'Ok'
    }).then(r =>{
        console.log(r.dismiss)
    } )
}

const HandlingEvent = () => {
    return (
        <div>
            <h1>HandlingEvent</h1>
            <button className={"btn btn-primary"} onClick={HandleClick}>Click</button>
            <button className={"btn btn-primary"} onClick={() => HandleParams(5,7)}>Click</button>
        </div>
    );
}

export default HandlingEvent;
