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

// Book class
class Book {
  constructor(title, author, year, length, read, cover) {
    this.title = title;
    this.author = author;
    this.year = Number(year);
    this._length = Number(length); // use underscore for private-ish fields
    this._read = !!read;
    this.cover = cover;
  }

  get lengthPages() {
    return `${this._length} pages`;
  }

  get info() {
    return `${this.title} is a book written by ${this.author}, first published in ${this.year}. The book's length is ${this.lengthPages}.`;
  }

  // getter / setter for read status (illustrates get/set)
  get read() {
    return this._read;
  }
  set read(val) {
    this._read = !!val;
  }

  toggleRead() {
    this._read = !this._read;
  }
}

// Library class
class Library {
  constructor() {
    this.collection = [];
    this._nextId = 1; // internal id counter
  }

  _generateId() {
    return this._nextId++;
  }

  addBook(title, author, year, length, read, cover) {
    const id = this._generateId();
    const book = new Book(title, author, year, length, read, cover);
    // make sure the Book has the id assigned by library (overrides possible Book id)
    book.id = id;
    this.collection.push(book);
    return book;
  }

  findIndexById(id) {
    return this.collection.findIndex((b) => b.id === Number(id));
  }

  findById(id) {
    const idx = this.findIndexById(id);
    return idx === -1 ? null : this.collection[idx];
  }

  removeById(id) {
    const idx = this.findIndexById(id);
    if (idx === -1) return false;
    this.collection.splice(idx, 1);
    return true;
  }

  toggleReadById(id) {
    const book = this.findById(id);
    if (!book) return false;
    book.toggleRead();
    return true;
  }
}

// Library collection array
const library = new Library();

// Add dummy data
const lotr = new Book(
  'Lord of the Rings',
  'J. R. R. Tolkien',
  1954,
  132,
  true,
  '0618343997'
);

const dune = new Book('Dune', 'Frank Herbert', 1965, 134, false, '0441172717');

const got = new Book(
  'Game of Thrones',
  'George R. R. Martin',
  2004,
  1232,
  true,
  '9780440423218'
);

const billySummers = new Book(
  'Billy Summers',
  'Stephen King',
  2021,
  528,
  true,
  '1982173610'
);

library.addBook(
  'Lord of the Rings',
  'J. R. R. Tolkien',
  1954,
  132,
  true,
  '0618343997'
);
library.addBook('Dune', 'Frank Herbert', 1965, 134, false, '0441172717');
library.addBook(
  'Game of Thrones',
  'George R. R. Martin',
  2004,
  1232,
  true,
  '9780440423218'
);
library.addBook('Billy Summers', 'Stephen King', 2021, 528, true, '1982173610');

// Create book function
function addBookToLibrary(title, author, year, length, read, cover) {
  const newBook = new Book(title, author, year, length, read, cover);
  library.collection.push(newBook);
}

// Create book cards with content of library.collection array
let cardContainer = document.querySelector('#card-container');

function updateCollection() {
  cardContainer.innerHTML = '';
  for (let i = 0; i < library.collection.length; i++) {
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
    let iconSpan = document.createElement('span');
    let iconImg = document.createElement('img');
    let read = document.createElement('p');
    let cover = document.createElement('img');

    card.classList.add('card');
    card.setAttribute('data-id', library.collection[i].id);
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
    iconSpan.classList.add('status-icon');
    cover.classList.add('cover-img');
    readLengthContainer.classList.add('read-length-container');
    authorTitleYearContainer.classList.add('author-title-year-container');

    removeCard.textContent = '✕';
    title.textContent += `${library.collection[i].title}`;
    author.textContent += `${library.collection[i].author}`;
    year.textContent += `${library.collection[i].year}`;
    length.textContent += `${library.collection[i].lengthPages}`;

    if (library.collection[i].read == true) {
      read.textContent = `Read`;
      iconImg.src = './assets/check.svg';
      iconImg.alt = 'Read';
      iconSpan.classList.add('read-icon');
      read.classList.add('read');
    } else {
      read.textContent = `Unread`;
      iconImg.src = './assets/xmark.svg';
      iconImg.alt = 'Unread';
      iconSpan.classList.add('unread-icon');
      read.classList.add('unread');
    }

    cover.src = `https://covers.openlibrary.org/b/isbn/${library.collection[i].cover}-L.jpg`;

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
    iconSpan.appendChild(iconImg);
    read.appendChild(iconSpan);

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

  library.addBook(title, author, year, length, read, cover);
  form.reset();
  updateCollection();
});

// Find book through class-defined id
function findBookIndexById(id) {
  return library.collection.findIndex((b) => b.id === Number(id));
}

// Change read status
function toggleRead(event) {
  const card = event.target.closest('.card');
  const id = card.getAttribute('data-id');
  const index = findBookIndexById(id);
  if (index === -1) return;
  const book = library.collection[index];

  // Use the class toggleRead method
  book.toggleRead();

  // Update DOM visuals
  const readElement = event.target.closest('.card-content-check');
  const iconSpan = readElement.querySelector('.status-icon');
  const iconImg = iconSpan.querySelector('img');

  readElement.textContent = book.read ? 'Read' : 'Unread';
  readElement.appendChild(iconSpan);

  if (book.read) {
    iconImg.src = './assets/check.svg';
    iconImg.alt = 'Read';
    iconSpan.classList.add('read-icon');
    iconSpan.classList.remove('unread-icon');
    readElement.classList.add('read');
    readElement.classList.remove('unread');
  } else {
    iconImg.src = './assets/xmark.svg';
    iconImg.alt = 'Unread';
    iconSpan.classList.add('unread-icon');
    iconSpan.classList.remove('read-icon');
    readElement.classList.add('unread');
    readElement.classList.remove('read');
  }
}

// Remove book function
function removeBook(event) {
  const card = event.target.closest('.card');
  const id = card.getAttribute('data-id');
  if (!id) return;
  library.removeById(id);
  updateCollection();
}
