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
    };

} );