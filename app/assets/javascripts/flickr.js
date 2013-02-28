$(function(){

  $('#flickr').click(search_flickr);
  $('#clear').click(clear_photos);
});

var timer;
var index;
var photos;
var page = 1;


function search_flickr()
{

  var search = $('#search').val();
  $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0d97f48b0d7415cec53303d19ee868ea&text=' + search + '&per_page=10&page=' + page + '&format=json&jsoncallback=?', results);
}

function results(data)
{
  var sec = parseInt($('#duration').val());
  var msec = sec * 1000;
  index = 0;
  timer = setInterval(display_photo, msec);
  photos = data.photos.photo;
 // _.each(data.photos.photo, display_photo);
}


function display_photo(photo)
{
  photo = photos[index];
  var width = $('#width').val();
  var height = $('#height').val();
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  var image = $('<div>');
  image.addClass('image');
  image.css('background-image', url);
  image.css('width', width);
  image.css('height', height);
  $('#images').prepend(image);

if(index == 9)
{
page++;
search_flickr();
// clear_photos();
clearInterval(timer);
}
else{
  index++;
}

}

function clear_photos()
{
$('#images').empty();
}

