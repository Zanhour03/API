//hämtar alla books  med hjälp av api och callar de för data
  $.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=CBrtc0EUb672U4KX9biDZPWLX0dIOUAF', function(data){
  // skapar en variabel Book som går in i datan results och hämtar alla 15 böcker
  var Books = data.results.books;
//skapar en foreach loop för alla böcker i funktionen creatCard
  Books.forEach(createCard);

  
});



function  createCard(item){
  //skapar div, img, paragraph, button, h1 och h5 för att kunna ha bild text i en card och de blir stylade med bootstrap och css
  var div = $("<div style= 'display:inline-block; margin-left:7%; margin-bottom:2%;'></div>").attr("class", "row");
  var div0 = $("<div></div>").attr("class", "col-sm-5");
  var div1 = $("<div></div>").attr("class", "card  col-md border-5 border-dark");
  var div2 = $("<div></div>").attr("class", "card-body");
  var imgDiv =$('<img >').attr({ class:"card-img-top", src:item.book_image});
  var titleDiv =$('<h5></h5>').attr({ class:"card-title"}).text(item.title);
  var authorDiv =$('<h6></h6>').attr({ class:"card-title"}).text(item.author);
  var descrDiv =$('<p></p>').attr({ class:"card-text"}).text(item.description);
  
  var buttonDiv =$('<a>Buy</a>' ).attr({ class:"btn btn-primary", href:item.amazon_product_url});
// end

  
  //lägger in img title athor button i divarana
  titleDiv.appendTo(div2);
  imgDiv.appendTo(div1);
  authorDiv.appendTo(div2);
  descrDiv.appendTo(div2);
  buttonDiv.appendTo(div2)
//end

  //lägger in divar in  varandra så man kan enkelt styla de och lägga de i row med hjälp av bootstrap
  div2.appendTo(div1)
  div1.appendTo(div0);
  div0.appendTo(div);
  div1.css("width", "18rem");
  
  //skriver ut diviarna i body så nu synns allt som finns innuti divarna på sidan
var y = div.appendTo("body");


 
//hämtar priserna för varenda bok med hjälp av böckerna isbn nummer och då kan den veta vilken bok ska ha vilket pris
  $.get(`https://booksrun.com/api/v3/price/buy/${item.primary_isbn10}?key=zux40a2q9f2a31xjk5x8`, function(dat){
    //skapar en const som hetter pris där den går in i den nya api och hämtar rätt priser
  const Pris = dat.result.offers.booksrun.new.price;
// om priset inte finns i api då ska den skriva Out of stock annars så ska den skriva ut priset.
  var Price = (Pris == undefined) ? "Out of Stock" :  `${dat.result.offers.booksrun.new.price} $`;
    //om priset inte finns(undifined) då ska knappen som säger buy inte finnas
  (Pris == undefined) ? $( buttonDiv ).remove() : false;


  //skapar en paragraph för skriva priset i
  var priceDiv = $('<p id="out" style=" margin-left:5%;"></p>').attr({ class:"card-text btn btn-primary"}).text(Price);
    
    //sätter in priset i en av divarna som synns på sidan så att man kan se priset
  priceDiv.appendTo(div2);
 




});


  

 
  return y;
}
