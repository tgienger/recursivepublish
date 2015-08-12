
Meteor.publishComposite('comments', function (item_id, options) {
    /**
     * TODO: Add query to find a user for each comment.
     */
    /**
     * Start building our query.
     * Add the latest 25 (depending on options) child comments of the viewed item
     * to the query.
     */
    var query = {
		find: function () {
			return Comments.find({ parent_id: item_id }, options);
		}
	};
    // Query the database for the first 25? comments, we'll need their _id's
    var mainChildren = Comments.find({ parent_id: item_id }, options).fetch();
    // pluck the id's from the initial comments
    var mainChildrenIds = _.pluck(mainChildren, '_id');
	
    /**
     * Builds the remaining query based on the id's plucked from the children
     *  above.
     * @param childrens_id The id's we just plucked from the above query
     * @param thisParent This is the parent query
     */
    var getChildren = function (children_ids, parentQuery) {
        // initiate i to 0
        var i = 0;
        // add a child array to the current parent query.
        parentQuery.children = [];
        var recursive = function getem(children, parent) {
            _.each(children, function (id) {
                var query = Comments.find({ parent_id: id }, { limit: 5, sort: { date: 1 } });
                parent.children[i] = {
                    find: function () {
                        return query;
                    }
                };
                var children1 = query.fetch();
                var newChildrenIds = _.pluck(children1, '_id');
                i++;
                if (newChildrenIds.length > 0) {
                    getem(newChildrenIds, parent);
                }
            });
        };
        // recursively build the query if there are children found.
        recursive(children_ids, parentQuery);
    };
    // initiate the query build function
    getChildren(mainChildrenIds, query);
    return query;
});