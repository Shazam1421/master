/**
* Club.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: 'string',
    contactPerson: 'string',
    phone: 'string',
    location: 'string',
    latLng: 'array',
    workingHours: 'string',
    description: 'string',
    pilots: {
      collection: 'pilot',
      via: 'clubs'
    },
    events:{
      collection: 'event',
      via: 'clubs'
    },
    user: {
      model: 'user'
    }
  }
};

