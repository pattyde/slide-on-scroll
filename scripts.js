const debounce = ( func, wait = 20, immediate = true ) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if ( !immediate ) func.apply( context, args );
		};
		var callNow = immediate && !timeout;
		clearTimeout(  timeout);
		timeout = setTimeout(  later, wait );
		if ( callNow ) func.apply( context, args );
	};
}

const sliderImages = document.querySelectorAll( '.slide-in' );

const checkSlide = () => {
	sliderImages.forEach( sliderImage => {
		//Screen position is halfway through the image
		const slideInAt = ( window.scrollY + window.innerHeight ) - ( sliderImage.height / 2 )

		//Bottom of the image
		const imageBottom = sliderImage.offsetTop + sliderImage.height;

		//Constants for if statement
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;

		isHalfShown && isNotScrolledPast ?
			sliderImage.classList.add( 'active' ) :
			sliderImage.classList.remove( 'active' );
	});
}

window.addEventListener( 'scroll', debounce( checkSlide ) );
