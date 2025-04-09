# Library
A collection of book objects

- Create a constructor for books
- Add a separate function  that takes argument and creates books based on the arguments
- All books should have a unique id, use `crpyto.randomUUID()` 

- Add a function that loops through the array and displays each book on the page
- Display in some sort of table or their own card

- Add a new book button, that brings up form to fill up
- Add a button on each book's display to remove the book from the library
- Add a button on each book's display to change its `read` status.

To do:
- Figure out a way on the duplicated books
    - Idea: use removeChild to remove the child of the .books div when calling the showBook function

- Add a button on each book's display to remove the book from the library
    - Idea: give appropriate element the data-attribute property with the value of the unique id of the object, and use that to remove an object

- Add a button on each book's display to changs its `read` status
    - Idea: Create a Book prototype function that can toggle the hasRead key of the object
    