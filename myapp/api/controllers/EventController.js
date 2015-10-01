/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'index': function(req,res,next){
		Event.find().exec(function findEvent(err,event){ 
			if(err){ 
				res.json(err);
			}

			res.json(event);

		});

	},

	'create': function(req,res,next){

		
		var params = req.params.all();
		params.pilots = req.session.PilotId;
		if(req.session.ClubId){ params.clubs = req.session.ClubId; }
		//console.log(params);
		delete(params.id);
		
		Event.create(req.params.all(),function userCreated(err,event){

			if(err){ 
				res.json(err);
			}			

			res.json(event);

		});
	},
	// second index need to change 
	'calendar': function(req,res,next){
		Event.find().populate('eventType').populate('clubs').exec(function findEvent(err,event){ 
			if(err){ 
				res.json(err);
			}

			res.json(event);

		});

	},
	'apply': function(req,res,next){
		var params = req.params.all();
		Event.find({ id: params.event }).populate('passengers').exec(function findEvent(err,event){

			if(err){ 
				res.json(err);
			}

			Event.update({ id: params.event },{ passengers : req.session.PassengerId }).exec(function afterwards(err, updated){

			  if (err) {
			    res.json(err);
			  }

				res.json(updated);

			});


		});
		//console.log(req.params.all());
	}

	
};

