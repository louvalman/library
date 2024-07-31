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
function Book(title, author, year, length, read, cover) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.lengthPages = `${length} pages`;
  this.read = read;
  this.cover = cover;
  this.info = function () {
    return `${this.title} is a book written by ${this.author}, first published in ${this.year}. The book's length is ${this.lengthPages}.`;
  };
}

// add dummy data
addBookToLibrary(
  'Lord of the Rings',
  'J. R. R. Tolkien',
  1954,
  132,
  true,
  '0618343997'
);
addBookToLibrary('Dune', 'Frank Herbert', 1965, 134, false, '0441172717');
addBookToLibrary(
  'Game of Thrones',
  'George R. R. Martin',
  2004,
  1232,
  true,
  '9780440423218'
);

// Create book function
function addBookToLibrary(title, author, year, length, read, cover) {
  const newBook = new Book(title, author, year, length, read, cover);
  libraryCollection.push(newBook);
}

// Loop through collection and add title to paragraph
let cardContainer = document.querySelector('#card-container');

function updateCollection() {
  cardContainer.innerHTML = '';
  for (let i = 0; i < libraryCollection.length; i++) {
    let card = document.createElement('div');
    let titleYearContainer = document.createElement('div');
    let informationContainer = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let year = document.createElement('p');
    let length = document.createElement('p');
    let read = document.createElement('p');
    let cover = document.createElement('img');

    card.classList.add('card');
    titleYearContainer.classList.add('title-year-container');
    informationContainer.classList.add('information-container');
    title.classList.add('card-content');
    author.classList.add('card-content');
    year.classList.add('card-content');
    length.classList.add('card-content');
    read.classList.add('card-content-check');
    cover.classList.add('cover-img');

    title.textContent += `${libraryCollection[i].title}`;
    author.textContent += `${libraryCollection[i].author}`;
    year.textContent += `${libraryCollection[i].year}`;
    length.textContent += `${libraryCollection[i].lengthPages}`;
    read.textContent += `Read: ${libraryCollection[i].read}`;
    cover.src = `https://covers.openlibrary.org/b/isbn/${libraryCollection[i].cover}-L.jpg`;

    card.appendChild(cover);
    card.appendChild(informationContainer);
    informationContainer.appendChild(titleYearContainer);
    titleYearContainer.appendChild(title);
    titleYearContainer.appendChild(year);
    informationContainer.appendChild(author);
    informationContainer.appendChild(length);
    informationContainer.appendChild(read);

    cardContainer.insertBefore(card, cardContainer.firstChild);
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
  const cover = document.getElementById('cover').value;

  addBookToLibrary(title, author, year, length, read, cover);

  form.reset();

  updateCollection();
});

console.log(libraryCollection);
