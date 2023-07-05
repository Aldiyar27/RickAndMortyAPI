function registerUser(email, password){
    const users= JSON.parse(localStorage.getItem("users")) || []

    const existingUser = users.find(user => user.email === email)
    if(existingUser){
        alert("Пользователь с таким email-ом уже зарегистрирован")// TO DO
        return;
    }

    const newUsers = {email, password}
    
    users.push(newUsers)

    localStorage.setItem('users', JSON.stringify(users))

    alert("Регистрация успешно!")
    window.location.href = "login.html"
}


const reg = document.querySelector('.btnRegister');

reg.addEventListener('click', function(event){
    event.preventDefault()
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value
    console.log(email)
    if(email != '' && password != ''){
        if(/@/.test(email)){
            if(password.length < 8 || password.length > 20){
                alert('Некорректный пароль')
            }
            else{
                registerUser(email, password)
            }
        }
        else{
            alert('Некорректный email')
        }
    }
    else{
        alert('Вы не ввели полные данные!')
    }
})
