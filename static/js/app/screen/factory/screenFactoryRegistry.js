define( [ 'screen/types/singleFrameScreen/factory/SingleFrameScreenFromJsonFactory' ], function(
        SingleFrameScreenFactory ) {

    var registry = {};

    registry[ SingleFrameScreenFactory.type ] = SingleFrameScreenFactory;

    return registry;

} );