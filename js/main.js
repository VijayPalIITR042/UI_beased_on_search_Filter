var data=[
  {
    itemId: 1,
    bookTitle: 'five point some one',
    author: 'Chetan Bhagat',
    price: 7250,
    category: 'Fiction',
    releaseDate: '2011-04-11'
  },
  {
    itemId: 2,
    bookTitle: 'Ramayan',
    author: 'Valmiki',
    price: 7000,
    category: 'Religious',
    releaseDate: '2011-05-11'
  },
  {
    itemId: 3,
    bookTitle: 'Mahabharat',
    author: 'Ved Vyas',
    price: 6800,
    category: 'Religious',
    releaseDate: '2011-06-11'
  },
  {
    itemId: 4,
    bookTitle: 'Kuran',
    author: 'Mohammad',
    price: 9000,
    category: 'Religious',
    releaseDate: '2011-04-1'
  },
  {
    itemId: 5,
    bookTitle: 'Bible',
    author: 'Jesus christ',
    price: 8500,
    category: 'Religious',
    releaseDate: '2011-07-1'
  },
  {
    itemId: 6,
    bookTitle: 'Three mistakes of my life',
    author: 'Chetan Bhagat',
    price: 4000,
    category: 'Fiction',
    releaseDate: '2011-11-20'
  },
  {
    itemId: 7,
    bookTitle: 'Success Mantra',
    author: 'Kailash',
    price: 250,
    category: 'Non-Fiction',
    releaseDate: '2011-10-21'
  },
  {
    itemId: 8,
    bookTitle: 'One girl dream',
    author: 'Chetan Bhagat',
    price: 750,
    category: 'Fiction',
    releaseDate: '2011-12-31'
  }
];

var sortByList=['Release date','Price'];
var authorList = ['Chetan Bhagat','Jesus christ','Mohammad','Ved Vyas','Kailash'];
var categoryList = ['Fiction','Religious', 'Non-Fiction'];

function loadData(){
	rendorSortByOptions(sortByList);
	rendorAuthorOptions(authorList);
	rendorCategoryOptions(categoryList);
	rendorCards(data);
	bindEvents();
}

function rendorSortByOptions(sortByList){
	var sortByDiv = document.getElementById("sortBy");
	var selectTag = document.createElement("SELECT");
	selectTag.setAttribute("id","sortBySel");
	for(var i=0; i<sortByList.length; i++){
		var optionTag = document.createElement("OPTION");
		optionTag.innerHTML = sortByList[i];
		selectTag.appendChild(optionTag);
	}
	sortByDiv.appendChild(selectTag);
}

function rendorAuthorOptions(authorList){
	var authorDiv = document.getElementById("author");
	var selectTag = document.createElement("SELECT");
	selectTag.setAttribute("id","authorSel");
	for(var i=0; i<authorList.length; i++){
		var optionTag = document.createElement("OPTION");
		optionTag.innerHTML = authorList[i];
		selectTag.appendChild(optionTag);
	}
	authorDiv.appendChild(selectTag);
}

function rendorCategoryOptions(categoryList){
	var categoryDiv = document.getElementById("category");
	var selectTag = document.createElement("SELECT");
	selectTag.setAttribute("id","categorySel");
	for(var i=0; i<categoryList.length; i++){
		var optionTag = document.createElement("OPTION");
		optionTag.innerHTML = categoryList[i];
		selectTag.appendChild(optionTag);
	}
	categoryDiv.appendChild(selectTag);
}

function rendorCards(dataToRender){
	var cardContainer = document.getElementById("cards");
	while (cardContainer.firstChild) {
    	cardContainer.removeChild(cardContainer.firstChild);
	}
	for(var i=0; i<dataToRender.length; i++){
		var card = document.createElement("DIV");
		card.setAttribute("class", "col-md-4 col-sm-6 col-xs-12 card");
		var bookTitleDiv = document.createElement("DIV");
		var authorDiv = document.createElement("DIV");
		var priceDiv = document.createElement("DIV");
		var categoryDiv = document.createElement("DIV");
		var dateDiv = document.createElement("DIV");
		var buyBtn = document.createElement("BUTTON");

		bookTitleDiv.setAttribute("class","col-md-12 col-sm-12 col-xs-12 bookTitle");
		authorDiv.setAttribute("class","col-md-12 col-sm-12 col-xs-12");
		priceDiv.setAttribute("class","col-md-12 col-sm-12 col-xs-12");
		categoryDiv.setAttribute("class","col-md-12  col-sm-12 col-xs-12");
		dateDiv.setAttribute("class","col-md-12 col-sm-12 col-xs-12");
		buyBtn.setAttribute("class","col-md-3 col-sm-3 col-xs-3 btn btn-primary");

		bookTitleDiv.innerHTML=dataToRender[i].bookTitle;
		authorDiv.innerHTML='Author: ' + dataToRender[i].author;
		priceDiv.innerHTML= 'Rs. ' + dataToRender[i].price;
		categoryDiv.innerHTML='Category: ' + dataToRender[i].category;
		dateDiv.innerHTML='Book Release Date: ' + dataToRender[i].releaseDate;
		buyBtn.innerHTML = "Buy";

    	buyBtn.addEventListener('click', (function(i) {
    		return function() {
    			console.log(dataToRender[i].bookTitle);
    			var w = window.open('../assignment/message.html?'+dataToRender[i].bookTitle,'_blank');
    			w.message = dataToRender[i].bookTitle;
    		};
  		})(i));

		card.appendChild(bookTitleDiv);
		card.appendChild(authorDiv);
		card.appendChild(priceDiv);
		card.appendChild(categoryDiv);
		card.appendChild(dateDiv);
		card.appendChild(buyBtn);

		cardContainer.appendChild(card);
	}
}

function bindEvents(){
	var searchBox = document.getElementById("searchCriteria");
	var authorSel = document.getElementById("authorSel");
	var categorySel = document.getElementById("categorySel");
	var sortBySel = document.getElementById("sortBySel");

	searchBox.addEventListener('keyup', search);
	authorSel.addEventListener("change", function() {
		filterAuthorBased(authorSel.value);
	});
	categorySel.addEventListener("change", function() {
		filterCategoryBased(categorySel.value);
	});
	sortBySel.addEventListener("change", function() {
		sortBasedData(sortBySel.value);
	});
}

// ignore till 3 characters
function search(){
	var keydata = this.value.toLowerCase();
	if(this.value.length >=3){
		copyData = data.slice();
		copyData = copyData.filter(function(obj){
			if(obj.bookTitle.toLowerCase().indexOf(keydata) > -1) {
				return obj;
			}
		});
		rendorCards(copyData);
	}
	else{
		rendorCards(data);	
	}
}

function filterAuthorBased(author){
	copyData = data.slice();
		copyData = copyData.filter(function(obj){
			if(obj.author.indexOf(author) > -1) {
				return obj;
			}
		});
	rendorCards(copyData);
}

function filterCategoryBased(category){
	copyData = data.slice();
		copyData = copyData.filter(function(obj){
			if(obj.category.indexOf(category) > -1) {
				return obj;
			}
		});
	rendorCards(copyData);
}

// Loweset to highest 
function sortBasedData(sortBy){
	copyData = data.slice();
	if(sortBy === 'Price'){
		copyData = copyData.sort(function mycomparator(a,b) {
  			return a.price - b.price;
		});	
	}
	else if(sortBy === 'Release date'){
		copyData = copyData.sort(function mycomparator(a,b) {
  			return Date.parse(a.releaseDate) - Date.parse(b.releaseDate);
		});
	}
	
	rendorCards(copyData);
}

function loadMsg(){
	var msgContainer = document.getElementById("msgContainer");
    var book=decodeURIComponent(location.search.substring(1));
    var msg = "You have bought book " + book;
    msgContainer.innerHTML = msg;
}