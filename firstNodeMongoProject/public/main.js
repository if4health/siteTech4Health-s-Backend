// main.js

// I cant remeber how I learn to code these fetch calls nor where these functions came from.
// They are front-end functionsjust to enabe table buttons
const deleteButtonClass = document.querySelectorAll('.delete-button')

for (let i = 0; i < deleteButtonClass.length; i++) {
  deleteButtonClass[i].addEventListener('click', _ => {
    fetch('/deleteDB', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: deleteButtonClass[i].name
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
}

const updateButtonClass = document.querySelectorAll('.update-button')

for (let i = 0; i < updateButtonClass.length; i++) {
  updateButtonClass[i].addEventListener('click', _ => {
    fetch('/updateDB', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: updateButtonClass[i].name,
        status: 'Finalizado'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
}