const editBio = document.getElementById('edit-bio');
const bio = document.getElementById('bio');
console.log(bio.innerHTML)

editBio.addEventListener('click', () => {
    if (editBio.id === 'edit-bio') {
        editBio.innerHTML = 'save bio';
        editBio.id = 'save-bio';
        bio.disabled = false;
        bio.focus();
    } else if (editBio.id === 'save-bio') {
        bio.blur();
        editBio.setAttribute('form', 'bio-form');
    }
})

setTimeout(() => {
    console.log(bio.value)
},10000)
setTimeout(() => {
    console.log(bio.value)
},15000)