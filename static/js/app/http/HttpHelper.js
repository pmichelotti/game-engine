define( [], function() {

    var HttpHelper = function() {

        this.getJson = function( url, callback ) {

            var request = new XMLHttpRequest();

            request.onload = function() {

                var loadedJson = JSON.parse( this.responseText );
                callback( loadedJson );

            };

            request.open( 'get', url, true );
            request.send();

        };

    };

    return HttpHelper;

} );
