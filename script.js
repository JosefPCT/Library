// Global variables
let library = [];
let booksContainer = document.querySelector(".books");
let addBookButton = document.querySelector("#add-book-button");
let dialog = document.getElementById("dialog");
let submitBookButton = document.getElementById("submit-book");

// Event Listeners
addBookButton.addEventListener("click", addBook);
submitBookButton.addEventListener("click", submitBook);

// Book Constructor function
class Book{
    constructor(id,title,author,noOfPages, hasRead=false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.hasRead = hasRead;
    }

    toggleRead() {
        console.log("toggling read...");
        this.hasRead = !(this.hasRead);
    }
}; 

// Book.prototype.toggleRead = function (){
//     console.log("toggling read...");
//     this.hasRead = !(this.hasRead);
// };

// Function to create a book, and add to library array
// Instantiate a new Book object with the constructor and add it to the global array
function addBookToLibrary(id, title, author, noOfPages, hasRead){
    let newBook = new Book(id, title, author,noOfPages, hasRead);  
    library.push(newBook);
}

// Function to create the elements needed to show book to the page
// Create elements according to the data, set a data-attribute to the card container
// Add event listeners to the relevant buttons with their own functions
// Then show it to the page by appending the created elements to the books container
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

    booksContainer.appendChild(newBookContainer);
}

// Function to start the ShowBook function
// Resets the books container to avoid duplication
// Iterates through the array and passes the object to the showBookToPage function to create and append the elements
function showBooks(){
    booksContainer.innerHTML = ""; // clears the container before putting in more children
    library.forEach(showBookToPage);
}

// Function to show the form modal
// Use to show the dialog tag when clicking the add book button
function addBook(){
    console.log ("clicked add book button");
    dialog.showModal();
}

// Function to submit the form, prevents the default of sending data to server, to manipulate data in JavaScript
// Prevents the default behavior of submit
// Get the data sent using FormData, 
// Used .get method of FormData to store the values
// Added logic for the readStatus to pass the appropriate value
// Uses crypto function to create a unique id for the object, which will aid in deleting the object and toggling statuses
// Use the .reset method of form to clear the values after submitting
// Use .close method of dialog element to close the dialog/modal box after submitting
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

    form.reset();
    dialog.close();
    console.log("submit book button clicked");
}

// Function to delete a books by clicking the delete book button
// Get the id of the object from the data-attribute of the parent div
// Filter through the array collection, and only look for the objects that doesn't match the id
// Then call the showBooks() function to re-clear the page
function deleteBook(e){
    console.log("clicked delete book button");
    console.log(e.target.parentNode.getAttribute("data-attribute"));
    let objectId = e.target.parentNode.getAttribute("data-attribute");
    console.log(library);
    library = library.filter((item) => !(item.id === objectId));
    showBooks();
}

// Function to toggle the read status
// Get the id of the object from the data-attribute of the parent div
// Loop through the objects to find the correct object, and call the toggleRead prototype method
// Then call showBooks function to re-clear objects in the page
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


