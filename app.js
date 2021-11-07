const firebaseConfig = {
    apiKey: "AIzaSyDGVBIMebjzCHTkX1HIgY8tpj_kl2E8Kk4",
    authDomain: "chat-app-61327.firebaseapp.com",
    databaseURL: "https://chat-app-61327-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-app-61327",
    storageBucket: "chat-app-61327.appspot.com",
    messagingSenderId: "1077563769226",
    appId: "1:1077563769226:web:c0beb389627539f73d4873"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

console.log("Firebase connected");

document.getElementById('dashboard').style.display="none";
document.getElementById('google').addEventListener('click', GoogleLogin);
document.getElementById('logout').addEventListener('click', LogoutUser);

let provider = new firebase.auth.GoogleAuthProvider();
let nameUser = "";

function GoogleLogin() {
    console.log('Login Btn Call');
    firebase.auth().signInWithPopup(provider).then(res=> {
        document.getElementById("dashboard").style.display='';
        document.getElementById("authorization").style.display='none';
        console.log(res.user);
        
        showUserDetails(res.user);
        
    }).catch(e =>{
        console.log(e)
    })
}

function LogoutUser() {
    console.log('Logout Btn Call');
    firebase.auth().signOut().then(() => {
        document.getElementById("dashboard").style.display='none';
        document.getElementById("authorization").style.display='';
    }).catch(e =>{
        console.log(e)
    })
}

function showUserDetails(user){
    nameUser = user.displayName;
    
    document.getElementById('userDetails').innerHTML = `
    <img src="${user.photoURL}" style="width:10%">
    <p>Name: ${user.displayName}</p>
    <p>Email: ${user.email}</p>`
}
    

let chat = document.querySelector("#divMessages");
let button = document.querySelectorAll("button");
let btnSis = document.querySelector("#sis");
let btnBro = document.querySelector("#bro");
let counterSis = document.querySelector("#counterSis");
let counterBro = document.querySelector("#counterBro");

function sendMessage(object){
    console.log(object);
    db.collection("button").add(object).then(added => {
        console.log("message sent ",added);
    }).catch(err => {
        console.err("Error occured",err)
    })
}
 
let countSis = 0;
let countBro = 0;

db.collection("button").orderBy("date").onSnapshot(function(snapshot){
    snapshot.docChanges().forEach(function(change,ind){
        let data = change.doc.data();
            if (data.message ==  "Sis!") {
                countSis += 1;
            }
            if (data.message ==  "Bro!") {
                countBro += 1;
            }

            // if new message added
            
            chat.textContent =  data.message +" send by "  + data.username +  " at " + data.date;
            counterSis.textContent =  "Sis: " + countSis;
            counterBro.textContent =  "Bro: " + countBro;
    })
})

btnSis.addEventListener("click", () => {
    
    message = btnSis.innerText;
    
    sendMessage({
            message : message,
            date : moment().format("HH:mm:ss"),
            username: nameUser
        })
    console.log("send " + message);
    
})
btnBro.addEventListener("click", () => {
    message = btnBro.innerText;
    
    sendMessage({
            message : message,
            date : moment().format("HH:mm:ss"),
            username: nameUser
        })
    console.log("send " + message);
    
})

