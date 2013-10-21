define(
        [],
        function() {

            var KEY_EVENT_INTERACTION_TYPE = 'key-event';

            var InteractionEngine = function( options ) {

                options = options || {};

                var self = this;

                this.keyCodeInteractionMap = {};
                this.keyInteractionTypeMap = {
                    "keydown" : "start",
                    "keyup" : "stop",
                    "keypress" : "execute"
                };

                /**
                 * Inspects a provided Game object's interaction list. This Engine expects interactions to be stored
                 * under an 'interactions' key and for those interactions to be in an array. Each interaction should
                 * have at least the following properties:
                 * 
                 * <ul>
                 * <li>id : A unique identifier for the abstract interaction type</li>
                 * <li>mappings : An array of interaction mappings</li>
                 * </ul>
                 * 
                 * An Interaction Mapping in turn should have at least the following properties:
                 * 
                 * <ul>
                 * <li>type : The type of interaction to react to. Currently only key-event is supported. In the future
                 * mouse-event or other event types on mobile devices (movement, tilt, etc) may be supported</li>
                 * <li>identifier : The value of identifier is based on the type. For key-event mappings the identifier
                 * will be the keyCode associated with the concrete Event</li>
                 * </ul>
                 */
                this.registerGame = function( game ) {
                    if ( !game || !game.interactions ) {
                        return;
                    }

                    self.keyCodeInteractionMap = {};

                    game.interactions
                            .forEach( function( curInteractionDefinition ) {

                                if ( curInteractionDefinition.id && curInteractionDefinition.mappings
                                        && curInteractionDefinition.mappings.length ) {

                                    curInteractionDefinition.mappings
                                            .forEach( function( curInteractionMappingDefinition ) {

                                                /*
                                                 * Handle keyboard event mappings
                                                 */
                                                if ( curInteractionMappingDefinition.type
                                                        && curInteractionMappingDefinition.type === KEY_EVENT_INTERACTION_TYPE
                                                        && curInteractionMappingDefinition.identifier ) {

                                                    self.keyCodeInteractionMap[ curInteractionMappingDefinition.identifier ] = curInteractionDefinition.id;

                                                }

                                            } );

                                }

                            } );
                };

                /**
                 * 
                 * @param interaction
                 *            A JavaScript Event object representing the user interaction which requires handling.
                 * @callback A function which will take two parameters. First is the id of the abstract interaction type
                 *           associated with the concrete interaction, or null if no such mapping was found. Second is
                 *           the type of interaction. There are three types of interaction - 'start', 'stop', and
                 *           'execute'. For example, in the kase of keyboard events, these three types line up with
                 *           'keydown', 'keyup', and 'keypress'.
                 */
                this.handleInteraction = function( interaction, callback ) {

                    /*
                     * Check whether the interaction is a keyboard interaction and handle it appropriately if so
                     */
                    if ( interaction && interaction.type && interaction.keyCode ) {
                        if ( self.keyCodeInteractionMap[ interaction.keyCode ]
                                && self.keyInteractionTypeMap[ interaction.type ] ) {
                            callback( self.keyCodeInteractionMap[ interaction.keyCode ],
                                    self.keyInteractionTypeMap[ interaction.type ] );

                            /*
                             * Stop further handling of the event if we were able to handle it
                             */
                            interaction.stopPropagation();
                            interaction.preventDefault();

                            return false;
                        }
                    }
                };

            };

            return InteractionEngine;

        } );