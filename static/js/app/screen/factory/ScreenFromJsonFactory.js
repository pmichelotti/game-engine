define( [ 'screen/factory/screenFactoryRegistry' ], function( screenFactoryRegistry ) {

    /**
     * 
     * The makeup of a screen's JSON representation is highly dependent on the screen type. The following properties are
     * common to all screen types.
     * 
     * <ul>
     * <li>id: All screens have a unique identifier</li>
     * <li>type: All screens have a type identifying the type of screen the JSON represents</li>
     * </ul>
     * 
     */
    var ScreenFactory = function( options, sprites ) {

        options = options || {};

        var self = this;

        /*
         * The screen factory registry is a mapping between strings representing screen types and the factories used to
         * construct the types from JSON.
         */
        this.screenFactoryRegistry = options.screenFactoryRegistry;

        this.make = function( screenJson ) {

            if ( screenJson.type && self.screenFactoryRegistry[ screenJson.type ] ) {
                return self.screenFactoryRegistry[ screenJson.type ].make( screenJson, sprites );
            }

            return null;

        };

    };

    return ScreenFactory;

} );