const title = document.getElementById('title')
const btn = document.getElementById('btn')
const list = document.getElementById('list')

const notes = [
   {
    title: 'записать блок по плану изучения js', 
    completed: false,

   },
   {
      title: 'повторить теорию js',
      completed: true, 
   },
]

function render() {
   list.innerHTML = '';
   if(notes.length === 0) {
      list.innerHTML = '<h3>Нет элементов</h3>'
   }
   for (let i = 0; i < notes.length; i++) {
      list.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
   }
}
render()


btn.onclick = function() {
   
   if(title.value.length === 0) return;
   
   const newNote = {
      title: title.value,
      completed: false, // потому что мы только что создали заметку и она еще не выполнена
   }
   notes.push(newNote)
   render()
   title.value = '';    // очищаем поле ввода
} 

//* обрабтчи к события клика на список:

list.onclick = function(event) {
   if(event.target.dataset.index) {
    const index = Number(event.target.dataset.index)
    const type = event.target.dataset.type

    if(type === 'toggle') {
      notes[index].completed = !notes[index].completed
    } else if(type === 'remove') {
      notes.splice(index, 1)
    }
    render()
  }
}

function getNoteTemplate(note, index) {
   return `
   <li 
      class="list-group-item d-flex justify-content-between
      align-items-center"
   >
      <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span> 
      <span>
         <span class="btn btn-small btn-${note.completed ? 'warning' : 'success' }" data-index="${index}" data-type="toggle">&check;</span>
         <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
      </span>
   </li> 
   `
}

