// const loginWrap = document.getElementsByClassName('login-wrap')[0];
// const signUp = document.getElementsByClassName('sign-up')[0];
// const login = document.getElementsByClassName('login')[0];
const inputWraps = document.getElementsByClassName('input-wrap');
const inputs = document.querySelectorAll('#content .input-wrap input');
const icons = document.querySelectorAll('#content .input-wrap i');

// signUp.addEventListener('click', () => {
//     loginWrap.classList.add('sign-up-active')
// })
// login.addEventListener('click', () => {
//     loginWrap.classList.remove('sign-up-active')
// })

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', () => {
        inputWraps[i].style.borderColor = 'var(--primary)';
        inputWraps[i].style.zIndex = '1';
        icons[i].style.color = 'black'
    })
    inputs[i].addEventListener('blur', () => {
        inputWraps[i].style.borderColor = 'var(--grey)';
        inputWraps[i].style.zIndex = '0';
        icons[i].style.color = 'var(--grey)'
    })
}