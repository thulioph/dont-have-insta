var APP  = APP || {};

APP.Instagran = {
  _currentScreen: null,

  setUp : function() {
    var that = this;

    that.Instructions();
    that.LoadApplication();
  },
  LoadApplication : function() {
    var that = this,
        previousTag = input = value = tag = null,
        form  = document.querySelector('.form-instagram');

    form.addEventListener('submit', function(event) {
      input = document.querySelector('#tag');
      value   = input.value;
      tag = value.replace(/\s+/g, '');

      if (tag != previousTag && that.hasWhiteSpace(tag))
        that.ResquestAPI(tag);

      previousTag = tag;

      event.preventDefault();
    });
  },
  ResquestAPI: function(tag) {
    var that = this,
        galleryContent = document.querySelector('#list-instagram'),
        wrapper = document.querySelector('#wrapper'),

        // settings variables
        accessToken = '181941196.5b9e1e6.c4df4ed6d9494b9a817be3ee7d046127',
        imageSize = "medium",
        getImagesURL = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + accessToken + '';

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: getImagesURL,
      beforeSend: function() {
        wrapper.classList.add('loading');
        if (galleryContent)
          that.ClearElement(galleryContent);
      },
      success: function(data) {
        wrapper.classList.remove('loading');
        
        if (data.data.length === 0) {
          alert("This tag don't exists :(")
        }else{
          that.CreateImages(data, imageSize);
        }
      },
      error: function() {
      }
    });
  },
  ClearElement : function(element) {
    element.innerHTML = '';
  },
  CreateImages : function(data, imageSize) {
    var imageURL = imageBlock = link = image =  null;

    var imagesContainer = document.querySelector('#list-instagram'),
        wrapper = document.querySelector('#wrapper');

    for(var i = 0; i < data.data.length ; i+=1) {
      
      switch(imageSize){
        case 'small':
          imageURL = data.data[i].images.thumbnail.url;
          break;
        case 'medium':
          imageURL = data.data[i].images.low_resolution.url;
          break;
        case 'large':
          imageURL = data.data[i].images.standard_resolution.url;
          break;
        default:
          break;
      }

      // make elements
      imageBlock = document.createElement('figure');
      link = document.createElement('a');
      image = document.createElement('img');

      // set settings
      imageBlock.classList.add('instagram-result-search');
      link.setAttribute('target', '_blank');
      link.href = data.data[i].link;
      image.src = imageURL;

      // add to nodes
      link.appendChild(image);
      imageBlock.appendChild(link);
      imagesContainer.appendChild(imageBlock);
    }

    // add GB to wrapper
    wrapper.appendChild(imagesContainer);
  },
  hasWhiteSpace : function(string) {
    if (/\s/.test(string)) {
      return 0;
    }else{
      return 1;
    }
  },
  Instructions : function(){
    $(".instructions").owlCarousel({
      navigation      : false,
      slideSpeed      : 900,
      paginationSpeed : 1000,
      singleItem      : true,
      autoPlay        : 9000,
      pagination      : true,
      stopOnHover     : true
    });
  }
};