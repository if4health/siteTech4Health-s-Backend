// new-main.js

// I cant remeber how I learn to code these fetch calls nor where these functions came from.
// They are front-end functionsjust to enabe table buttons
const deleteButtonId = document.querySelectorAll('.delete-student')

for (let i = 0; i < deleteButtonId.length; i++) {
  deleteButtonId[i].addEventListener('click', _ => {
    fetch('/students/delete/'+deleteButtonId[i].id, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
}

const updateButtonId = document.querySelectorAll('.update-student')

for (let i = 0; i < updateButtonId.length; i++) {
  updateButtonId[i].addEventListener('click', _ => {
    fetch('/students/update/'+updateButtonId[i].id, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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

const deletePaperId = document.querySelectorAll('.delete-paper')

for (let i = 0; i < deletePaperId.length; i++) {
  deletePaperId[i].addEventListener('click', _ => {
    fetch('/works/delete/'+deletePaperId[i].id, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
      })
  })
}