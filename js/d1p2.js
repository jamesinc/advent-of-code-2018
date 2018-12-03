// Assume an already-parsed list of items
var list = [ ];

// Day 1, Puzzle 2
(( ) => {
  let result = 0,
      results = { 0: 1 },
      found = false;

  while ( true ) {
    for ( const op of list ) {
      result += Number(op);

      if ( results[result] ) {
        console.log( "%s appears twice", result );
        return;
      }

      results[result] = 1;
    }
  }
})( );
