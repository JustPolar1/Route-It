// Para que valide que la contraseña y la contraseña a confirmar son iguales
document.getElementById('register_form').addEventListener('submit', (event) => {
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirmation = document.querySelector('input[name="password_confirmation"]').value;

    if (password !== passwordConfirmation) {
        event.preventDefault();
        alert('Las contraseñas no coinciden');
    }
});