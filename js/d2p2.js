// Assume an already-parsed list of items
var list = [ ];

// Day 2, Puzzle 2
(( ) => {
  var idLength = 26,
      targetCommonality = 25;

  for ( const item of list ) {
    for ( const compare of list ) {
      let commonality = idLength;

      for ( let i = 0; i < idLength; i++ ) {
        commonality -= ( item[i] != compare[i] );
      }

      if ( commonality == 25 ) {
        output = [ ];

        for ( let i = 0; i < idLength; i++ ) {
          if ( item[i] == compare[i] ) output.push( item[i] );
        }

        console.log( "Union of ids with commonality of %s: %s", targetCommonality, output.join("") );
        return;
      }

    }
  }
})( );
