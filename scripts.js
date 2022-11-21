let myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}
};

function newBook(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    addBookCard();
}

function addBookCard() {
    bookCount();
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';
    for (let i=0; i < myLibrary.length; i++){
        //add book container
        const book = document.createElement('div');
        book.classList.add('book');
        bookList.appendChild(book);
        //add title
        const bookTitle = document.createElement('div');
        bookTitle.textContent = myLibrary[i].title;
        book.appendChild(bookTitle);
        //add author
        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = myLibrary[i].author;
        book.appendChild(bookAuthor);
        //add page number
        const bookPages = document.createElement('div');
        bookPages.textContent = myLibrary[i].pages;
        book.appendChild(bookPages);
        //add read status
        const bookRead = document.createElement('div');
        const statusIcon = document.createElement('i');
        if (myLibrary[i].readStatus === true){
            statusIcon.classList.add('fa-solid', 'fa-check');
        } else{
            statusIcon.classList.add('fa-solid', 'fa-xmark');
        };
        bookRead.appendChild(statusIcon);
        book.appendChild(bookRead);
        //add delete button
        const remove = document.createElement('div');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash');
        deleteIcon.setAttribute("id", "remove");
        remove.appendChild(deleteIcon);
        book.appendChild(remove);


    }
};



function formInput(event){
    event.preventDefault();

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const readStatus = document.querySelector('#read-status');

    if (readStatus.checked) {
        newBook(title.value, author.value, pages.value, true);
      } else {
        newBook(title.value, author.value, pages.value, false);
} 
    form.reset();
};

document.addEventListener('click', (e) => {
    
        const child = e.target;
    
        const index = Array.from(child.parentElement.parentElement.parentElement.children).indexOf(child.parentElement.parentElement);

        console.log(index);
    
    if (e.target.classList.contains('fa-check')){
        e.target.classList.remove('fa-check');
        e.target.classList.add('fa-xmark');
        myLibrary[index].readStatus = false;
        addBookCard();
    } else if (e.target.classList.contains('fa-xmark')) {
        e.target.classList.remove('fa-xmark');
        e.target.classList.add('fa-check');
        myLibrary[index].readStatus = true;
        addBookCard();
    }else if(e.target.classList.contains('fa-trash')) {
        myLibrary.splice(index, 1);
        addBookCard();
    }
});

const addBook = document.querySelector('.add-book');
const modal = document.querySelector('.modal');

addBook.addEventListener('click', () => {
    modal.style.display = 'block';
});

const bookEnter = document.getElementById('submit-btn');
const form = document.querySelector('.form');

bookEnter.addEventListener('click', () => {
    formInput(event);
    modal.style.display = 'none';
});

/*document.addEventListener('click', (e) => {

    const child = e.target;
    
    const index = Array.from(
      child.parentElement.parentElement.parentElement.children
    ).indexOf(child.parentElement.parentElement);
    
    console.log(index);
    
    });*/


function bookCount(){
    const booksRead = document.getElementById('books-read');
    const booksUnread = document.getElementById('books-unread');
    let readCount = 0;
    let unreadCount = 0;
    booksRead.textContent = 0;
    booksUnread.textContent = 0;
    for(book of myLibrary){
        if(book.readStatus === true){
            readCount++;
            booksRead.textContent = readCount;
        }else {
            unreadCount++;
            booksUnread.textContent = unreadCount;
        }
    }
}

const close = document.getElementById('close-btn')

close.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
})