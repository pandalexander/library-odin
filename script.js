// Library array to hold all books
const myLibrary = [];

// This constructor creates book objects
function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = Boolean(read));
}

// This function places the object into the myLibrary array
function addBookToLibrary(object) {
  myLibrary.push(object);
}

// This function adds an object's title to the book card DOM element
function addTitle(bookCard, object) {
  let bookTitle = document.createElement("h1");
  bookTitle.classList.add("title");
  bookCard.appendChild(bookTitle);
  bookTitle.textContent = object.title;
}

// This function adds an object's author to the book card DOM element
function addAuthor(bookCard, object) {
  let bookAuthor = document.createElement("h2");
  bookAuthor.classList.add("author");
  bookCard.appendChild(bookAuthor);
  bookAuthor.textContent = object.author;
}

// This function adds an object's page count to the book card DOM element
function addPages(bookCard, object) {
  let bookPages = document.createElement("div");
  bookPages.classList.add("page-number");
  bookCard.appendChild(bookPages);
  bookPages.textContent = object.pages + " pages";
}

// This function adds an object's read status to the book card DOM element
function addRead(bookCard, object) {
  let bookRead = document.createElement("div");
  bookRead.classList.add("read");
  bookCard.appendChild(bookRead);
  if (object.read == true) {
    bookRead.textContent = "This book has been read";
  } else {
    bookRead.textContent = "This book has not been read";
  }
}

// This function adds all of an object's information to the DOM
function displayCard(object) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("card");
  libraryArea.appendChild(bookCard);

  addTitle(bookCard, object);
  addAuthor(bookCard, object);
  addPages(bookCard, object);
  addRead(bookCard, object);

  // This checks the index of the object and sets the html data-index-number attribute accordingly
  bookCard.setAttribute("data-index-number", myLibrary.indexOf(object));
}

// This function iterates through the array, deletes everything, then recreates DOM cards to display current state of the array
function displayArray(array) {
  while (libraryArea.hasChildNodes()) {
    libraryArea.firstChild.remove();
  }
  for (let i = 0; i < array.length; i++) {
    displayCard(array[i]);
  }
}

// These objects are initial books already added into the library
const percyJackson = new Book(
  "Percy Jackson & the Olympians: The Lightning Thief",
  "Pierce Brown",
  382,
  false
);

const redRising = new Book("Red Rising", "Richard Russell Riordan", 377, false);

const eragon = new Book("Eragon", "Christopher Paolini", 544, true);

// This selects the area in the DOM where the library will be displayed
const libraryArea = document.querySelector("#library-container");

// Adding each pre-existing book into the myLibrary array
addBookToLibrary(percyJackson);
addBookToLibrary(redRising);
addBookToLibrary(eragon);

// Displays the array on the DOM
displayArray(myLibrary);

// dialog DOM variables
let newTitle = document.getElementById("title");
let showDialog = document.getElementById("show-dialog");
let closeDialog = document.getElementById("close-dialog");
let dialog = document.getElementById("dialog");

// opens the dialog
showDialog.addEventListener("click", () => {
  dialog.showModal();
});

// dialog submission adds book to array and re-displays array, then closes
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  let newBook = new Book(newTitle.value, "author", 8, false);
  addBookToLibrary(newBook);
  displayArray(myLibrary);
  dialog.close();
});

// closes the dialog
closeDialog.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
