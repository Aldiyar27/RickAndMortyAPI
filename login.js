const log = document.querySelector('.btnLog');

log.addEventListener('click', function(event){
    event.preventDefault()

    const users= JSON.parse(localStorage.getItem("users")) || []

    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    
    const Email = users.find(user => user.email === username)
    const Password = users.find(user => user.password === password)
    if(Email && Password){
        alert("Успешный вход")
        localStorage.removeItem('login');
        const logins= JSON.parse(localStorage.getItem("login")) || []
        product = []
        const newLogin = {username, product}
        
        logins.push(newLogin)
    
        localStorage.setItem('login', JSON.stringify(logins))
        window.location.href = "shop.html"
    }
    else{
        alert("Неверный логин или пароль")
    }

    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
})

