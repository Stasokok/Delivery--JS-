const buttonAuth = document.querySelector('.button-auth'); //подключение кнопки
const modalAuth = document.querySelector('.modal-auth'); //подключение модального окна
const closeAuth = document.querySelector('.close-auth'); //подключение крестика модального окна
const buttonOut = document.querySelector('.button-out'); //подключение кнопки выход
const userName = document.querySelector('.user-name'); // подключение отображения имени пользователя после входа
const logInForm = document.getElementById('logInForm'); // подключение отправки формы
const inputLogin = document.getElementById('login'); //подключение поля ввода логина
const inputPassword = document.getElementById('password'); //подключение поля ввода пароля
const buttonCart = document.querySelector('.button-cart'); //подключение кнопки корзины

const emptyLogin = () => {
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    
    alert('Логин не введен. Введите логин');

    modalAuth.style.display = 'none';
    
    localStorage.removeItem('user');

};
//Ссоздание функции при пустом поле логина


const login = (user) => {
    buttonAuth.style.display = 'none';

    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    buttonCart.style.display = 'flex';

    userName.textContent = user.login;
    modalAuth.style.display = 'none';

    if (user.login === '') {
        emptyLogin();
    }

};

//создание функции по добавлению кнопки выхода при заполнении формы

const logOut = () => {
    buttonAuth.style.display = 'flex';

    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    buttonCart.style.display = 'none';

    userName.textContent = '';

    localStorage.removeItem('user');

};

//создание функции действий при нажататии кнопки выход



buttonAuth.addEventListener('click', () => {
    modalAuth.style.display = 'flex';

});

//открытие модального окна по клику (добавление display flex)

buttonOut.addEventListener('click', () =>{
    logOut();

});

//запуск функции при нажатии кнопки выход

closeAuth.addEventListener('click', () => {
    modalAuth.style.display = 'none';
});

//закрытие модального окна по клику по крестику (удаление display flex (display none))

logInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
        login: inputLogin.value,
        password: inputPassword.value
    };

    localStorage.setItem('user', JSON.stringify(user));
    login(user);
});

// добавление введенных данных из формы в объект и запуск функции кнопки выхода

if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')));
}

// сохранение введенных данных пользователя