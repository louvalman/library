// Initiate modal
MicroModal.init({
  disableFocus: true,
  awaitCloseAnimation: true,
  awaitOpenAnimation: true,
});

// Clear input value
document.addEventListener('click', function (event) {
  let clearButton = event.target.closest('.clear');
  if (clearButton) {
    let inputId = clearButton.getAttribute('data-input-id');
    document.getElementById(inputId).value = '';
  }
});

// Library collection array
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

// Add dummy data
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
addBookToLibrary(
  'Billy Summers',
  'Stephen King',
  2021,
  528,
  true,
  '1982173610'
);

// Create book function
function addBookToLibrary(title, author, year, length, read, cover) {
  const newBook = new Book(title, author, year, length, read, cover);
  libraryCollection.push(newBook);
}

// Create book cards with content of libraryCollection array
let cardContainer = document.querySelector('#card-container');

function updateCollection() {
  cardContainer.innerHTML = '';
  for (let i = 0; i < libraryCollection.length; i++) {
    let card = document.createElement('div');
    let coverRemoveContainer = document.createElement('div');
    let ghostElement = document.createElement('div');
    let removeCard = document.createElement('div');
    let titleYearContainer = document.createElement('div');
    let authorTitleYearContainer = document.createElement('div');
    let informationContainer = document.createElement('div');
    let readLengthContainer = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let year = document.createElement('p');
    let length = document.createElement('p');
    let read = document.createElement('p');
    let cover = document.createElement('img');

    card.classList.add('card');
    coverRemoveContainer.classList.add('cover-remove-container');
    ghostElement.classList.add('ghost-element');
    removeCard.classList.add('remove-card');
    titleYearContainer.classList.add('title-year-container');
    informationContainer.classList.add('information-container');
    title.classList.add('card-content');
    author.classList.add('card-content');
    year.classList.add('card-content');
    length.classList.add('card-content');
    read.classList.add('card-content-check');
    cover.classList.add('cover-img');
    readLengthContainer.classList.add('read-length-container');
    authorTitleYearContainer.classList.add('author-title-year-container');

    removeCard.textContent = '✕';
    title.textContent += `${libraryCollection[i].title}`;
    author.textContent += `${libraryCollection[i].author}`;
    year.textContent += `${libraryCollection[i].year}`;
    length.textContent += `${libraryCollection[i].lengthPages}`;
    if (libraryCollection[i].read == true) {
      read.textContent += `Read`;
    } else {
      read.textContent += `Unread`;
    }
    cover.src = `https://covers.openlibrary.org/b/isbn/${libraryCollection[i].cover}-L.jpg`;

    card.setAttribute('data-index', i);

    card.appendChild(coverRemoveContainer);
    coverRemoveContainer.appendChild(ghostElement);
    coverRemoveContainer.appendChild(cover);
    coverRemoveContainer.appendChild(removeCard);
    card.appendChild(informationContainer);
    informationContainer.appendChild(authorTitleYearContainer);
    authorTitleYearContainer.appendChild(titleYearContainer);
    titleYearContainer.appendChild(title);
    titleYearContainer.appendChild(year);
    authorTitleYearContainer.appendChild(author);
    informationContainer.appendChild(readLengthContainer);
    readLengthContainer.appendChild(length);
    readLengthContainer.appendChild(read);

    cardContainer.insertBefore(card, cardContainer.firstChild);

    removeCard.addEventListener('click', removeBook);
    read.addEventListener('click', toggleRead);
  }
}

updateCollection();

// Submit form
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

// Change read status
function toggleRead(event) {
  const card = event.target.closest('.card');
  const index = card.getAttribute('data-index');
  const book = libraryCollection[index];

  book.read = !book.read;

  event.target.textContent = book.read ? 'Read' : 'Unread';
}

// Remove book function
function removeBook(event) {
  const card = event.target.closest('.card');
  const index = card.getAttribute('data-index');
  const book = libraryCollection[index];

  console.log(index);

  libraryCollection.splice(index, 1);

  updateCardIndices();
  updateCollection();
}

// Update data-index attributes of remaining cards after removal
function updateCardIndices() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.setAttribute('data-index', index);
  });
}
