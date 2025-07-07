document.addEventListener("DOMContentLoaded", () => {
    
    const loginBtn = document.getElementById("loginredirect");

    if (loginBtn) {
        const loginUrl = loginBtn.getAttribute("data-url");
        loginBtn.addEventListener("click",() => {
            window.location.href = loginUrl;
        });
    }
});