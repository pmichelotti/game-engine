define( [ 'transition/TransitionRegistry', 'screenFlow/ScreenFlow', 'screenFlow/ScreenFlowNode' ], function(
        TransitionRegistry, ScreenFlow, ScreenFlowNode ) {

    var ScreenFlowFactory = function( options ) {

        options = options || {};

        var self = this;

        var makeNodeForJson = function( nodeJson, screens ) {

            return new ScreenFlowNode( nodeJson.id, {
                screen : screens[ nodeJson.screen ]
            } );

        };

        var makeTransitionForBranch = function( branchJson ) {

            if ( !branchJson.transition ) {
                return null;
            }

            var transitionObject = {
                outType : TransitionRegistry[ branchJson.transition.outType ],
                outDuration : branchJson.transition.outDuration,
                inType : TransitionRegistry[ branchJson.transition.inType ],
                inDuration : branchJson.transition.inDuration
            };

            return transitionObject;

        };

        var makeBranchesForNode = function( nodeJson, nodes ) {

            var retBranches = {};

            if ( nodeJson.branches && nodeJson.branches.length ) {
                nodeJson.branches.forEach( function( curBranchJson ) {

                    var branchOptions = {};

                    branchOptions[ 'node' ] = nodes[ curBranchJson.node ];
                    branchOptions[ 'transition' ] = makeTransitionForBranch( curBranchJson );

                    retBranches[ curBranchJson.id ] = new ScreenFlowBranch( curBranchJson.id, branchOptions );

                } );
            }

        };

        /**
         * JSON for a Screen Flow will take the following form:
         * 
         * <ul>
         * <li>nodes: An array of Screen Flow Node definitions</li>
         * <li>rootNode: The ID of the starting or root node in the Screen Flow graph</li>
         * </ul>
         * 
         * JSON for a Screen Flow Node will take the following form:
         * 
         * <ul>
         * <li>id: A unique identifier for the Screen Flow Node</li>
         * <li>screen: The ID of the Screen which this node represents</li>
         * <li>branches: A list of Screen Flow Branch elements</li>
         * </ul>
         * 
         * JSON for a Screen Flow Branch will take the following form:
         * 
         * <ul>
         * <li>id: A unique identifer for the branch</li>
         * <li>node: The ID of the Screen Flow Node which the branch points to</li>
         * <li>transition: The transition definition for the branch</li>
         * </ul>
         * 
         * JSON for a Screen Flow Branch Transition will take the following form:
         * 
         * <ul>
         * <li>outDuration: A value, in milliseconds, representing the duration of the out transition</li>
         * <li>outType: The ID of the transition to use as the out transition</li>
         * <li>inDuration: A value, in milliseconds, representing the duration of the in transition</li>
         * <li>inType: The ID of the transition to use as the in transition</li>
         * </ul>
         */
        this.make = function( screenFlowJson, screens ) {

            var nodeMap = {};

            /*
             * Construct the nodes without branches
             */
            screenFlowJson.nodes.forEach( function( curNodeJson ) {

                nodeMap[ curNodeJson.id ] = makeNodeForJson( curNodeJson );

            } );

            /*
             * Construct the branches for each node
             */
            screenFlowJson.nodes.forEach( function( curNodeJson ) {

                nodeMap[ curNodeJson.id ].branches = makeBranchesForNode( curNodeJson, nodeMap );

            } );

            return new ScreenFlow( {

                nodes : nodeMap,
                rootNode : nodeMap[ screenFlowJson.rootNode ]

            } );

        };

    };

    return ScreenFlowFactory;

} );