// Global variable for array
let library = [];
let booksContainer = document.querySelector(".books");

// Book Constructor function
function Book(id,title,author) {
    this.id = id;
    this.title = title;
    this.author = author;
} 

// Function to create a book, and add to library array
function addBookToLibrary(id, title, author){
    let newBook = new Book(id, title, author);  
    library.push(newBook);
}

function showBookToPage(item){
    console.log("Showing book...");
    let newBookContainer = document.createElement("div");
    let h2 = document.createElement("h2")
    let p = document.createElement("p");

    h2.textContent = item.title;
    p.textContent = item.author;

    newBookContainer.appendChild(h2);
    newBookContainer.appendChild(p);

    // console.log("new book:")
    // console.log(newBookContainer);

    booksContainer.appendChild(newBookContainer);
}

function showBooks(){
    library.forEach(showBookToPage);
}

addBookToLibrary(crypto.randomUUID(), "test title", "test author");
addBookToLibrary(crypto.randomUUID(), "Lord of the Rings", "Tolkien");

showBooks();




// console.log(crypto.randomUUID());
// let book = new Book(crypto.randomUUID(), "test title", "test author");
// let book2 = new Book(crypto.randomUUID(), "Lord of the Rings", "Tolkien");