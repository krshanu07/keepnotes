const addButton = document.querySelector('#add');

const updateLocalStorgageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    //console.log(textAreaData)
    
    textAreaData.forEach(( note )=> {
        return notes.push(note.value);
    })
    //console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}


const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"}"> </div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    </div> `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    document.body.appendChild(note);
    // it appends a node as the last child of a node


    //getting reference
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting a node

    delButton.addEventListener('click', () => {
        note.remove();
        updateLocalStorageData();
    })

    //toggle using edit button
    textArea.value = text;
    mainDiv.innerHtml = text;


    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorageData();

    })
    
}

//getting data form localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) { notes.forEach((note) => addNewNote(note));}

addButton.addEventListener('click', () => addNewNote());
