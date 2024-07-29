// Initiate modal

// Library array of
const libraryCollection = [];

// Book constructor
function Book(title, author, year, length) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.lengthPages = `${length} pages`;
  this.info = function () {
    return `${this.title} is a book written by ${this.author}, first published in ${this.year}. The book's length is ${this.lengthPages}.`;
  };
}

// add dummy data
addBookToLibrary('LOTR', 'JRR', 1954, 132);
addBookToLibrary('Dune', 'ERR', 1423, 134);
addBookToLibrary('GOT', 'GRRM', 2004, 1232);

// Create book function
function addBookToLibrary(title, author, year, length) {
  const newBook = new Book(title, author, year, length);
  libraryCollection.push(newBook);
}

// Loop through collection and add title to paragraph
let carusel = document.querySelector('#carusel');
for (let i = 0; i < libraryCollection.length; i++) {
  carusel.textContent += `${libraryCollection[i].title} `;
}

console.log(libraryCollection);
