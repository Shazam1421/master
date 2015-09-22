/**
* Passenger.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required : true
  	},
  	age: 'integer',
  	phone:{
  		type: 'string',
  		required: true,
  	},
    
  	subscriptionType:{
  		model: 'subscription'
  	},
  	events: {
  		collection: 'event',
  		via: 'passengers'
  	},
  	feedbacks:{
  		collection: 'feedback',
  		via: 'passengers'
  	},
  	user:{
  		model: 'user'
  	}

  }
};

