define( [ 'sprite/Sprite' ], function( Sprite ) {

    /**
     * 
     * A Sprite's JSON representation will take the following form
     * 
     * <ul>
     * <li>id : The String ID of the Sprite</li>
     * <li>image : The name of the Image asset representing the Sprite</li>
     * <li>frames : An array of Frame Definitions</li>
     * </ul>
     * 
     * A Frame Definition will take the following form
     * 
     * <ul>
     * <li>id : The String ID of the Sprite Frame</li>
     * <li>width : The width of the frame in the context of the Sprite's image</li>
     * <li>height : The height of the frame in the context of the Sprite's image</li>
     * <li>position : A position object representing the top left of the Sprite frame in the context of the Sprite's
     * image</li>
     * </ul>
     */
    var SpriteFactory = function() {

        this.make = function( spriteJson ) {

            return new Sprite( spriteJson.id, spriteJson );

        };

    };

    return SpriteFactory;

} );