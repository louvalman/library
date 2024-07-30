// Initiate modal
MicroModal.init({
  disableFocus: true,
  awaitCloseAnimation: true,
  awaitOpenAnimation: true,
});

// Clear input
document.addEventListener('click', function (event) {
  let clearButton = event.target.closest('.clear');
  if (clearButton) {
    let inputId = clearButton.getAttribute('data-input-id');
    document.getElementById(inputId).value = '';
  }
});

// Library array of
const libraryCollection = [];

// Book constructor
function Book(title, author, year, length, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.lengthPages = `${length} pages`;
  this.read = read;
  this.info = function () {
    return `${this.title} is a book written by ${this.author}, first published in ${this.year}. The book's length is ${this.lengthPages}.`;
  };
}

// add dummy data
addBookToLibrary('LOTR', 'JRR', 1954, 132, true);
addBookToLibrary('Dune', 'ERR', 1423, 134, false);
addBookToLibrary('GOT', 'GRRM', 2004, 1232, true);

// Create book function
function addBookToLibrary(title, author, year, length, read) {
  const newBook = new Book(title, author, year, length, read);
  libraryCollection.push(newBook);
}

// Loop through collection and add title to paragraph
let cardContainer = document.querySelector('#card-container');

function updateCollection() {
  cardContainer.innerHTML = '';
  for (let i = 0; i < libraryCollection.length; i++) {
    let card = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let year = document.createElement('p');
    let length = document.createElement('p');
    let read = document.createElement('p');

    card.classList.add('card');
    title.classList.add('card-content');
    author.classList.add('card-content');
    year.classList.add('card-content');
    length.classList.add('card-content');
    read.classList.add('card-content-check');

    title.textContent += `${libraryCollection[i].title}`;
    author.textContent += `${libraryCollection[i].author}`;
    year.textContent += `${libraryCollection[i].year}`;
    length.textContent += `${libraryCollection[i].lengthPages}`;
    read.textContent += `Read: ${libraryCollection[i].read}`;

    cardContainer.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(year);
    card.appendChild(author);
    card.appendChild(length);
    card.appendChild(read);
  }
}

updateCollection();

const form = document.getElementById('add-collection-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const length = document.getElementById('length').value;
  const read = document.querySelector('input[name="read"]').checked;

  addBookToLibrary(title, author, year, length, read);

  form.reset();

  updateCollection();
});

console.log(libraryCollection);
