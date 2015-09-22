/**
* Pilot.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	name:{
  		type: 'string',
  		required: true
  	},

  	age: 'integer',
  	phone: {
  		type: 'string',
  		required: true,
  	},

  	rating: 'FLOAT',
  	status: 'integer',

  	clubs:{
  		collection : "club",
  		via: 'pilots'
  	},
  	events: {
  		collection: 'event',
  		via: 'pilots'
  	},
  	user: {
  		model: 'user'
  	}

  }
};

