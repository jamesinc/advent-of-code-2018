var list = document.getElementsByTagName("pre")[0].innerHTML.split("\n")

list.splice(-1);

// NB: I wrote this script in a very train-of-thought manner, it does a lot of things in
// silly ways, for example the awake/asleep number matrices would be much easier to use if
// I inverted the values, and I do a lot of repeat iterations and iteration around non-optimal
// indices.

(( ) => {

	const getBounds = ( inputs ) => {

		let bounds = {
			xl: Infinity, xr: -Infinity,
			yt: Infinity, yb: -Infinity
		}

		// Determine bounding box
		for ( let coords of inputs ) {
			bounds.xl = Math.min(bounds.xl, coords[0]);
			bounds.xr = Math.max(bounds.xr, coords[0]);
			bounds.yt = Math.min(bounds.yt, coords[1]);
			bounds.yb = Math.max(bounds.yb, coords[1]);
		}

		return bounds;

	};

	const findNearestIndex = ( x, y, inputs ) => {

		let distances = Array(inputs.length);

		for ( let i = 0; i < inputs.length; i++ ) {

			// Calculate distance to input
			distances[i] = Math.abs(x - inputs[i][0]) + Math.abs(y - inputs[i][1]);

		}

		// Sort distances list
		let sortedDistances = distances.slice().sort((a, b) => { return a - b });

		// If there is a tie for nearest neighbour, return -1,
		// otherwise return the index of the nearest neighbour.
		return ( sortedDistances[0] === sortedDistances[1] ) ? -1 : distances.indexOf(sortedDistances[0]);

	};


	// Map inputs list into 2D numeric array
	const inputs = list.map(x => x.split(", ").map(y => Number(y))),
	const bounds = getBounds( inputs );
	const margin = {
		h: Math.abs(bounds.xr - bounds.xl) * 2,
		v: Math.abs(bounds.yb - bounds.yt) * 2
	};

	const grid_dimensions = {
		x: (2 * margin.h) + (bounds.xr - bounds.xl),
		y: (2 * margin.v) + (bounds.yb - bounds.yt)
	};

	// Build a giant fuckin' grid
	let grid = Array(grid_dimensions.y);

	// Now for each point on the grid, we work out which is the closest coordinate
	// using taxicab geometry (distance is always equal to x-distance + y-distance)
	// Also we have to offset our coordinates by the margin size.
	// We store the array index of the coordinate in the grid cell.
	let counts = Array(inputs.length).fill(0);

	for ( let y = 0; y < grid.length; y++ ) {

		grid[y] = Array(grid_dimensions.x);

		// console.log( "Calculating row %s of %s", y+1, grid.length );

		for ( let x = 0; x < grid[y].length; x++ ) {
			let nearest = findNearestIndex(x - margin.h, y - margin.v, inputs);

			grid[y][x] = nearest;

			if ( nearest >= 0 ) {
				counts[ nearest ] += 1;
			}
		}

	}

	// Exclude values that touch the edges because they're probably infinite.
	for ( let i = 0; i < grid.length; i++ ) {
		if ( i == 0 || i == grid.length - 1 ) {
			for ( let j = 0; j < grid[i].length; j++ ) {
				// Remove from counts, if it's there
				if ( grid[i][j] >= 0 ) {
					counts[ grid[i][j] ] = -1;
				}
			}
		} else {
			if ( grid[i][0] >= 0 ) {
				counts[ grid[i][0] ] = -1;
			}

			if ( grid[i][grid[i].length-1] >= 0 ) {
				counts[ grid[i][grid[i].length-1] ] = -1;
			}
		}
	}

	let sortedCounts = counts.slice().sort((a, b) => { return a - b });

	console.log( "Most isolated point that has a non-infinite area: %s", sortedCounts[sortedCounts.length -1] );

})( );