define( [ 'game/engine/GameEngine', 'game/factory/GameFactory', 'setup/gameEngine/gameEngineOptions',
        'setup/gameFactory/gameFactoryOptions', 'http/HttpHelper' ], function( GameEngine, GameFactory,
        gameEngineOptions, gameFactoryOptions, HttpHelper ) {

    var gameFactory = new GameFactory( gameFactoryOptions );

    HttpHelper.get( url, function( gameJson ) {

        var loadedGame = gameFactory.make( gameJson );
        var gameEngine = new GameEngine( gameEngineOptions );
        gameEngine.startGame( loadedGame );

    } );

} );