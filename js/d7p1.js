var list = document.getElementsByTagName("pre")[0].innerHTML.split("\n")

list.splice(-1);

// NB: I wrote this script in a very train-of-thought manner, it does a lot of things in
// silly ways, for example the awake/asleep number matrices would be much easier to use if
// I inverted the values, and I do a lot of repeat iterations and iteration around non-optimal
// indices.

(( ) => {

	let stepIds = [ ];

	const parseList = ( list ) => {

		let output = { };

		for ( let step of list ) {
			let stepId = step.substr(5, 1);
			let next = step.substr(36, 1);

			// If stepId exists, add to tree, otherwise create
			if ( typeof output[stepId] == "object" ) {
				output[stepId].next.push( next );
			} else {
				output[stepId] = { next: [ next ] };
			}

			if ( stepIds.indexOf( stepId ) < 0 )
				stepIds.push( stepId );
		}

		console.log( stepIds );

		return output;

	};

	const items = parseList( list );

	// Find first step
	for ( let step in items ) {
		console.log( "Thing: ", items[step].next );
		for ( let n of items[step].next ) {
			if ( stepIds.indexOf(n) >= 0 )
				stepIds.splice( stepIds.indexOf(n), 1 );
		}
	}

	console.log( "First step: ", stepIds );

})( );