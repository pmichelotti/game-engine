define( [ 'sprite/factory/SpriteFromJsonFactory', 'screen/factory/ScreenFromJsonFactory',
        'screen/types/singleFrameScreen/factory/SingleFrameScreenFromJsonFactory',
        'screenFlow/factory/ScreenFlowFromJsonFactory' ], function( SpriteFactory, ScreenFactory,
        SingleFrameScreenFactory, ScreenFlowFactory ) {

    var screenFactoryRegistry = {};

    screenFactoryRegistry[ SingleFrameScreenFactory.type ] = new SingleFrameScreenFactory();

    var gameFactoryOptions = {
        spriteFactory : new SpriteFactory(),
        screenFactory : new ScreenFactory( {
            screenFactoryRegistry : screenFactoryRegistry
        } ),
        screenFlowFactory : new ScreenFlowFactory()
    };

    return gameFactoryOptions;

} );