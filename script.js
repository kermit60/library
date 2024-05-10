const myLibrary = [];

// constructor for a book object
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
    this.info = () => {
        if (haveRead) {
            return `${this.title} by ${this.author}, ${pages} pages, read`;
        }
        return `${this.title} by ${this.author}, ${pages} pages, not read yet`;
    };
};

// After filling out the form, we get all the values add to library
const addBookToLibrary = function(book) {
    myLibrary.push(book);
    // create the card element and add it into main

};

const deleteBookFromLibrary = function(book) {
    
};



let book1 = new Book('Atomic Habits', 'James Clear', 300, false);
let book2 = new Book('Eloquent Javscript', 'Marjin Haverbeke', 450, true);
console.log(book1.info());
console.log(book2.info());

console.log(Object.getPrototypeOf(book1));

myLibrary.push(book1);
myLibrary.push(book2);
console.log(myLibrary);


const addCardButton = document.getElementById("add-card");
const dialog = document.getElementById("dialog");
const bookForm = dialog.querySelector("#book-form");

// pop-up form buttons
const cancelButton = dialog.querySelector("#cancel-button");
const saveButton = dialog.querySelector("#save-button");

// input form values
let title = dialog.querySelector("#title");
let author = dialog.querySelector("#author");
let pages = dialog.querySelector("#pages");
let hasRead = dialog.querySelector("#has-read");
let haveRead = false;

addCardButton.addEventListener('click', () => {
    dialog.showModal();
});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

// fix hasRead true and false
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(title.value);
    console.log(author.value);
    console.log(pages.value);
    console.log(hasRead);
    // if checkbox is checked
    if (hasRead.checked) {
        hasRead.removeAttribute('checked');
        haveRead = true;
    }
    
    const newBook = new Book(title.value, author.value, parseInt(pages.value), haveRead);
    addBookToLibrary(newBook);
    console.log(newBook);
    
    // resetting the form
    hasRead.removeAttribute('checked');
    haveRead = false;
    bookForm.reset();
    
    dialog.close();
});


