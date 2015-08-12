#<center>Meteor Recursive Publish Example

###What?

I wanted a way to get nested comments recursively with meteor. Something similar to what you'd see
in Reddit, Disqus and other areas where replying to someones comment created a nested comment
rather than a quoted reply.

###How?

Using [reywood:publish-composite](https://atmospherejs.com/reywood/publish-composite), I wrote
a little recursive publish function to do just that. 

This is an example.

    git clone git@github.com:tgienger/recursivepublish.git
	cd recursivePublish
	meteor
	
Make some posts, view them to make some replies.

**Requires**:

[reywood:publish-composite](https://atmospherejs.com/reywood/publish-composite)

and if you're using Angularjs directives like in this example you'll also want:

[Angular Recursion Helper](https://github.com/marklagendijk/angular-recursion) (included in this example)