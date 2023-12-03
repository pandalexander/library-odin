const myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = Boolean(read));
}

function addBookToLibrary(object) {
  myLibrary.push(object);
}

function displayArray(array) {
  for (let i = 0; i < array.length; i++) {
    displayCard(array[i]);
  }
}

function addTitle(bookCard, object) {
  let bookTitle = document.createElement("h1");
  bookTitle.classList.add("title");
  bookCard.appendChild(bookTitle);
  bookTitle.textContent = object.title;
}

function addAuthor(bookCard, object) {
  let bookAuthor = document.createElement("h2");
  bookAuthor.classList.add("author");
  bookCard.appendChild(bookAuthor);
  bookAuthor.textContent = object.author;
}

function addPages(bookCard, object) {
  let bookPages = document.createElement("div");
  bookPages.classList.add("page-number");
  bookCard.appendChild(bookPages);
  bookPages.textContent = object.pages;
}

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

function displayCard(object) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("card");
  libraryArea.appendChild(bookCard);

  addTitle(bookCard, object);
  addAuthor(bookCard, object);
  addPages(bookCard, object);
  addRead(bookCard, object);
}

const percyJackson = new Book(
  "Percy Jackson & the Olympians: The Lightning Thief",
  "Pierce Brown",
  382,
  false
);

const redRising = new Book("Red Rising", "Richard Russell Riordan", 377, false);

const eragon = new Book("Eragon", "Christopher Paolini", 544, true);

const libraryArea = document.querySelector("#library-container");

addBookToLibrary(percyJackson);
addBookToLibrary(redRising);
addBookToLibrary(eragon);

displayArray(myLibrary);
