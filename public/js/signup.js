const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log("Im here")

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(email);
        console.log(password);

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};
console.log("wtf");

document.querySelector('.submitBtn').addEventListener('click', signupFormHandler);
