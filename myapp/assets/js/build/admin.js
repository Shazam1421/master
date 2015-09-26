var myApp = angular.module('myApp', ['ng-admin', 'restangular']);

// myApp.config(function(RestangularProvider) {
//     RestangularProvider.addElementTransformer('user', false, function(user) {
//                 // This will add a method called evaluate that will do a get to path evaluate with NO default
//                 // query params and with some default header
//                 // signature is (name, operation, path, params, headers, elementToPost)

//                 user.addRestangularMethod('evaluate', 'get', 'evaluate', undefined, {'user': '1'});

//                 return user;
//     });

// function ggg(Restangular){ Restangular.one('user', "1").evaluate({myParam: 'param'});   }
//   ggg();

// });


myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Blairlines Administrator')
      .baseApiUrl(location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('user');
    // set the fields of the user entity list view
    user.menuView().icon('<span class="glyphicon glyphicon-user"></span>');
    user.listView().fields
    ([
        nga.field('email'),
        nga.field('password'),
        nga.field('usertype'),
        nga.field('createdAt', 'date'),
        nga.field('updatedAt', 'date')

    ]);

    user.listView().filters([
        nga.field('email').label('Search').pinned(true),
        nga.field('password'),
        nga.field('usertype', 'number')
    ]);
    admin.addEntity(user);

    


    // add the user entity to the admin application

    
    var pilot = nga.entity('pilot');
    pilot.menuView().icon('<span class="glyphicon glyphicon-plane"></span>');
    pilot.listView().fields([
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
        nga.field('rating'),
        nga.field('status')


    ]);
    admin.addEntity(pilot);

    var passenger = nga.entity('passenger');
    passenger.menuView().icon('<span class="glyphicon glyphicon-copy"></span>');
    passenger.listView().fields([
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
    ]);
    admin.addEntity(passenger);

    var subscription = nga.entity('subscription');
    subscription.menuView().icon('<span class=" glyphicon glyphicon-open-file"></span>');
    subscription.listView().fields([
        nga.field('name'),
        nga.field('description'),
        nga.field('price'),

    ]);
    admin.addEntity(subscription)

    var feedback = nga.entity('feedback');
    feedback.listView().fields([
        nga.field('rate'),
        nga.field('description'),
        nga.field('event'),
        nga.field('passenger'),

    ]);
    admin.addEntity(feedback)

    

    var event = nga.entity('event');
    event.menuView().icon('<span class="glyphicon glyphicon-tags"></span>');
    event.listView().fields([
        nga.field('date'),
        nga.field('time'),
        nga.field('description'),
        nga.field('status'),
        nga.field('eventtype'),


    ]);
    admin.addEntity(event)


    var club = nga.entity('club');
    club.menuView().icon('<span class="glyphicon glyphicon-map-marker"></span>');
    club.listView().fields([
        nga.field('name'),
        nga.field('contactperson'),
        nga.field('phone'),
        nga.field('location'),

    ]);
    admin.addEntity(club)
    //attach the admin application to the DOM and execute it
 

   nga.configure(admin);
}]);

// Add Restangular as a dependency to your a

// Inject Restangular into your controller
// angular.module('myApp').controller('MainCtrl', function($scope, Restangular) {
  
//     Restangular.all('user');
    
//     var baseUser = Restangular.all('user');

//     baseUser.getList().then(function(user){
//         console.log(user);
//         $scope.user = user;
//     });

// });

