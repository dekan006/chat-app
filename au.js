document.getElementById('google').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

let provider = new firebase.auth.GoogleAuthProvider()

function GoogleLogin() {
    console.log('Login Btn Call')
    firebase.auth().signInWithPopup(provider).then(res=> {
        console.log(res)
    }).catch(e =>{
        console.log(e)
    })
}

function LogoutUser() {
    console.log('Logout Btn Call')
}