var list = document.getElementsByTagName("pre")[0].innerHTML.split("\n")

list.splice(-1);

// NB: I wrote this script in a very train-of-thought manner, it does a lot of things in
// silly ways, for example the awake/asleep number matrices would be much easier to use if
// I inverted the values, and I do a lot of repeat iterations and iteration around non-optimal
// indices.

(( ) => {

	/*
		guard: {
			shifts: [ { shift }, ..., { shift } ]
		}

		shift: {
			date: "yyyy-mm-dd",
			awake: [ 1, 0, 1, 1, ..., 1 ]
		}
	*/

	let checkEvent = ( event ) => {

		// Start shift - look for guard id hash symbol
		if ( event.split("#").length > 1 ) return "start";

		if ( event.split("asleep").length > 1 ) return "asleep";

		return "awake";

	};

	let parseList = ( list ) => {

		let guards = { };

		let guardId = -1,
			shift = Array(60).fill( 1 ),
			awake = 1,
			minute = 0;

		for ( entry of list ) {
			switch ( checkEvent(entry) ) {
				case "start":
					// If we have an already-defined guard
					if ( guardId >= 0 ) {
						// If this guard hasn't been seen before, add him/her
						if ( ! guards[guardId] ) {
							guards[ guardId ] = { shifts: [ shift ], asleepMinuteTotals: Array(60).fill(0) }
						} else {
							// Guard has been seen before, just append this shift data to their profile
							guards[ guardId ].shifts.push( shift );
						}

						// Create a new shift array
						shift = Array(60).fill( 1 );
					}
					// Set the guard ID
					guardId = Number(entry.match(/\#([0-9]+)/)[1])
					break;
				case "asleep":
					awake = 0;
				case "awake":
					minute = new Date(Date.parse(entry.split(/[\[|\]]/)[1])).getMinutes();
					shift.fill(awake, minute);
					awake = 1;
					break;
			}

			// Write final guard entry
			if ( ! guards[guardId] ) {
				guards[ guardId ] = { shifts: [ shift ], asleepMinuteTotals: Array(60).fill(0) }
			} else {
				// Guard has been seen before, just append this shift data to their profile
				guards[ guardId ].shifts.push( shift );
			}
		}

		return guards;
	};

	// Sort list chronologically
	list.sort(( a, b ) => {
		let diff = Date.parse(a.split(/[\[|\]]/)[1]) - Date.parse(b.split(/[\[|\]]/)[1]);

		if ( diff < 0 ) {
			return -1;
		} else if ( diff > 0 ){
			return 1;
		}

		return 0;
	});

	let guardData = parseList( list );
	// const reducer = (accumulator, currentValue) => accumulator + currentValue;

	// Find which guard has the most asleep minutes
	for ( let id in guardData ) {
		let guard = guardData[id];

		guard.asleepMinutes = 0;

		// We need to sum all asleep minutes. We can do that by filtering them (I think)
		for ( shift of guard.shifts ) {
			guard.asleepMinutes += shift.filter( minute => minute === 0 ).length;
		}

	}

	// Locate guard with most asleep minutes
	let sleepyGuard = -1;

	for ( let guard in guardData ) {

		if ( sleepyGuard == -1 ) {
			sleepyGuard = guard;
		} else {
			if ( guardData[sleepyGuard].asleepMinutes < guardData[guard].asleepMinutes )
				sleepyGuard = guard;
		}

	}

	console.log("Sleepiest guard: #%s with %s minutes!", sleepyGuard, guardData[sleepyGuard].asleepMinutes);

	// Find out which minute the sleepiest guard is most reliably asleep on
	let sleepMatrix = Array( 60 ).fill( 0 );
	for ( let shift of guardData[sleepyGuard].shifts ) {
		sleepMatrix = shift.map(( num, idx ) => {
			return (num === 0) + sleepMatrix[idx];
		});
	}

	let sleepiestMinute = sleepMatrix.indexOf(Math.max(...sleepMatrix));

	console.log( "Sleepy guard most likely to be sleeping on minute %s", sleepiestMinute );
	console.log( "PART 1 RESULT: %s", sleepyGuard * sleepiestMinute );

	//
	// Part 2 - iterate per-minute
	//

	let part2solution = {
		guardId: 0,
		minute: -1,
		count: 0
	};

	for ( let i = 0; i < 60; i++ ){
		// Get the sum of asleep minutes for each guard for this minute (i.e. use i as the shift index)
		for ( let guardId in guardData ) {
			for ( shift of guardData[guardId].shifts ) {
				guardData[guardId].asleepMinuteTotals[i] += ( shift[i] === 0 );
			}

			if ( guardData[guardId].asleepMinuteTotals[i] > part2solution.count ) {
				part2solution = { guardId: guardId, minute: i, count: guardData[guardId].asleepMinuteTotals[i] };
			}
		}
	}

	console.log( Number(part2solution.guardId) * part2solution.minute );

})( );