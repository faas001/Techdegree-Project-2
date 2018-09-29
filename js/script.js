/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

const ulList = document.querySelector('.student-list');
const liStudents = ulList.children
let numPages = Math.ceil(liStudents.length / 10); 
console.log(liStudents)



for (let i = 0; i < liStudents.length; i +=1) {
    console.log(liStudents[i].textContent);
}



//print function saved from the Treehouse course and modified to target div id
function print(message) {
    var outputDiv = document.getElementById('student-list');
    outputDiv.innerHTML = message;
  }

  // Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four

function showTen (page) {
    for (let i = 0; i < liStudents.length; i +=1) {
        liStudents[i].style.display = 'none';
        
    }
    
        page = parseInt(page) * 10;
    
    for (let i = page - 10; i < page; i +=1) {
        if (i === liStudents.length) {
            break;
        } else {
            liStudents[i].style.display ='block';
        }
        
        
    }
}

//set the list to display first page on initial load
let pageNum = 1;
showTen(pageNum);

// Create and append the pagination links - Creating a function that can do this is a good approach
    const divPage = document.querySelector('.page');
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    const pageLi = [];
   // pageLi.className = '.pagination li';

    divPage.appendChild(paginationDiv);
    const pageA = [];
   // pageA.className = '.pagination li a';  
  

function createEle (){
    
    
    for (let i = 0; i < numPages; i +=1) {
        pageLi[i] = document.createElement('li');
       // pageLi[i].textContent = i+1;
        pageA[i] = document.createElement('a');
        
        pageA[i].href = '#';
        pageA[i].textContent = i+1;
        pageLi[i].appendChild(pageA[i]);
       // divPage.appendChild(paginationDiv);
        paginationDiv.appendChild(pageLi[i]);
    }
    
}

createEle();
pageA[0].className = 'active';
// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

paginationDiv.addEventListener ('click', (e) => {
    if (e.target.tagName = 'LI') {
        pageA[pageNum-1].className = 'none';
        pageNum = parseInt(e.target.textContent);
        console.log(e.target.textContent);
        //for (let i = 0; i < pageNum; i += 1) {
        //    pageA[i].className = 'none'; 
        //}
        e.target.className = 'active';
      //  pageLi[pageNum].style.color = "yellow";
       // pageLi[pageNum].style.border = 'medium solid steelblue'
        showTen(e.target.textContent)
    }
});





