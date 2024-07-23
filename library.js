// Library array of
const libraryCollection = ['test'];

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

// Create book function
function addBookToLibrary(title, author, year, length) {
  const title = new Book(title, author, year, length);
  libraryCollection.push(this.title);
}

addBookToLibrary('LOTR', 'JRR', 1954, 132);
console.log(libraryCollection);
