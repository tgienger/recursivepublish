
Meteor.startup(function() {
	if (Posts.find().count() === 0) {
		var postId = Posts.insert({
			title: "First Post Ever",
			text: "This is the body of the auto-generated first post"
		});
		
		var firstCommentId = Comments.insert({
			parent_id: postId,
			user: {name: 'Fake User 1'},
			date: new Date,
			text: 'First reply to the first post ever.'
		});
		
		Comments.insert({
			parent_id: firstCommentId,
			user: {name: 'Another Fake'},
			date: new Date,
			text: 'A reply to the first ever comment of the first ever post.'
		});
	}
});
