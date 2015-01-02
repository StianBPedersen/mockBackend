angular.module('E2E.fakeBackend', ['ngMockE2E'])
	.run(['$httpBackend', function($httpBackend) {
		
		var users = [
			{ id: 1, name: 'John Smith'},
			{ id: 2, name: 'Joe Doe'},
			{ id: 3, name: 'Sally Doe' }
		];

		function returnTitle(id) {
			switch(+id) {
				case 1:
					title = 'Boss';
					break;
				case 2:
					title = 'Manager';
					break;
				default:
					title = 'worker';
			}
			return title;
    }
		
		$httpBackend.whenGET('/E2E/users').respond(users);

		$httpBackend.whenPOST('/E2E/users').respond(function(method, url, data) {
			var newUser = angular.fromJson(data);
			newUser.id = users.length+1;
			newUser.title = returnTitle(newUser.userid);
			users.push(newUser);

			return [200, newUser, {}];
    });

    $httpBackend.whenPUT(/^\/E2E\/users\/[0-9]{0,}/).respond(function(method, url, data) {
			var updatedUser = angular.fromJson(data);
			updatedUser.title = returnTitle(updatedUser.userid);
						
			return [200, updatedUser, {}];
    });

    $httpBackend.whenDELETE(/^\/E2E\/users\/[0-9]{0,}/).respond(function(method, url, data) {
			var deleted = url.split("/").pop();

			return [200, deleted, {}]; //response status, response.data, response.headers
    });

		$httpBackend.whenGET(/^partials\//).passThrough();
	}]);