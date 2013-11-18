define( [], function() {

    var CanvasRenderingEngine = function( options ) {

        options = options || {};

        var self = this;

        this.canvas = null;
        this.canvasContext = null;

        this.screenWidth = 0;
        this.screenHeight = 0;

        this.widthScale = 0;
        this.heightScale = 0;

        this.xOffset = 0;
        this.yOffset = 0;

        this.registerGame = function( game ) {

            self.canvas = document.creatElement( 'canvas' );
            self.canvas.setAttribute( 'id', 'game-canvas' );

            self.canvasContext = self.canvas.getContext( '2d' );

            /*
             * Empty the document body
             */
            var documentBody = document.getElementsByTagName( 'body' )[ 0 ];
            documentBody.innerHTML( '' );

            /*
             * Append the canvas as the only element in the document
             */
            documentBody.appendChild( self.canvas );

        };

        this.sizeCanvas = function() {

            self.canvasContext.canvas.width = window.innerWidth;
            self.canvasContext.canvas.height = window.innerHeight;

            self.setScreenScale();

        };

        this.setScreenSize = function( width, height ) {
            self.screenWidth = width;
            self.screenHeight = height;

            self.setScreenScale();
        };

        this.setScreenScale = function() {

            if ( !self.screenWidth || !self.screenHeight || !self.canvas.width || !self.canvas.height ) {
                return;
            }

            var widthRatio = self.canvas.width / self.screenWidth;
            var heightRatio = self.canvas.height / self.screenHeight;

            /*
             * If the ratio of the canvas height to the screen height is less than the same ratio of the widths, set the
             * scaling factors to the height ratio. This means that the height of the canvas should end up being the
             * entire height of the window and an x offset needs to be set. The x offset will be the window width -
             * screen width * the height ratio.
             * 
             * 
             */
            if ( widthRatio > heightRatio ) {

                self.widthScale = heightRatio;
                self.heightScale = heightRatio;

                yOffset = 0;
                xOffset = self.canvas.width - ( self.screenWidth * heightRatio );

            } else {

                self.widthScale = widthRatio;
                self.heightScale = widthRatio;

                self.xOffset = 0;
                self.yOffset = self.canvas.height - ( self.screenHeight * widthRatio );

            }
        };

        /**
         * Render the Sprite to a Position scaled and positioned relative to the scaling and offset factors established
         * for the context.
         * 
         * The Position provided is a Position relative to the Screen Size which may not be the size of the rendering
         * context. The engine will attempt to scale the context to as large a size as possible in the context of the
         * game container. As far as this engine is concerned, the container is the browser window and as such the
         * largest possible space is the entire width and height of the window.
         * 
         * The width and height of the rendering context will be scaled based on the ratio of the screen width and
         * height and the container width and height. Rendered sprites must be scaled by the same amount as well as the
         * rendered position.
         * 
         * As the aspect ratio of the screen might not match the aspect ratio of the container, in the interest of
         * centering the rendered screen in the container, there may be an offset either in the horizontal or vertical
         * aspect (but not both, at least one aspect will fill the container). The rendered position must account for
         * this offset by adding to x or y the respective offset.
         */
        this.renderSprite = function( sprite, position ) {

            var renderPosition = {
                x : ( position.x * self.widthScale ) + self.xOffset,
                y : ( position.y * self.heightScale ) + self.yOffset
            };

            var currentSpriteFrame = sprite.frames[ sprite.currentFrame ];

            var renderWidth = currentSpriteFrame.width * self.widthScale;
            var renderHeight = currentSpriteFrame.height * self.heightScale;

            self.canvasContext.drawImage( sprite.imageElement, currentSpriteFrame.position.x,
                    currentSpriteFrame.position.y, currentSpriteFrame.width, currentSpriteFrame.height,
                    renderPosition.x, renderPosition.y, renderWidth, renderHeight );

        };

        this.clear = function() {
            self.canvasContext.clearRect( 0, 0, self.canvas.width, self.canvas.height );
        };

    };

    return CanvasRenderingEngine;

} );