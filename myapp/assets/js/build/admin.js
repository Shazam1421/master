var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Blairlines Administrator')
      .baseApiUrl('http://localhost:1337/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('user');
    // set the fields of the user entity list view
    user.listView().fields([
        nga.field('email'),
        nga.field('password'),
        nga.field('usertype'),
        nga.field('createdAt'),
        nga.field('updatedAt')
    ]);
    // add the user entity to the admin application
    admin.addEntity(user)

    var pilot = nga.entity('pilot');
    pilot.listView().fields([
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
        nga.field('rating'),
        nga.field('status')


    ]);
    admin.addEntity(pilot)

    var passenger = nga.entity('passenger');
    passenger.listView().fields([
        nga.field('name'),
        nga.field('age'),
        nga.field('phone'),
    ]);
    admin.addEntity(passenger)

    var subscription = nga.entity('subscription');
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
    event.listView().fields([
        nga.field('date'),
        nga.field('time'),
        nga.field('description'),
        nga.field('status'),
        nga.field('eventtype'),


    ]);
    admin.addEntity(event)

    var club = nga.entity('club');
    club.listView().fields([
        nga.field('name'),
        nga.field('contactperson'),
        nga.field('phone'),
        nga.field('location'),

    ]);
    admin.addEntity(club)
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

app.config(function(RestangularProvider, $httpProvider) {
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
            headers = headers || {};
            headers['Prefer'] = 'return=representation';

            if (operation === 'getList') {
                headers['Range-Unit'] = what;
                headers['Range'] = ((params._page - 1) * params._perPage) + '-' + (params._page * params._perPage - 1);
                delete params._page;
                delete params._perPage;

                if (params._sortField) {
                    params.order = params._sortField + '.' + params._sortDir.toLowerCase();
                    delete params._sortField;
                    delete params._sortDir;
                }
            }
        });

        RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            switch (operation) {
                case 'get':
                    return data[0];
                case 'getList':
                    response.totalCount = response.headers('Content-Range').split('/')[1];
                    break;
            }

            return data;
        });

        // @see https://github.com/mgonto/restangular/issues/603
        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    var pattern = /\/(\d+)$/;

                    if (pattern.test(config.url)) {
                        config.params = config.params || {};
                        config.params['id'] = 'eq.' + pattern.exec(config.url)[1];
                        config.url = config.url.replace(pattern, '');
                    }

                    return config;
                },
            };
        });
    });