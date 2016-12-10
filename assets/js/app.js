require( './../css/app.scss' );

////

class Elem
{
	constructor( selector )
	{
		this.selector = selector;
		this.elem = document.querySelector( selector );
	}

	changeMargin( value )
	{
		this.elem.style.margin = value;
	}

	changePadding( value )
	{
		this.elem.style.padding = value;
	}

	changeColor( value )
	{
		this.elem.style.color = value;
	}

	changeBackgroundColor( value )
	{
		this.elem.style.backgroundColor = value;
	}
}

////

let elem = new Elem( '.main' );
elem.changePadding( '2rem' );
elem.changeMargin( '1rem' );
elem.changeColor( '#ddd' );
elem.changeBackgroundColor( '#06d' );

////

// necessary for hot reloading
if ( module.hot )
{
	module.hot.accept();
	//module.hot.dispose( function () {});
}
