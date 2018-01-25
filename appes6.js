class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list = document.getElementById("book-list");
        // create tr element
        const row = document.createElement("tr");
        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // create div
        const div = document.createElement("div");
        //Add message text
        div.appendChild(document.createTextNode(message));
        //add classes to div
        div.className = `alert ${className}`;
        // get the parent container
        const container = document.querySelector(".container");
        // get the form
        const form = document.getElementById("book-form");
        // Insert alert
        container.insertBefore(div, form);
        // clear alert after 3 seconds
        setTimeout(
            function () {
                document
                    .querySelector(
                        ".alert"
                    )
                    .remove();
            },
            3000
        );
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentNode.parentNode.remove();
        }
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

// Event listeners

// event listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
    console.log('test');
    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // instantiate a book
    const book = new Book(title, author, isbn);
    
    // instantiate a UI
    const ui = new UI();

    // validation
    if (title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);

        //show alert
        ui.showAlert('Book added successfully', 'success');

        // clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantiate UI
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target);

    // show alert
    ui.showAlert('Book deleted', 'success');
});