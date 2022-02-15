const inputWraps = document.getElementsByClassName('input-wrap');
const inputs = document.querySelectorAll('#form-wrap .input-wrap input');
const icons = document.querySelectorAll('#form-wrap .input-wrap i');
const x = document.querySelector('#message i');
const message = document.getElementById('message');

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

if (x) {
    x.addEventListener('click', () => {
        message.style.display = 'none';
    })
}

