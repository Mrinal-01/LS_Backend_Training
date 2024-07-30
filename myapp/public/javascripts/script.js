//This two line to moving the Login and Registration Page
let card=document.getElementById('card')
function openRegister(){
    card.style.transform="rotateY(-180deg)"
}
function openLogin(){
    card.style.transform="rotateY(0deg)"
}


// --------------------------------------------------------------------------------------------------------------------------------------------
// This code is for registration:-

const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|logic-square\.com)$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Z].{7,}$/;

function loginValidation(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById("loginError");

    let getUser=localStorage.getItem('registeredUser')
    let users=JSON.parse(getUser)
    
    let user=users.find(u=>u.email===email && u.password===password )
    
    // Clear any previous message
    message.innerText = '';

    // Validate email
    if (!emailRegex.test(email)) {
        message.innerText = 'Invalid email format. Must be example@gmail.com or example@logic-square.com.';
        return false; // Stop the form from processing further
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        message.innerText = 'Invalid password format. Must start with an uppercase letter, be at least 8 characters long, and contain at least one special character.';
        return false; // Stop the form from processing further
    }
    
    if (user) {
        // Store the currentUser in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to main.html
        window.location.href = './CoinTest.html';
    } else {
        // Display an error message if the login credentials are invalid
        message.innerText = 'Invalid email or password. Please try again.';
    }

    return false; // Prevent form submission
}

document.getElementById('registerForm').addEventListener('submit', doRegister);

function doRegister(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    let getUser = localStorage.getItem("registeredUser");
    const users = JSON.parse(getUser) || []; // Ensure users is always an array

    const name = document.getElementById('regname').value;
    const email = document.getElementById('regemail').value;
    const pass = document.getElementById("regpassword").value;
    const checkbox = document.getElementById('checkadmin').checked;
    const imageUrl = document.getElementById("imgurl").value;
    const message = document.getElementById("message-reg");
    const success=document.getElementById('success');

    // Clear any previous message
    message.innerText = '';

    // Validate email
    if (!emailRegex.test(email)) {
        message.innerText = 'Invalid email format. Must be example@gmail.com or example@logic-square.com.';
        return false; // Stop the form from processing further
    }

    // Validate password
    if (!passwordRegex.test(pass)) {
        message.innerText = 'Invalid password format. Must start with an uppercase letter, be at least 8 characters long, and contain at least one special character.';
        return false; // Stop the form from processing further
    }

    // Check if the user already exists using the `some` method
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        // Display a message if the user already exists
        message.innerText = 'User email Exists';
        
        return false; // Stop further execution of the function
    }

    // Define the new user object
    const user = {
        name: name,
        email: email,
        password: pass,
        isAdmin: checkbox,
        image: imageUrl
    };

    // Add the new user to the array
    users.push(user);
    // Store the updated array back in localStorage
    localStorage.setItem('registeredUser', JSON.stringify(users));
    success.innerText="User succesfully registered!"
}




// -----------------------------------------------------------------------------------
//This code for loggle between show and hide password button
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('password-hidden');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        // toggleIcon.classList.add('show-password');
        toggleIcon.src='./Images/OpenEye.png'
    } else {
        passwordField.type = 'password';
        // toggleIcon.classList.remove('show-password');
        
        toggleIcon.src='./Images/CloseEye.png'
    }
}

// For registration password
function resPasswordVisibility() {
    const passwordField = document.getElementById("regpassword");
    const toggleIcon = document.getElementById('res-password-hidden');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        // toggleIcon.classList.add('show-password');
        
        toggleIcon.src='./Images/OpenEye.png'
    } else {
        passwordField.type = 'password';
        // toggleIcon.classList.remove('show-password');
        
        toggleIcon.src='./Images/CloseEye.png'
    }
}
