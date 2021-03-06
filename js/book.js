// global variables
const booksDetailsContainer = document.getElementById('books-container');
const totalNumResultContainer = document.getElementById('total-result');

// search input and pass the value
const loadBookSearch = () =>{
    const bookInput = document.getElementById('book-input').value;
    booksDetailsContainer.innerHTML = '';           //clear book details container
    if(bookInput === ""){
        totalNumResultContainer.innerHTML = `
            <p class= "text-center text-danger fs-3">Please Type Something!!!</p>
        `;
    }
    else{
        fetch(`https://openlibrary.org/search.json?q=${bookInput}`)
            .then(res => res.json())
            .then(data => totalResultFound(data))            //call the function
    }
    document.getElementById('book-input').value = '';           //clear book input box
}

// show total result
const totalResultFound = books =>{
    const totalNumResult = books.num_found;
    if(totalNumResult === 0){
        totalNumResultContainer.innerHTML = `
            <p class= "text-center text-danger fs-3">No Result Found!!!</p>
        `;
    }
    else{
        totalNumResultContainer.innerHTML = `
            <p class= "text-center text-success fs-3">Total Results Found: ${totalNumResult}</p>    
        `;
    }
    displayBookDetails(books.docs);             //call the function
}

// display book card details
const displayBookDetails = books =>{
    books.forEach(book =>{
        const bookCard = document.createElement('div');
        bookCard.classList.add('col');              //add class into bookCard
        bookCard.innerHTML = `
            <div class="card shadow rounded h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="image not found">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <div>
                        <hr>
                        <h6>Author Name: </h6>
                        <p>${book.author_name === undefined ? 'Author Name Not Found' : book.author_name[0]}</p>
                    </div>

                    <div>
                        <hr>
                        <h6>Publisher Name:</h6>
                        <p>${book.publisher === undefined ? 'Publisher Not Found' : book.publisher[0]}</p>
                    </div>

                    <div>
                        <hr>
                        <h6>First Publish Date:</h6>
                        <p>${book.first_publish_year === undefined ? 'Publish Date Not Found' : book.first_publish_year}</p>
                    </div>
                </div> 
            </div>
        `;
        booksDetailsContainer.appendChild(bookCard);        //adding every book separately to the container as cards
    });
}