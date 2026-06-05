document.addEventListener('DOMContentLoaded', () => {
    // Escuchar el estado de autenticación en tiempo real
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Usuario logueado
            removeAuthModal();
            updateUserUI(user);
        } else {
            // Usuario NO logueado
            showAuthModal();
        }
    });
});

function showAuthModal() {
    if (document.getElementById('auth-modal')) return;

    const modalHtml = `
        <div id="auth-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; padding: 2.5rem; border-radius: 8px; width: 90%; max-width: 450px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
                    <h2 id="tab-login" style="cursor: pointer; color: #0066cc; margin:0;" onclick="switchAuthTab('login')">Iniciar Sesión</h2>
                    <h2 id="tab-register" style="cursor: pointer; color: #64748b; margin:0;" onclick="switchAuthTab('register')">Crear Cuenta</h2>
                </div>
                
                <div id="form-error" style="color: red; font-size: 0.875rem; margin-bottom: 1rem; display:none; background: #fee2e2; padding: 0.5rem; border-radius: 4px;"></div>
                
                <div id="register-fields" style="display: none;">
                    <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">Nombre Completo</label>
                    <input type="text" id="auth-name" placeholder="Ej. Juan Pérez" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px;">
                </div>
                
                <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">Correo Electrónico</label>
                <input type="email" id="auth-email" placeholder="tu@correo.com" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px;">
                
                <label style="display:block; margin-bottom:0.5rem; font-weight:bold;">Contraseña</label>
                <input type="password" id="auth-password" placeholder="Mínimo 6 caracteres" style="width: 100%; padding: 0.75rem; margin-bottom: 1.5rem; border: 1px solid #ccc; border-radius: 4px;">
                
                <button id="auth-action-btn" class="btn" style="width: 100%;" data-mode="login" onclick="handleAuthAction()">Ingresar al Curso</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function removeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.remove();
}

window.switchAuthTab = (tab) => {
    const isLogin = tab === 'login';
    document.getElementById('tab-login').style.color = isLogin ? '#0066cc' : '#64748b';
    document.getElementById('tab-register').style.color = !isLogin ? '#0066cc' : '#64748b';
    document.getElementById('register-fields').style.display = isLogin ? 'none' : 'block';
    document.getElementById('auth-action-btn').textContent = isLogin ? 'Ingresar al Curso' : 'Registrarme';
    document.getElementById('auth-action-btn').dataset.mode = tab;
    document.getElementById('form-error').style.display = 'none';
};

window.handleAuthAction = async () => {
    const mode = document.getElementById('auth-action-btn').dataset.mode || 'login';
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name') ? document.getElementById('auth-name').value.trim() : '';
    const errorDiv = document.getElementById('form-error');
    
    errorDiv.style.display = 'none';

    if (!email || !password) {
        errorDiv.textContent = 'Por favor llena todos los campos obligatorios.';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        if (mode === 'register') {
            if (!name) {
                errorDiv.textContent = 'El nombre es obligatorio para el registro.';
                errorDiv.style.display = 'block';
                return;
            }
            // 1. Crear usuario
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            // 2. Guardar el nombre en el perfil del usuario de Firebase
            await userCredential.user.updateProfile({ displayName: name });
            
            // Forzar recarga ligera del usuario para aplicar cambios locales
            await firebase.auth().currentUser.reload();
            
        } else {
            // Login
            await firebase.auth().signInWithEmailAndPassword(email, password);
        }
    } catch (error) {
        let msg = "Error de autenticación. Verifica tus datos.";
        if (error.code === 'auth/email-already-in-use') msg = "El correo ya está registrado en otra cuenta.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') msg = "Correo o contraseña incorrectos.";
        if (error.code === 'auth/weak-password') msg = "La contraseña debe tener al menos 6 caracteres.";
        
        errorDiv.textContent = msg;
        errorDiv.style.display = 'block';
        console.error(error);
    }
};

function updateUserUI(user) {
    const container = document.querySelector('header .container');
    if (container && !document.getElementById('logout-btn')) {
        const btnContainer = document.createElement('div');
        btnContainer.style.marginTop = '1rem';
        
        const btn = document.createElement('button');
        btn.id = 'logout-btn';
        const displayName = user.displayName || user.email;
        btn.textContent = `Cerrar Sesión (${displayName})`;
        btn.className = 'btn';
        btn.style.cssText = 'background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; font-size: 0.875rem;';
        
        btn.onclick = () => firebase.auth().signOut();
        
        btnContainer.appendChild(btn);
        container.appendChild(btnContainer);
    }
}
