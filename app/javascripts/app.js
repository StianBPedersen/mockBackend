angular.module('E2E', ['ui.router', 'E2E.fakeBackend', 'E2E.controllers', 'E2E.services'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('/', {
				url: "/",
				templateUrl: 'partials/home.html',
				controller: 'E2ECtrl',
				resolve: {
					getUsers: ['User', function(User) {
						return User.query().$promise;
					}]
				}
			});
	}]);