const myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = Boolean(read));
}

const percyJackson = new Book(
  "Percy Jackson & the Olympians: The Lightning Thief",
  "Richard Russell Riordan",
  377,
  false
);

function addBookToLibrary() {
  // do stuff here
}
