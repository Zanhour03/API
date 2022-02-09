
  $.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=CBrtc0EUb672U4KX9biDZPWLX0dIOUAF', function(data){
  var Books = data.results.books;

  Books.forEach(createCard);

  
});



function  createCard(item){
  var div = $("<div style= 'display:inline-block; margin-left:7%; margin-bottom:2%;'></div>").attr("class", "row");
  var div0 = $("<div></div>").attr("class", "col-sm-5");
  var div1 = $("<div></div>").attr("class", "card  col-md border-5 border-dark");
  var div2 = $("<div></div>").attr("class", "card-body");
  var imgDiv =$('<img >').attr({ class:"card-img-top", src:item.book_image});
  var titleDiv =$('<h5></h5>').attr({ class:"card-title"}).text(item.title);
  var authorDiv =$('<h6></h6>').attr({ class:"card-title"}).text(item.author);
  var descrDiv =$('<p></p>').attr({ class:"card-text"}).text(item.description);
  
  var buttonDiv =$('<a>Buy</a>' ).attr({ class:"btn btn-primary", href:item.amazon_product_url});


  titleDiv.appendTo(div2);
  imgDiv.appendTo(div1);
  authorDiv.appendTo(div2);
  descrDiv.appendTo(div2);
  buttonDiv.appendTo(div2)


  div2.appendTo(div1)
  div1.appendTo(div0);
  div0.appendTo(div);
  div1.css("width", "18rem");
var y = div.appendTo("body");


 

  $.get(`https://booksrun.com/api/v3/price/buy/${item.primary_isbn10}?key=zux40a2q9f2a31xjk5x8`, function(dat){
    
  const Pris = dat.result.offers.booksrun.new.price;

  var Price = (Pris == undefined) ? "Out of Stock" :  `${dat.result.offers.booksrun.new.price} $`;
  (Pris == undefined) ? $( buttonDiv ).remove() : false;

  // if(typeof(Price) == "undefined"){
  //    PriceStr  = "Out of stock";

  // }
  
  var priceDiv = $('<p id="out" style=" margin-left:5%;"></p>').attr({ class:"card-text btn btn-primary"}).text(Price);
  priceDiv.appendTo(div2);
 


  // console.log(Price);

});


  
// console.log(item.primary_isbn10)
 
  return y;
}
