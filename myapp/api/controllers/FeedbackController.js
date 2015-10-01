/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'index': function(req,res,next){
		Feedback.find().exec(function findEvent(err,feedback){ 
			if(err){ 
				res.json(err);
			}

			res.json(feedback);

		});

	}
	
};

