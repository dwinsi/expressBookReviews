const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
    // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    // res.send(JSON.stringify(books,null,4));
    return res.status(200).send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = books[isbn];
    if(book){
      return res.status(200).send(JSON.stringify(books[isbn],null,4));
    }
    else{
      return res.status(404).json({message: "Book not found."});
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    const filteredbooks = Object.values(books).filter(book => book.author === author);
    if(filteredbooks.length > 0){
      return res.status(200).send(JSON.stringify(filteredbooks,null,4));
    }
    else{
      return res.status(404).json({ message: "No books found by this author" });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const filteredbooks = Object.values(books).filter(book => book.title === title);
  if(filteredbooks.length > 0){
    return res.status(300).send(JSON.stringify(filteredbooks,null,4));
  }
  else{
    return res.status(404).json({ message: "No books found with this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params;
  const book = books[isbn];
  if(book && book.reviews){
    return res.status(200).json(book.reviews)
  }
  else {
    return res.status(404).json({message: "No reviews found for this book."});
  }
});



/*
// Task 10:
// Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.

function getBookList() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

public_users.get("/", function (req, res) {
  getBookList().then(
    (books) => res.send(JSON.stringify(books, null, 4)),
    (error) => res.send("rejected")
  );
});


// Task 11
// Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.

function getFromISBN(isbn) {
  let curent_book = books[isbn];
  return new Promise((resolve, reject) => {
    if (curent_book) {
      resolve(curent_book);
    } else {
      reject("Cant find book with given ISBN number");
    }
  });
}

public_users.get("/isbn/:isbn", function (req, res) {
  const isbn_number = req.params.isbn;
  getFromISBN(isbn_number).then(
    (bk) => res.send(JSON.stringify(bk, null, 4)),
    (error) => res.send(error)
  );
});

// Task 12
// Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.

function getFromAuthor(author) {
  let answer = [];
  return new Promise((resolve, reject) => {
    for (var isbn_number in books) {
      let current_book = books[isbn_number];
      if (current_book.author === author) {
        answer.push(current_book);
      }
    }
    resolve(answer);
  });
}

public_users.get("/author/:author", function (req, res) {
  const author_name = req.params.author;
  getFromAuthor(author_name).then((result) =>
    res.send(JSON.stringify(result, null, 4))
  );
});


// Task 13:
// Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
function getFromTitle(title) {
  let answer = [];
  return new Promise((resolve, reject) => {
    for (var isbn_number in books) {
      let current_book = books[isbn_number];
      if (current_book.title === title) {
        answer.push(current_book);
      }
    }
    resolve(answer);
  });
}

public_users.get("/title/:title", function (req, res) {
  const book_title = req.params.title;
  getFromTitle(book_title).then((result) =>
    res.send(JSON.stringify(result, null, 4))
  );
});

*/

module.exports.general = public_users;
