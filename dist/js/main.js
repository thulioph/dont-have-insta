;(function(window, undefined) {

    window.InstagramApp = window.InstagramApp || {};

	window.InstagramApp = {

		_BASEPATH: '../dist/images',
		_currentScreen: null,

		init: function(){

			this._currentScreen = document.body.getAttribute('data-screen');

			if ( this._currentScreen === 'home' ) {
				this.slide();
				this.triggerLoadImages();
			}
		},

		triggerLoadImages: function() {
			var form  = document.querySelector('.form-instagram'),
                that = this;

			$(form).on('submit', function(event){
                    that.getImages();
					event.preventDefault();
			});

		},

        getImages: function() {
            var that = this,
                input = document.getElementById('tag'),
                wrapper = document.getElementById('wrapper'),
                value   = input.value,
                tag = value.replace(/\s+/g, ''),
                accessToken = 'YOUR_ACCESS_TOKEN';

            var getImagesURL = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + accessToken + '';

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: getImagesURL,
                beforeSend: function() {
                    wrapper.classList.add('loading');
                },
                success: function(data) {
                    that.renderView(data);
                },
                error: function() {
                    alert('This tag does not exist!');
                }
            });
        },

        renderView: function(data) {
            var wrapper = document.getElementById('wrapper'),
                limit = 20, //Limite máximo de fotos
                setSize = "medium";

            var size,
                elList = document.getElementById('list-instagram');

            wrapper.classList.remove('loading');

            for( var i = 0; i < limit ; i+=1 ) {
                if( setSize === "small" ) {
                    size = data.data[i].images.thumbnail.url;
                } else if( setSize == "medium" ) {
                    size = data.data[i].images.low_resolution.url;
                } else {
                    size = data.data[i].images.standard_resolution.url;
                }
                $(elList).append("<figure><a target='_blank' href='" + data.data[i].link +"'><img src='" + size +"'/></a></figure>");
            }
        },

        slide: function() {
            var elInstructions = document.querySelector('.instructions')

            $(elInstructions).owlCarousel({
                navigation      : false,
                slideSpeed      : 900,
                paginationSpeed : 1000,
                singleItem      : true,
                autoPlay        : 9000,
                pagination      : true,
                stopOnHover     : true
            });
        }
	}
})(window);