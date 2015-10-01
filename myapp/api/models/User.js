/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	email:{
  		type:'email',
  		//email: true,
  		required: true,
  		unique: true
  	},

  	password: {
  		type: 'string',
  		required: true,
  	},

  	userType:{
  		type: 'integer'
  	},

    validationMessages: { //hand for i18n & l10n
        email: {
          required: 'Email is required',
          unique: 'Email address is already taken'
        }
    }


  }
};

