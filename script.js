// Global variable for array
let library = [];
let booksContainer = document.querySelector(".books");

// Book Constructor function
function Book(id,title,author,noOfPages, hasRead=false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.hasRead = hasRead;
} 

// Function to create a book, and add to library array
function addBookToLibrary(id, title, author, noOfPages, hasRead){
    let newBook = new Book(id, title, author,noOfPages, hasRead);  
    library.push(newBook);
}

function showBookToPage(item){
    console.log("Showing book...");
    let newBookContainer = document.createElement("div");
    let bookTitle = document.createElement("h2")
    let bookAuthor = document.createElement("p");
    let bookPages = document.createElement("p");
    let bookReadStatus = document.createElement("p");

    bookTitle.textContent = `Title: `+ item.title;
    bookAuthor.textContent = `Author: `+ item.author;
    bookPages.textContent = `Pages: `+ item.noOfPages;
    bookReadStatus.textContent = `Book has been read?: ` + item.hasRead;

    newBookContainer.appendChild(bookTitle);
    newBookContainer.appendChild(bookAuthor);
    newBookContainer.appendChild(bookPages);
    newBookContainer.appendChild(bookReadStatus);

    // console.log("new book:")
    // console.log(newBookContainer);

    booksContainer.appendChild(newBookContainer);
}

function showBooks(){
    library.forEach(showBookToPage);
}

addBookToLibrary(crypto.randomUUID(), "test title", "test author", 25);
addBookToLibrary(crypto.randomUUID(), "Lord of the Rings", "Tolkien", 59, true);

showBooks();




// console.log(crypto.randomUUID());
// let book = new Book(crypto.randomUUID(), "test title", "test author");
// let book2 = new Book(crypto.randomUUID(), "Lord of the Rings", "Tolkien");