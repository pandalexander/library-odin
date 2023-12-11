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

// This function adds a delete button to the book card DOM element
function addReadButton(bookCard, object) {
  let haveBookRead = document.createElement("button");
  haveBookRead.classList.add("book-button");

  if (object.read == true) {
    haveBookRead.textContent = "Read";
    haveBookRead.classList.add("have-read-book");
  } else {
    haveBookRead.textContent = "Not Read";
    haveBookRead.classList.add("have-not-read-book");
  }
  bookCard.appendChild(haveBookRead);
}

// This function adds a delete button to the book card DOM element
function addDelete(bookCard, object) {
  let bookDelete = document.createElement("button");
  bookDelete.textContent = "Delete";
  bookDelete.classList.add("delete-book");
  bookCard.appendChild(bookDelete);
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
  addReadButton(bookCard, object);
  addDelete(bookCard, object);

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

  // this code adds an event listener to each new delete button on the page that removes that book from the library if clicked
  document.querySelectorAll(".delete-book").forEach(function (element) {
    element.addEventListener("click", function () {
      removeBookFromLibrary(element.parentNode.dataset.indexNumber);
    });
  });

  document.querySelectorAll(".book-button").forEach(function (element) {
    element.addEventListener("click", function () {
      let text = element.parentNode.childNodes[3].textContent;
      if (text === "This book has been read") {
        element.parentNode.childNodes[3].textContent =
          "This book has not been read";
        element.textContent = "Not Read";
        element.classList.add("have-not-read-book");
        element.classList.remove("have-read-book");
        changeReadStatus(element.parentNode.dataset.indexNumber);
      } else if (text === "This book has not been read") {
        element.parentNode.childNodes[3].textContent =
          "This book has been read";
        element.textContent = "Read";
        element.classList.add("have-read-book");
        element.classList.remove("have-not-read-book");
        changeReadStatus(element.parentNode.dataset.indexNumber);
      }
    });
  });
}

// This function removes a book from the myLibrary array based on index location
function removeBookFromLibrary(indexLocation) {
  const index = indexLocation;

  if (index > -1) {
    // only splice array when item is found
    myLibrary.splice(index, 1); // 2nd parameter means remove one item only
    displayArray(myLibrary);
  }
}

function changeReadStatus(indexLocation) {
  const index = indexLocation;

  if (index > -1) {
    if (myLibrary[index].read === true) {
      myLibrary[index].read = false;
    } else if (myLibrary[index].read === false) {
      myLibrary[index].read = true;
    }
    displayArray(myLibrary);
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

// Selecting dialog DOM variables
let newTitle = document.getElementById("title");
let newAuthor = document.getElementById("author");
let newPageCount = document.getElementById("page-count");
let newHaveRead = document.getElementById("have-read");

let showDialog = document.getElementById("show-dialog");
let closeDialog = document.getElementById("close-dialog");
let dialog = document.getElementById("dialog");

// Add event listener to button that opens the dialog
showDialog.addEventListener("click", () => {
  let checkbox = document.getElementById("have-read");
  checkbox.checked = false;

  let allInputs = document.querySelectorAll("input");
  allInputs.forEach((singleInput) => (singleInput.value = ""));

  dialog.showModal();
});

// dialog submission adds book to array and re-displays array, then closes
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  if (
    newTitle.value != "" &&
    newAuthor.value != "" &&
    newPageCount.value != ""
  ) {
    let newBook = new Book(
      newTitle.value,
      newAuthor.value,
      newPageCount.value,
      newHaveRead.checked
    );
    addBookToLibrary(newBook);
    displayArray(myLibrary);
    dialog.close();
  } else {
    e.preventDefault();
    alert("Please fill out all fields to add a new book!");
  }
});

// closes the dialog
closeDialog.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
