document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;
        const rememberMe = document.getElementById('remember').checked;

        if (!userId || !password || !role) {
            alert('Please fill in all fields including role');
            return;
        }

        // Hardcoded credentials
        const credentials = {
            faculty: { email: "faculty@christ.com", password: "faculty123" },
            student: { email: "student@christ.com", password: "student123" }
        };

        if (role === "faculty" && userId === credentials.faculty.email && password === credentials.faculty.password) {
            alert("✅ Welcome Faculty!");
            if (rememberMe) localStorage.setItem('rememberedUserId', userId);
            else localStorage.removeItem('rememberedUserId');
            window.location.href = "dash.html";
        } 
        else if (role === "student" && userId === credentials.student.email && password === credentials.student.password) {
            alert("✅ Welcome Student!");
            if (rememberMe) localStorage.setItem('rememberedUserId', userId);
            else localStorage.removeItem('rememberedUserId');
            window.location.href = "review0.html";
        } 
        else {
            alert("❌ Invalid credentials for selected role.");
        }
    });

    // Autofill remembered User ID
    const rememberedUserId = localStorage.getItem('rememberedUserId');
    if (rememberedUserId) {
        document.getElementById('userId').value = rememberedUserId;
        document.getElementById('remember').checked = true;
    }
});