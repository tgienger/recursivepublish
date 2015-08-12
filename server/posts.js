Meteor.publish('post', function () {
	return Posts.find();
});