/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

const ulList = document.querySelector('.student-list');
const liStudents = ulList.children
let filtered = false;
let result = [];
let search = '';
const divPage = document.querySelector('.page');
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
const pageLi = [];

divPage.appendChild(paginationDiv);
const pageA = [];


let numPages = Math.ceil(liStudents.length / 10); 
console.log(liStudents)

for (let i = 0; i < liStudents.length; i +=1) {
    console.log(liStudents[i].textContent);
}
const noresult = document.createElement('p');
    noresult.id = "noresults"
    noresult.textContent = 'No results found, please try again.';
    divPage.appendChild(noresult);
    noresult.style.display = 'none';

    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search'
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.value = 'search for students...';
    searchInput.style.color = 'lightgrey';
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);

    document.querySelector('.page-header').appendChild(searchDiv);
    




// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four

function showTen (page, filtered, filterResult) {
    for (let i = 0; i < liStudents.length; i +=1) {
        liStudents[i].style.display = 'none';
    }
    //for (let i = 0; i < pageLi.length; i += 1) {
    //    pageLi[i].style.display = 'none';
    //}
    page = parseInt(page) * 10;
    
    if (! filtered) {

        for (let i = page - 10; i < page; i +=1) {
            if (i === liStudents.length) {
                break;
            } else {
                liStudents[i].style.display ='block';
            }       
        }
      } else {                                                        
       
        for (let i = 0; i < pageLi.length; i += 1) {
        pageLi[i].style.display = 'none';
       }
        numPages = Math.ceil(filterResult.length / 10);
        for (let i = 0; i < numPages; i += 1) {
            pageLi[i].style.display = 'inline-block';
            //pageLi[i].style.display = 'block';
        }
        for (let i = page - 10; i < page; i += 1) {
            if (i === filterResult.length) {
                break;
            } else {
                filterResult[i].style.display = "block";
            }       
        
        }
    }
}

//set the list to display first page of 10 on initial load
let pageNum = 1;
showTen(pageNum,filtered,result);

// Create and append the pagination links - Creating a function that can do this is a good approach


function createEle (li,a) {
       
    for (let i = 0; i < numPages; i +=1) {
        pageLi[i] = document.createElement(li);
        pageA[i] = document.createElement(a);
        
        pageA[i].href = '#';
        pageA[i].textContent = i+1;
        pageLi[i].appendChild(pageA[i]);
       
        paginationDiv.appendChild(pageLi[i]);
    }
    
}

createEle('li','a');
pageA[0].className = 'active';
// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

paginationDiv.addEventListener ('click', (e) => {
    if (e.target.tagName = 'LI') {
        pageA[pageNum-1].className = 'none';
        pageNum = parseInt(e.target.textContent);
        e.target.className = 'active';
        console.log(e.target.textContent);
      
        showTen(pageNum, filtered, result)
    }
});
searchInput.addEventListener('click', (e) => {
    if (searchInput.value === 'search for students...') {
        searchInput.value = '';
        searchInput.style.color = 'black';
    }
    
});

searchButton.addEventListener('mouseover', (e) => {
   if (searchInput.value === '') {
    searchInput.value = 'search for students...';
    searchInput.style.color = 'lightgrey';
    }
});


function displayResults(eval) {
    const filterSearch = Array.prototype.filter;
    result = filterSearch.call(liStudents, function(fil) {
        return fil.textContent.indexOf(eval) >= 0;
    });
    //print('<p>No matching results found, please try again or refresh page to browse list.</p>');
   
    console.log(eval);
    if (result[0]) {
        noresults.style.display = 'none';
        filtered = true;
        showTen(1, filtered, result);
        /*
        for (let i = 0; i < liStudents.length; i += 1) {
        liStudents[i].style.display = 'none';
        }
        for (let i = 0; i < pageLi.length; i += 1) {
            pageLi[i].style.display = 'none';
        }
        numPages = Math.ceil(result.length / 10);
        for (let i = 0; i < numPages; i += 1) {
            pageLi[i].style.display = 'block';
        }
        for (let i = 0; i < result.length; i += 1) {
        result[i].style.display = "block"
        */
    
    } else {
        //filtered = false 
        //hide all students
        for (let i = 0; i < liStudents.length; i +=1) {
            liStudents[i].style.display = 'none';
        }
        for (let i = 0; i < pageLi.length; i += 1) {
            pageLi[i].style.display = 'none';
        }
       noresults.style.display = 'block';
       console.log('test')
    }
}


searchButton.addEventListener('click', (e) => {
    displayResults();
});
searchInput.addEventListener('search', (e) => {
    displayResults();
});
searchInput.addEventListener('keyup', (e) => {
    search = searchInput.value;
    console.log(search)
    displayResults(search);
});
