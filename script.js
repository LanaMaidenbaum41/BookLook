var userData;

function grabUserData() {
    raw_user_data = $('#data').val();
    userData = raw_user_data.split(' ').join('$');
    $('#data').val('');
}
function fetch(userData) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + userData,
        success: function (data) {
            var books = [];
            console.log(data);
            for (var i = 0; i < data.items.length; i++) {
                var book = {
                    title: data.items[i].volumeInfo.title,
                    author: data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(", "): "no author",
                    description: data.items[i].volumeInfo.description ?data.items[i].volumeInfo.description:"no description available",
                    image: data.items[i].volumeInfo.imageLinks.smallThumbnail
                }
                books.push(book);
            }
            renderBooks(books);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}
// var fetch = function () {
//     $.get('https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521', {
//         success: function (data) {
//             console.log(data);
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(textStatus);
//         }
//     });
// };

// $('#search').on('click',function(){
//     fetch();
// });

$('#search').on('click', function () {
    grabUserData();
    fetch(userData);
});


function renderBooks(books) {
    $('.books').empty();
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    books.forEach(function (book) {
        var newHTML = template(book);
        $('.books').append(newHTML);
    });
}

function searchSelection(){
   var textVal = $(this).val();
   $('.dropdown-toggle').val(textVal);
}
// $('.dropdown-menu').on('click','li',function(){

// })

function renderSingleBook(book){
    $('.books').empty();
    var source = $('#book-details-template').html();
    var template = Handlebars.compile(source);
    
    var newHTML = template(book);
    $('.books').append(newHTML);
    
}

$('.booklist').on('click','a',function(){
    console.log(this);

});
