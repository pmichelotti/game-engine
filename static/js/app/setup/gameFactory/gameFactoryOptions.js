define( [ 'sprite/factory/SpriteFromJsonFactory', 'screen/factory/ScreenFromJsonFactory',
        'screen/types/singleFrameScreen/factory/SingleFrameScreenFromJsonFactory',
        'screenFlow/factory/ScreenFlowFromJsonFactory', 'interaction/factory/InteractionFromJsonFactory',
        'properties/factory/GamePropertiesFromJsonFactory', 'timing/clock/ClockFactory' ],
        function( SpriteFactory, ScreenFactory, SingleFrameScreenFactory, ScreenFlowFactory, InteractionFactory,
                PropertiesFactory, ClockFactory ) {

            var screenFactoryRegistry = {};

            screenFactoryRegistry[ SingleFrameScreenFactory.type ] = new SingleFrameScreenFactory();

            var gameFactoryOptions = {
                spriteFactory : new SpriteFactory(),
                screenFactory : new ScreenFactory( {
                    screenFactoryRegistry : screenFactoryRegistry
                } ),
                screenFlowFactory : new ScreenFlowFactory(),
                interactionFactory : new InteractionFactory(),
                propertiesFactory : new PropertiesFactory(),
                gameClockFactory : new ClockFactory()
            };

            return gameFactoryOptions;

        } );