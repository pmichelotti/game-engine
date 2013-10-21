define( [ 'game/engine/GameEngine', 'game/factory/GameFactory', 'setup/gameEngine/gameEngineOptions',
        'setup/gameFactory/gameFactoryOptions' ], function( GameEngine, GameFactory, gameEngineOptions,
        gameFactoryOptions ) {

    var gameFactory = new GameFactory( gameFactoryOptions );

    var testGame = gameFactory.make( {} );

    var gameEngine = new GameEngine( gameEngineOptions );

    gameEngine.startGame( testGame );

} );