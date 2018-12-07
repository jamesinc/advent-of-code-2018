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

	const getSumOfCoordsDistances = ( x, y, inputs ) => {

		let sum = 0;

		for ( let input of inputs ) {

			// Calculate distance to input
			sum += Math.abs(x - input[0]) + Math.abs(y - input[1]);

		}

		// Return the sum of all distances
		return sum;

	};


	// Map inputs list into 2D numeric array
	const inputs = list.map(x => x.split(", ").map(y => Number(y)));
	const bounds = getBounds( inputs );
	const margin = {
		h: Math.abs(bounds.xr - bounds.xl) * 2,
		v: Math.abs(bounds.yb - bounds.yt) * 2
	};
	const grid_dimensions = {
		x: (2 * margin.h) + (bounds.xr - bounds.xl),
		y: (2 * margin.v) + (bounds.yb - bounds.yt)
	};

	console.log( "Building grid of %s cells", grid_dimensions.x * grid_dimensions.y);

	// Build a giant fuckin' grid
	let grid = Array(grid_dimensions.y);
	let areaSum = 0;

	// Get the sum of distances to all points on the grid, for each cell
	for ( let y = 0; y < grid.length; y++ ) {

		grid[y] = Array(grid_dimensions.x);

		for ( let x = 0; x < grid[y].length; x++ ) {

			let distancesSum = getSumOfCoordsDistances(x - margin.h, y - margin.v, inputs);

			grid[y][x] = distancesSum;

			if ( distancesSum < 10000 ) {
				grid[y][x] = '#';
				areaSum += 1;
			} else {
				grid[y][x] = '.';
			}

		}

	}

	console.log( grid );
	console.log( "Sum of region containing all points < 10000: %s", areaSum );

})( );