define( [ 'screen/types/singleFrameScreen/SingleFrameScreen' ], function( SingleFrameScreen ) {

    var ScreenFactory = function() {

        var self = this;

        /**
         * 
         * The single frame screen's JSON representation takes the following form
         * 
         * <ul>
         * <li>id</li>
         * <li>type</li>
         * <li>sprite: The ID of the Sprite to be used in this screen</li>
         * <li>size: A size object containing a width and a height property</li>
         * <li>frame: The ID of the Frame of the Sprite which the screen should present</li>
         * <li>duration: The duration, in milliseconds, which the screen should be presented</li>
         * <li>bypassInteraction: The ID of the interaction to use when bypassing the screen</li>
         * </ul>
         */
        this.make = function( screenJson, options ) {

            var screenOptions = {};

            screenOptions[ 'sprite' ] = options.sprites[ screenJson.sprite ];

            if ( screenOptions[ 'sprite' ] ) {
                screenOptions[ 'frame' ] = screenOptions[ 'sprite' ].frames[ screenJson.frame ];
            } else {
                screenOptions[ 'frame' ] = null;
            }

            screenOptions[ 'duration' ] = screenJson.duration;

            screenOptions[ 'size' ] = screenJson.size;

            screenOptions[ 'bypassInteraction' ] = options.interactions[ screenJson.bypassInteraction ];

            return new SingleFrameScreen( screenJson.id, screenOptions );

        };

    };

    ScreenFactory.type = SingleFrameScreen.id;

    return ScreenFactory;

} );