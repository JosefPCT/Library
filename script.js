// Global variables
let library = [];
let booksContainer = document.querySelector(".books");
let addBookButton = document.querySelector("#add-book-button");
let dialog = document.getElementById("dialog");
let submitBookButton = document.getElementById("submit-book");
// let deleteButtons = document.querySelectorAll(".delete-button");

// Event Listeners
addBookButton.addEventListener("click", addBook);
submitBookButton.addEventListener("click", submitBook);
// deleteButtons.addEventListener("click", deleteBook);

// Book Constructor function
function Book(id,title,author,noOfPages, hasRead=false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.hasRead = hasRead;
} 

Book.prototype.toggleRead = function (){
    console.log("toggling read...");
    this.hasRead = !(this.hasRead);
};

// Function to create a book, and add to library array
function addBookToLibrary(id, title, author, noOfPages, hasRead){
    let newBook = new Book(id, title, author,noOfPages, hasRead);  
    library.push(newBook);
}

// Function to create the elements needed to show book to the page
function showBookToPage(item){
    console.log("Showing book...");
    let newBookContainer = document.createElement("div");
    let bookTitle = document.createElement("h2")
    let bookAuthor = document.createElement("p");
    let bookPages = document.createElement("p");
    let bookReadStatus = document.createElement("p");
    let bookDeleteButton = document.createElement("button");
    let toggleReadButton = document.createElement("button");

    newBookContainer.setAttribute("class", "card");

    newBookContainer.setAttribute("data-attribute", item.id);
    bookTitle.textContent = `Title: `+ item.title;
    bookAuthor.textContent = `Author: `+ item.author;
    bookPages.textContent = `Pages: `+ item.noOfPages;
    bookReadStatus.textContent = `Book has been read?: ` + item.hasRead;
    bookDeleteButton.textContent = "Delete book";
    toggleReadButton.textContent = "Read Status";

    bookDeleteButton.setAttribute("class", "delete-button");
    bookDeleteButton.addEventListener("click", deleteBook);

    toggleReadButton.setAttribute("class", "toggle-read");
    toggleReadButton.addEventListener("click", toggleReadStatus);

    newBookContainer.appendChild(bookTitle);
    newBookContainer.appendChild(bookAuthor);
    newBookContainer.appendChild(bookPages);
    newBookContainer.appendChild(bookReadStatus);
    newBookContainer.appendChild(bookDeleteButton);
    newBookContainer.appendChild(toggleReadButton);

    // console.log("new book:")
    // console.log(newBookContainer);

    booksContainer.appendChild(newBookContainer);
}

function showBooks(){
    booksContainer.innerHTML = ""; // clears the container before putting in more children
    library.forEach(showBookToPage);
}

// Function to show the form modal
function addBook(){
    console.log ("clicked add book button");
    dialog.showModal();
}

// Function to submit the form, prevents the default of sending data to server, to manipulate data in JavaScript
function submitBook(e){
    e.preventDefault();
    
    let form = document.forms.bookform;
    let formData = new FormData(form);
    console.log(formData.get('book-name'));

    let title = formData.get('book-name');
    let author = formData.get("book-author");
    let pages = formData.get("book-pages");
    let readStatus = formData.get("book-read-status");

    // Filter readStatus value
    if(readStatus === "true"){
        readStatus = true;
    } else{
        readStatus = false;
    }

    addBookToLibrary(crypto.randomUUID(), title, author, pages, readStatus);
    showBooks();
    // console.log(title);
    // console.log(author);
    // console.log(pages);
    // console.log(readStatus);
    
    // let title = document.getElementById("book-name");
    // let author = document.getElementById("book-author");
    // let pages = document.getElementById("book-pages");
    // let readStatus = document.getElementById("book-read-status");
    // console.log(title.value);
    // console.log(author.value);
    // console.log(pages.value);
    // console.log(readStatus.value);
    form.reset();
    dialog.close();
    console.log("submit book button clicked");
}

// 
function deleteBook(e){
    console.log("clicked delete book button");
    console.log(e.target.parentNode.getAttribute("data-attribute"));
    let objectId = e.target.parentNode.getAttribute("data-attribute");
    console.log(library);
    library = library.filter((item) => !(item.id === objectId));
    showBooks();
}

// Function to toggle the read status
function toggleReadStatus(e){
    let objectId = e.target.parentNode.getAttribute("data-attribute");
    console.log(library);
    library.forEach((item) => {
        if (item.id === objectId){
            item.toggleRead();
            return;
        }
    });
    showBooks();
}

// function toggleRead(obj){
//     obj.hasRead = !(obj.hasRead);
// }


// addBookToLibrary(crypto.randomUUID(), "test title", "test author", 25);
// addBookToLibrary(crypto.randomUUID(), "Lord of the Rings", "Tolkien", 59, true);
// showBooks();



// console.log(crypto.randomUUID());
// let book = new Book(crypto.randomUUID(), "test title", "test author");
// let book2 = new Book(crypto.randomUUID(), "Lord of the Rings", "Tolkien");