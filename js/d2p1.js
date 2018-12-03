// Assume an already-parsed list of items
var list = [ ];

// Day 2, Puzzle 1
(( ) => {
  let count2 = 0,
      count3 = 0,
      counts;

  for ( const item in list ) {
    counts = { }, counted = { 2: 0, 3: 0 };
    for ( var i = 0; i < item.length; i++ ) {
      if ( typeof counts[item[i]] != "undefined" ) {
        counts[item[i]] += 1;
      } else {
        counts[item[i]] = 1;
      }
    }
    
    for ( var c in counts ) {
      if ( !counted[2] && counts[c] == 2 ) counted[2] = count2 += 1;
      if ( !counted[3] && counts[c] == 3 ) counted[3] = count3 += 1;
    }
  });

  console.log( "Checksum: %s", count2 * count3 );
})( );
