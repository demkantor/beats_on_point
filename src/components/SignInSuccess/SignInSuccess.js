import React from 'react';
import Swal from 'sweetalert2'


//very simple component, just gives a toast when a user logs in
const SignInSuccess = () => {
    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        width: 170,
        timerProgressBar: true,
        onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
    })
    return(
            <>
            </>
    )
}


export default SignInSuccess;