define( [ 'game/Game' ], function( Game ) {

    var GameFactory = function( options ) {

        options = options || {};

        var self = this;

        this.spriteFactory = options.spriteFactory;
        this.screenFactory = options.screenFactory;
        this.screenFlowFactory = options.screenFlowFactory;

        var makeSprites = function( spritesJson ) {

            var retSprites = spritesJson.map( function( curSpriteJson ) {

                return self.spriteFactory.make( curSpriteJson );

            } );

            return retSprites;

        };

        var makeScreens = function( screensJson, sprites ) {

            var retScreens = screensJson.map( function( curScreenJson ) {

                return self.screenFactory.make( curScreenJson, sprites );

            } );

            return retScreens;

        };

        var makeScreenFlow = function( screenFlowJson, screens ) {

            return screenFlowFactory.make( screenFlowJson, screens );

        };

        /**
         * Builds and returns a new Game object based on a JSON Game Definition.
         */
        this.make = function( gameJson ) {

            var gameOptions = {};

            gameOptions[ 'sprites' ] = makeSprites( gameJson.sprites );

            var spriteMap = {};

            gameOptions[ 'sprites' ].forEach( function( curSprite ) {
                spriteMap[ curSprite.id ] = curSprite;
            } );

            gameOptions[ 'screens' ] = makeScreens( gameJson.screens, spriteMap );

            var screenMap = {};

            gameOptions[ 'screens' ].forEach( function( curScreen ) {
                screenMap[ curScreen.id ] = curScreen;
            } );

            gameOptions[ 'screenFlow' ] = makeScreenFlow( gameJson.screenFlow, screenMap );

            return new Game( gameOptions );

        };

    };

    return GameFactory;

} );