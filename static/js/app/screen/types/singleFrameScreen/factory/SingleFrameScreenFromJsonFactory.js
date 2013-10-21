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
         * <li>frame: The ID of the Frame of the Sprite which the screen should present</li>
         * <li>duration: The duration, in milliseconds, which the screen should be presented</li>
         * </ul>
         */
        this.make = function( screenJson, sprites ) {

            var screenOptions = {};

            screenOptions[ 'sprite' ] = sprites[ screenJson.sprite ];
            screenOptions[ 'frame' ] = screenJson.frame;
            screenOptions[ 'duration' ] = screenJson.duration;

            return new SingleFrameScreen( screenJson.id, screenOptions );

        };

    };

    ScreenFactory.type = SingleFrameScreen.id;

    return ScreenFactory;

} );