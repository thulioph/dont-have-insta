var Main = {};

Main = {
	_BASEPATH: '../dist/images',
	_currentScreen: null,

	setUp: function(){
		var that = this;

		that._currentScreen = $('body').data('screen');

		if (that._currentScreen == 'home') {
			that.Instructions.slide();
			that.Instagram.createPhotos();
		}

	},

	Instagram: {
		createPhotos: function() {

		var previousTag = null,
			form  = document.getElementsByTagName('form');

		$(form).on('submit', function(event){
			var input = document.getElementById('tag'),
				wrapper = document.getElementById('wrapper'),
			 	value   = input.value,
			 	tag = value.replace(/\s+/g, '');
				// console.log('#' + tag);

				var accessToken = 'YOUR_ACCESS_TOKEN',
					limit = 20, //Limite máximo de fotos
					setSize = "medium";


				var instagram = function() {
					return {
						init: function() {
							if (tag != previousTag) {
								instagram.resetImages();
							}
							previousTag = tag;
							instagram.loadImages();
						},
						loadImages: function() {
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
									wrapper.classList.remove('loading');
									for(var i = 0; i < limit ; i+=1) {
										if(setSize == "small") {
											var size = data.data[i].images.thumbnail.url;
										} else if(setSize == "medium") {
											var size = data.data[i].images.low_resolution.url;
										} else {
											var size = data.data[i].images.standard_resolution.url;
										}
										$("#list-instagram").append("<figure><a target='_blank' href='" + data.data[i].link +"'><img src='" + size +"'/></a></figure>");
									}
								},
								error: function() {
									alert('This tag not exists!');
								}
							});
						},
						resetImages: function() {
							$("#list-instagram").empty();
						}
					}
				}();

				instagram.init();

				event.preventDefault();
		});

		}
	},

	Instructions: {
		slide: function() {
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
	}
}
