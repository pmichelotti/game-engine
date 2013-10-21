define( [], function() {

    /**
     * The Sprite represents the base sprite object. The simplest representation of a sprite is an image and a frame
     * where the frame can be set. All other Sprites build upon this base sprite.
     * 
     * @param id
     *            A unique identifier for the Sprite
     * @param options
     *            The following options are supported
     *            <ul>
     *            <li>image : A path to the image resource supporting this Sprite</li>
     *            <li>frames : Array of frame definitions for the Sprite</li>
     *            </ul>
     *            <p>
     *            A FrameDefinition is an object with the following properties:
     *            <ul>
     *            <li>id : A unique identifier for the frame</li>
     *            <li>width : The width of the frame in the sprite's image</li>
     *            <li>height : The height of the frame in the sprite's image</li>
     *            <li>position : A position object representing the top left pixel of the frame in the Sprite's image</li>
     *            </ul>
     *            </p>
     */
    var Sprite = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;

        /*
         * Path to the image asset
         */
        this.image = options.image;

        /*
         * An HtmlImageElement representing the sprite. This is populated via the load image for the sprite
         */
        this.imageElement = null;

        /*
         * A flag indicating whether the image asset has been loaded into memory
         */
        this.loaded = false;

        this.currentFrame = null;

        /*
         * A map from frame IDs to frame definition objects
         */
        this.frames = {};

        if ( options.frames && options.frames.length ) {

            /*
             * Default the current frame to the first frame
             */
            this.currentFrame = options.frames[ 0 ].id;

            options.frames.forEach( function( curFrameDefinition ) {
                self.frames[ curFrameDefinition.id ] = {
                    width : curFrameDefinition.width,
                    height : curFrameDefinition.height,
                    position : curFrameDefinition.position
                };
            } );
        }

        /**
         * Load the image asset if it is not yet loaded. When loading finishes call the provided callback passing the
         * instance of the Sprite.
         * 
         * @param callback
         *            Function taking a single Sprite parameter. This function will be called once the Sprite finishes
         *            loading.
         */
        this.load = function( callback ) {

            if ( self.loaded && callback ) {
                callback( self );
                return;
            }

            self.imageElement = document.createElement( 'img' );
            self.imageElement.src = self.image;

            self.imageElement.onload = function() {
                if ( !self.loaded ) {
                    self.loaded = true;
                    callback( self );
                    return;
                }
            };

            if ( self.imageElement.complete ) {
                self.loaded = true;
                callback( self );
                return;
            }

        };

        this.getCurrentFrame = function() {

            return self.frames[ self.currentFrame ];

        };

        this.setCurrentFrame = function( id ) {

            self.currentFrame = id;

        };

    };

    return Sprite;

} );