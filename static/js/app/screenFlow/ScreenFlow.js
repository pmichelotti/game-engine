define( [], function() {

    var ScreenFlow = function( options ) {

        options = options || {};

        var self = this;

        /*
         * A map of String ids to Screen Flow Node objects
         */
        this.nodes = options.nodes;

        /*
         * The Root or starting Screen Flow Node object representing the starting point of the Screen Flow
         */
        this.rootNode = options.rootNode;

        this.currentNode = null;

        this.start = function() {
            self.currentNode = self.rootNode;
        };

        this.getCurrentScreen = function() {
            if ( self.currentNode ) {
                return self.currentNode.screen;
            }
        };

        /**
         * Advance the ScreenFlow instance to the next screen in the tree depending on the branchID provided. If no ID
         * is provided then the flow advances to the first node represented in the current node's branch set. If an ID
         * is provided which is not represented in the current node's branch set, an exception is thrown. This should
         * cause the game to fail completely as it represents a logical error in the game programming / definition and
         * needs to be caught as early in the game development cycle as possible.
         * 
         * TODO: Determine what should be done if this method is called on a node which has no branches
         */
        this.nextScreen = function( branchId ) {

            if ( self.currentNode && self.currentNode.branches.length ) {
                if ( branchId ) {
                    /*
                     * Fail completely if a branch ID comes in that's not represented in the nodes current branch set as
                     * this represents a logic failure in the game's rules.
                     */
                    if ( !self.currentNode.branchMap( branchId ) ) {
                        throw "No such branch " + branchId + " for node " + self.currentNode.id;
                    }
                    self.currentNode = self.currentNode.branchMap( branchId );

                    return self.getCurrentScreen();
                } else {
                    self.currentNode = self.currentNode.branches[ 0 ];

                    return self.getCurrentScreen();
                }
            }
        };

    };

    return ScreenFlow;

} );