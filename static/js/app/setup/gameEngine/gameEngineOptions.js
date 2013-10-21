define( [ 'interaction/engine/InteractionEngine', 'timing/engine/TimingEngine' ], function( InteractionEngine,
        TimingEngine ) {

    var gameEngineOptions = {
        interactionEngine : new InteractionEngine(),
        timingEngine : new TimingEngine()
    };

    return gameEngineOptions;

} );
