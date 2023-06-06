// new-main.js

// I cant remeber how I learn to code these fetch calls nor where these functions came from.
// They are front-end functionsjust to enabe table buttons
const deleteButtonId = document.querySelectorAll('.delete-student')

for (let i = 0; i < deleteButtonId.length; i++) {
  deleteButtonId[i].addEventListener('click', _ => {
    fetch('/students/delete/'+deleteButtonId[i].name, {
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
    fetch('/students/update/'+updateButtonId[i].name, {
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

///////

const deletePaperId = document.querySelectorAll('.delete-paper')

for (let i = 0; i < deletePaperId.length; i++) {
  deletePaperId[i].addEventListener('click', _ => {
    fetch('/works/delete/'+deletePaperId[i].name, {
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

///////

const ProjectsDeleterId = document.querySelectorAll('.delete-project')

for (let i = 0; i < ProjectsDeleterId.length; i++) {
  ProjectsDeleterId[i].addEventListener('click', _ => {
    fetch('/projects/delete/'+ProjectsDeleterId[i].name  , {
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
///////

const LinkTreesDeleterId = document.querySelectorAll('.delete-linktree')

for (let i = 0; i < LinkTreesDeleterId.length; i++) {
  LinkTreesDeleterId[i].addEventListener('click', _ => {
    console.log(LinkTreesDeleterId[i].name)
    fetch('/linktrees/delete/'+LinkTreesDeleterId[i].name  , {
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

// const ProjectUpdaterId = document.querySelectorAll('.update-project')

// for (let i = 0; i < ProjectUpdaterId.length; i++) {
// ProjectUpdaterId[i].addEventListener('click', _ => {
//     fetch('/students/update/'+ ProjectUpdaterId[i].name, {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         status: 'Finalizado'
//       })
//     })
//       .then(res => {
//         if (res.ok) return res.json()
//       })
//       .then(data => {
//         window.location.reload()
//       })
//   })
// }