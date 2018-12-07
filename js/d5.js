
(( ) => {

	var input = document.getElementsByTagName("font")[1].innerText.slice(0, -1);

	let start = new Date().getTime();

	let react = ( input ) => {

		let reacted = input.split("");

		for ( var i = 0; ; i++ ) {
			if ( i == reacted.length - 1 ) break;

			let codeA = reacted[i].charCodeAt(0),
				codeB = reacted[i+1].charCodeAt(0);

			// If it's uppercase, we add 32 for lowercase, and
			// vice-versa. Because we know the input data is all
			// alphabetic, we don't have to worry about weird
			// characters out of alphabet bounds.
			if ( codeA == codeB + 32 || codeA == codeB - 32 ) {
				reacted.splice(i, 2);
				i = -1;
			}
		}

		return reacted.length;
	};

	console.log( "Part 1 minimum polymer length: %s", react(input) );
	console.log( "Part 1 finished in %s ms", new Date().getTime() - start);

	var lengths = [ ];

	for ( i = 65; i < 65+26; i++ ) {
		let letter = String.fromCharCode(i)
		console.time("Strip " + letter);
		let inputString = input.replace(new RegExp(letter, "ig"), "");
		console.timeEnd("Strip " + letter);

		lengths.push({ letter: letter, len: react( inputString ) });
	}

	lengths.sort( (a, b) => {
		return a.len - b.len;
	});

	console.log( "Part 2 minimum length: %s", lengths[0].len );

	let finish = new Date().getTime() - start;
	console.log( "Finished in %s ms", finish );
})( );
