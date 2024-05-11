// global variables;
let bookCount = 0;
let myLibrary = [];
const main = document.getElementById("main");

// fix the delete button and make ids for the books

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
    bookCount++;
    myLibrary.push(book);
    console.log(myLibrary);
};


const deleteBookFromLibrary = function(card) {
    // delete from library array
    for (let i = 0; i < myLibrary.length; i++) {
        if (i === parseInt(card.dataset.indexNumber)) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    console.log(myLibrary);
    // remove book card from screen
    main.removeChild(card);
    console.log("main children length " + main.children.length);
    // change all the new indexes for cards
    for (let i = 0; i < main.children.length; i++) {
        main.children[i].setAttribute("data-index-number", i);
        console.log(main.children[i])
    }
    
};



let book1 = new Book('Atomic Habits', 'James Clear', 300, false);
let book2 = new Book('Eloquent Javscript', 'Marjin Haverbeke', 450, true);
console.log(book1.info());
console.log(book2.info());

addBookToLibrary(book1);
addBookToLibrary(book2);
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
    // incremenet book count
    addBookToLibrary(newBook);
    createBookCard(newBook);
    console.log("created new Book" + newBook);
    
    // resetting the form
    hasRead.removeAttribute('checked');
    haveRead = false;
    bookForm.reset();
    
    dialog.close();
});


const renderCards = (library) => {
    library.map((book) => {
        createBookCard(book);
    });
};


// Creates new bookcard and shows onto the screen
const createBookCard = (book) => {
    // creating the elements in card
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-index-number", myLibrary.indexOf(book));
    const title = document.createElement("h4");
    title.textContent = book.title;
    const author = document.createElement("h5");
    author.textContent = book.author;
    const pages = document.createElement("p");
    pages.textContent = book.pages;
    const readButton = document.createElement("button");
    readButton.textContent = "Read";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    readButton.className = "read";
    deleteButton.className = "delete";

    // delete buttons clicked functionalities
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = e.target.closest(".card");
        deleteBookFromLibrary(parent);
    });



    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.textContent = book.haveRead ? "Read" : "Not read";

    // appending components in card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    card.appendChild(deleteButton);
    card.appendChild(footer);

    main.appendChild(card);

};


renderCards(myLibrary);