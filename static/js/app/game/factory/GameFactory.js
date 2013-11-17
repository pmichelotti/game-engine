define( [ 'game/Game' ], function( Game ) {

    var GameFactory = function( options ) {

        options = options || {};

        var self = this;

        this.spriteFactory = options.spriteFactory;
        this.screenFactory = options.screenFactory;
        this.screenFlowFactory = options.screenFlowFactory;
        this.interactionFactory = options.interactionFactory;
        this.gameClockFactory = options.gameClockFactory;
        this.propertiesFactory = options.propertiesFactory;

        var makeSprites = function( spritesJson, options ) {

            var retSprites = {};

            for ( var curSpriteKey in spriteJson ) {
                retSprites[ curSpriteKey ] = self.spriteFactory.make( curSpriteJson, options );
            }

            return retSprites;

        };

        var makeScreens = function( screensJson, options ) {

            var retScreens = {};

            screensJson.forEach( function( curScreenJson ) {
                retScreens[ curScreenJson.id ] = self.screenFactory.make( curScreenJson, options );
            } );

            return retScreens;

        };

        var makeScreenFlow = function( screenFlowJson, options ) {

            return self.screenFlowFactory.make( screenFlowJson, options );

        };

        var makeInteractions = function( interactionsJson, options ) {

            var retInteractions = {};

            interactionsJson.forEach( function( curInteractionJson ) {
                retInteractions[ curInteractionJson.id ] = self.interactionFactory.make( curInteractionJson, options );
            } );

            return retInteractions;

        };

        var makeGameClocks = function( clocksJson, options ) {

            var retGameClocks = {};

            clocksJson.forEach( function( curGameClockJson ) {
                retGameClocks[ curGameClockJson.id ] = self.gameClockFactory.make( curGameClockJson, options );
            } );

            return retGameClocks;

        };

        var makeProperties = function( propertiesJson, options ) {

            return self.propertiesFactory.make( propertiesJson, options );

        };

        /**
         * Builds and returns a new Game object based on a JSON Game Definition.
         */
        this.make = function( gameJson ) {

            var gameOptions = {};

            gameOptions[ 'sprites' ] = makeSprites( gameJson.sprites, gameOptions );
            gameOptions[ 'interactions' ] = makeInteractions( gameJson.interactions, gameOptions );
            gameOptions[ 'screens' ] = makeScreens( gameJson.screens, gameOptions );
            gameOptions[ 'screenFlow' ] = makeScreenFlow( gameJson.screenFlow, gameOptions );
            gameOptions[ 'clocks' ] = makeGameClocks( gameJson.gameClocks, gameOptions );
            gameOptions[ 'properties' ] = makeProperties( gameJson.properties, gameOptions );

            return new Game( gameOptions );

        };

    };

    return GameFactory;

} );