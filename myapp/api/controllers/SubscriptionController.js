/**
 * SubscriptionController
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'index': function(req,res,next){
		Subscription.find().exec(function findEvent(err,subscription){ 
			if(err){ 
				res.json(err);
			}

			res.json(subscription);

		});

	}
	
};

