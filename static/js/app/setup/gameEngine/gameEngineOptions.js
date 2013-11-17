define( [ 'screen/engine/ScreenEngine', 'interaction/engine/InteractionEngine', 'timing/engine/TimingEngine',
        'rendering/engine/CanvasRenderingEngine' ], function( ScreenEngine, InteractionEngine, TimingEngine,
        RenderingEngine ) {

    var gameEngineOptions = {
        screenEngine : new ScreenEngine(),
        interactionEngine : new InteractionEngine(),
        timingEngine : new TimingEngine(),
        renderingEngine : new RenderingEngine()
    };

    return gameEngineOptions;

} );
