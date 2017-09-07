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
                var title = data.items[i].volumeInfo.title;
                var author = data.items[i].volumeInfo.authors[0];
                var description = data.items[i].volumeInfo.description;
                var image = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                renderBook({
                    title: title,
                    author: author,
                    description: description,
                    image: image
                });
                
            }


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


function renderBook(book) {

    var source = $('#store-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(book);
    $('.book').append(newHTML);
}

