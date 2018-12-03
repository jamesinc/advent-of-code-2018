var list = document.getElementsByTagName("pre")[0].innerHTML.split("\n")

list.splice(-1);

(( ) => {

	let getArray = ( ) => {
		
		var array =  [ ];

		for ( var i = 0; i < 1000; i++ ) {
			array.push([ ]);
			for ( var j = 0; j < 1000; j++ ) {
				array[i].push(0);
			}
		}

		return array;

	}

	let matrix = getArray();

	let addToMatrix = ( a ) => {

		for ( var i = a.x; i < Math.min(1000, a.x+a.w); i++ )
			for ( var j = a.y; j < Math.min(1000, a.y+a.h); j++ ) {
				debugger;
				matrix[i][j] += 1;
			}

	};

	let isGood = ( a ) => {

		for ( var i = a.x; i < Math.min(1000, a.x+a.w); i++ )
			for ( var j = a.y; j < Math.min(1000, a.y+a.h); j++ ) {
				if ( matrix[i][j] > 1 ) return false;
			}

		return true;

	};

	let parseList = ( list ) => {
		let outList = [ ];

		for ( claim of list ) {

			//#1 @ 1,3: 4x4
			let parts = claim.split(/\s/);

			if ( parts.length < 4 ) continue;

			let output = { };

			output["claimId"] = parts[0].substr(1);
			output["x"] = Number(parts[2].split(",")[0]);
			output["y"] = Number(parts[2].split(",")[1].split(":")[0]);
			output["w"] = Number(parts[3].split("x")[0]);
			output["h"] = Number(parts[3].split("x")[1]);

			outList.push(output);
		}

		return outList;

	}

	let parsedList = parseList(list);
	let totalOverlap = 0;

	for ( let item of parsedList ) {

		addToMatrix( item );

	}

	for ( let i = 0; i < 1000; i++ )
		for ( let j = 0; j < 1000; j++ )
			if ( matrix[i][j] > 1 ) totalOverlap += 1;


	console.log("Overlap inches: %s", totalOverlap);

	for ( let claim of parsedList ) {

		if ( isGood(claim) ) {
			return console.log( "Claim %s is good!", claim.claimId );
		}
	}
})( );