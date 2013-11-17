define( [ 'game/Game' ], function( Game ) {

    var GameFactory = function( options ) {

        options = options || {};

        var self = this;

        this.spriteFactory = options.spriteFactory;
        this.screenFactory = options.screenFactory;
        this.screenFlowFactory = options.screenFlowFactory;
        this.interactionFactory = options.interactionFactory;

        var makeSprites = function( spritesJson, options ) {

            var retSprites = {};

            for ( var curSpriteKey in spriteJson ) {
                retSprites[ curSpriteKey ] = self.spriteFactory.make( curSpriteJson, options );
            }

            return retSprites;

        };

        var makeScreens = function( screensJson, options ) {

            var retScreens = {};

            for ( var curScreenKey in screensJson ) {

                retScreens[ curScreenKey ] = self.screenFactory.make( curScreenJson, options );

            }

            return retScreens;

        };

        var makeScreenFlow = function( screenFlowJson, options ) {

            return screenFlowFactory.make( screenFlowJson, options );

        };

        var makeInteractions = function( interactionsJson, options ) {

            var retInteractions = {};

            for ( var curInteractionKey in interactionsJson ) {

                retInteractions[ curInteractionKey ] = self.interactionFactory.make(
                        interactionsJson[ curInteractionKey ], options );

            }

            return retInteractions;

        };

        var makeGameClocks = function( clocksJson, options ) {

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

            return new Game( gameOptions );

        };

    };

    return GameFactory;

} );