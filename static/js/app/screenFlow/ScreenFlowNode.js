define( [], function() {

    var ScreenFlowNode = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;
        this.screen = options.screen;
        this.branches = options.branches;

        this.branchMap = {};

        this.branches.forEach( function( curBranch ) {

            self.branchMap[ curBranch.id ] = curBranch;

        } );
    };

    return ScreenFlowNode;

} );