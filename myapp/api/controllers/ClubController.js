/**
 * ClubController
 *
 * @description :: Server-side logic for managing clubs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'index': function(req,res,next){
		Club.find().exec(function findEvent(err,club){ 
			if(err){ 
				res.json(err);
			}

			res.json(club);

		});

	},

	'create': function(req,res,next){

		var params = req.params.all();
		params.user = req.session.UserId;
		delete(params.id);
		
		
		Club.create(req.params.all(),function clubCreated(err,club){

			if(err){ 
				//console.log(err);
			res.json(err);
				
				

			}			

			res.json(club);

		});
	},
	'getclubs':function(req,res,next){
		var searchObj = {};
		if(req.session.UserType==3){ searchObj = { "user": req.session.UserId };  } 

		Club.find(searchObj).exec(function findUser(err,club){ 

			if(err){ 
				res.json(err);
			}

			if(club){
				res.json(club);
			}

		});
	}


};

