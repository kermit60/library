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
let addBookToLibrary = function() {

}

let book1 = new Book('Atomic Habits', 'James Clear', 300, false);
let book2 = new Book('Eloquent Javscript', 'Marjin Haverbeke', 450, true);
console.log(book1.info());
console.log(book2.info());

console.log(Object.getPrototypeOf(book1));

myLibrary.push(book1);
myLibrary.push(book2);
console.log(myLibrary);
