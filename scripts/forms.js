// Validaciones del formulario de registro
document.getElementById('register_form').addEventListener('submit', (event) => {
    const contacto = document.querySelector('input[name="email"]').value; // Puede ser email o celular
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirmation = document.querySelector('input[name="password_confirmation"]').value;

    // Detectar si es email o celular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularRegex = /^\d{10}$/;
    
    const isEmail = emailRegex.test(contacto);
    const isPhone = celularRegex.test(contacto);

    // Validar que sea email o celular válido
    if (!isEmail && !isPhone) {
        event.preventDefault();
        alert('Ingrese un email válido o un celular de 10 dígitos');
        return;
    }

    // Validar contraseña
    // Mínimo 10 caracteres, al menos 1 número, 1 especial, 1 mayúscula, 1 minúscula
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;
    if (!passwordRegex.test(password)) {
        event.preventDefault();
        alert('La contraseña debe tener:\n- Mínimo 10 caracteres\n- Al menos una mayúscula\n- Al menos una minúscula\n- Al menos un número\n- Al menos un carácter especial (!@#$%^&*...)');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== passwordConfirmation) {
        event.preventDefault();
        alert('Las contraseñas no coinciden');
        return;
    }
});