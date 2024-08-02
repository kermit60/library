// global variables;
let bookCount = 0;
let myLibrary = [];
const main = document.getElementById("main");

// constructor for a book object
class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    changeRead() {
        this.haveRead = !this.haveRead;
    }

    info() {
        if (this.haveRead) {
            return `${this.title} by ${this.author}, ${this.pages} pages, read`;
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    
    }
}

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


const addCardButton = document.getElementById("add-card-button");
const dialog = document.getElementById("dialog");
const bookForm = document.querySelector("#book-form");


// pop-up form buttons
const cancelButton = document.querySelector("#cancel-button");
const saveButton = document.querySelector("#save-button");

// input form values
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let hasRead = document.querySelector("#has-read");
let haveRead = false;


addCardButton.addEventListener('click', () => {
    bookForm.reset();
    dialog.showModal();
});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

// Fix and add saveButton validation
saveButton.addEventListener('click', (e) => {
    
    console.log(title.value);
    console.log(author.value);
    console.log(pages.value);
    console.log(hasRead);
    if (title.value && author.value && pages.value) {
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
    }
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
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
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

    const grouper = document.createElement('div');

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.textContent = book.haveRead ? "Read" : "Not Read";

    readButton.addEventListener('click',  e => {
        e.preventDefault();
        const parent = e.target.closest(".card");
        // get the card footer
        const footer = parent.querySelector(".card-footer");
        console.log(parent);
        console.log(footer);
        // get the book
        let books = myLibrary.find((book, index) => index === parseInt(parent.dataset.indexNumber));
        books.changeRead();
        footer.textContent = books.haveRead ? "Read" : "Not Read";
        
    });


    // appending components in card
    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    grouper.append(readButton);
    grouper.append(deleteButton);
    cardBody.append(grouper);
    card.appendChild(cardBody)
    card.appendChild(footer);

    main.appendChild(card);

};


renderCards(myLibrary);

const errors = (() => {
    // bookForm
    const errorList = document.querySelectorAll('.link');

    for (const list of errorList) {
        list.addEventListener("input", (e) => {
            console.log(e.target.parentElement.childNodes[5]);
            const errorMessage = e.target.parentElement.childNodes[5];
            if (list.validity.valid) {
                errorMessage.textContent = '';
            } else {
                showError(list, errorMessage);
            }
        });
    }

    const showError = (link, errorInput) => {
        if (link.validity.valueMissing) {
            errorInput.textContent = "Input should be at least 1 character long";
        } else if (link.validity.typeMismatch) {
            errorInput.textContent = "You need to match the to the correct type";
        } else if (link.validity.tooShort) {
            errorInput.textContent = "You can do something";
        }
    }

    bookForm.addEventListener('submit', (e) => {
        for (const link of errorList) {
            const errorMessage = link.parentElement.childNodes[5];
            console.log(errorMessage);
            if (!link.validity.valid) {
                showError(link, errorMessage);
                e.preventDefault();
            }
        }
    });

})();
