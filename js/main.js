// search button evant handler 
const searchButton = () => {
    const getInput = document.getElementById('search-input');
    const inputVal = getInput.value;
    
    // load data 
    fetch(`https://openlibrary.org/search.json?q=${inputVal}`)
    .then(res => res.json())
    .then(data => displayBook(data));  
}

// display output function 
const displayBook = books => {
    const getDiv = document.getElementById('main-div');
    const searchItem = document.getElementById('search-item');
    const getInput = document.getElementById('search-input');
    const notFound = document.getElementById('not-found');
    const inputVal = getInput.value;
    const foundNumber = books.docs.length;

    // if result not found 
    if(books.docs.length === 0){
       notFound.innerHTML = `<h1 class="text-center">Result Not Found</h1>`
       searchItem.innerHTML = '';
    }
    getDiv.textContent = '';
    books.docs.forEach(book => {
        // how many result found
        searchItem.innerHTML = `<h1 class="text-center">searching for '<span class="text-success">${inputVal}</span>' we found <span class="text-success">${foundNumber}</span> from <span class="text-success">${books.numFound}</span> products</h1>`;

        // load data output 
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const createColDiv = document.createElement('div');
        createColDiv.classList.add('col');
        createColDiv.innerHTML = `
            <div class="card h-100">
                <img src=${imgUrl} height="350px" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name : ${book.title}</h5>
                    <h6 class="author">Author : ${book.author_name}</h6>
                    <p class="card-text">Publisher : ${book.publisher}</p>
                    <p class="publish-date">First Publish : ${book.first_publish_year}</p>
                </div>
            </div>
        `
        getDiv.appendChild(createColDiv);
        
    });
    // clear input value 
    getInput.value = '';
}