angular.module('E2E.services', ['ngResource', 'ngMockE2E'])
	.factory('User', ['$resource', function($resource) {
		return $resource('/E2E/users/:userid', { userid: '@userid'}, { update: { method: 'PUT' } });
	}]);
