/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
 * work in progess version of the "Exceeds Expectations" FSJS project 2
 * 
 * -------------> Still need to clean up code and add more comments <------------
 * 
 * ---------> Also need to do a logic parse of the code as I'm certain I have redundant and/or syntax that is technically correct but code is never called/used/needed
 * ---> I probably rely too much on global variables and could do to look into limiting the scope and passing/returning values to/from functions I need
 * 
 * ---> I have console.log statements sprinkled through out that I plan to leave in for future reference during my learning journey.
 * 
 */


// Add variables that store DOM elements you will need to reference and/or manipulate

// Below is a rather long list of variables/DOM elements used to dynamically create and initialize on page load.
const ulList = document.querySelector('.student-list');
const liStudents = ulList.children
const divPage = document.querySelector('.page');

// vvv Create HTML elements for navigation links -- might not need to globaly define these
const paginationDiv = document.createElement('div');
paginationDiv.className = 'pagination';
paginationUl = document.createElement('ul');
paginationDiv.appendChild(paginationUl);
divPage.appendChild(paginationDiv);
const pageLi = [];
const pageA = []; 

//vvv These I may be able to nest into search function scope
let filtered = false;
let result = [];
let search = '';

// math to determine intial number of pagination links to display
let numPages = Math.ceil(liStudents.length / 10); 
console.log(liStudents)

// variable to store current page number clicked
let pageNum = 1;

// create the HTML element to to display if no results are returned when using search feature
const noresult = document.createElement('p');
    noresult.id = "noresults"
    noresult.textContent = 'No results found, please try again.';
    divPage.appendChild(noresult);
    noresult.style.display = 'none';
const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search'
const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'search for students...';
const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
document.querySelector('.page-header').appendChild(searchDiv);
  

// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four

function showTen (page, filtered, filterResult) {
    // Hide all the items in Student list from HTML index
    for (let i = 0; i < liStudents.length; i +=1) {
        liStudents[i].style.display = 'none';
    }
    
    // set page to equal the upper limit of what needs to be displayed based on what page link was clicked
    page = parseInt(page) * 10;

    //  if filtered is false it displays the 10 values on the current page link clicked
    //  else the below will determine the number of pages for searched value and reset/recreate the pagination links
    //  and display the list values the search results array wit the ability to navigate back/forth between pages 
    if (! filtered) {
        for (let i = page - 10; i < page; i +=1) {
            if (i === liStudents.length) {
                break;
            } else {
                liStudents[i].style.display ='block';
            }       
        }
      } else {    
        numPages = Math.ceil(filterResult.length / 10);
        paginationUl.innerHTML = '';
        createPageEle('li','a', numPages);
        pageA[pageNum-1].className = 'active';
        for (let i = page - 10; i < page; i += 1) {
            if (i === filterResult.length) {
                break;
            } else {
                filterResult[i].style.display = "block";
            }       
        
        }    
    }
}



// Below creates the pagination elements to insert dynamically into HTML
function createPageEle (li,a, page) {
       
    for (let i = 0; i < numPages; i +=1) {
        pageLi[i] = document.createElement(li);
        pageA[i] = document.createElement(a);
        
        pageA[i].href = '#';
        pageA[i].textContent = i+1;
        pageLi[i].appendChild(pageA[i]);
       
        paginationUl.appendChild(pageLi[i]);
    }
    pageA[pageNum-1].className = 'active';
}

//set the list to display first page of 10 on initial load as well as create pagination navigation links
showTen(pageNum,filtered,result);
createPageEle('li','a', pageNum);


// this function is used for the the Search input --- much googling was needed to get this working but I eventually learned/remembered
// the difference between Nodelist's and Arrays.  A lot of MDN reading/searching other answers
function displayResults(eval) {
    const filterSearch = Array.prototype.filter;
    result = filterSearch.call(liStudents, function(fil) {
        return fil.textContent.indexOf(eval) >= 0;
    });
     
    console.log(eval);

    //if result filter returns a value it will call the showTen function and pass the result to be displayed
    //else it will hide list / pagination links and display the No results HTML message
    if (result[0]) {
        noresults.style.display = 'none';
        filtered = true;
        pageNum = 1;
        pageA[0].className = 'active';
        showTen(1, filtered, result);
        
    } else { 
        for (let i = 0; i < liStudents.length; i +=1) {
            liStudents[i].style.display = 'none';
        }
        for (let i = 0; i < pageLi.length; i += 1) {
            pageLi[i].style.display = 'none';
        }
       noresults.style.display = 'block';
    }
}

// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

//Below event handler will set the current page and update the display status as appropriate to navigate complete and/or filtered lists
paginationUl.addEventListener ('click', (e) => {
    console.log('page# ', pageNum);
    console.log('pre e.target.text# ', e.target.textContent);
   if (e.target.textContent > 0 && e.target.textContent <= numPages) {
        pageA[pageNum-1].className = 'none';
        pageNum = parseInt(e.target.textContent);
        e.target.className = 'active';
        console.log(e.target.textContent);
      
        showTen(pageNum, filtered, result);
    }     
});

searchButton.addEventListener('click', (e) => {
    displayResults(searchInput.value);
});
searchInput.addEventListener('keyup', (e) => {
    console.log(searchInput.value);
    displayResults(searchInput.value);   
});
