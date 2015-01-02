angular.module('E2E.controllers', [])
	.controller('E2ECtrl', ['$scope', 'getUsers', 'User', function($scope, getUsers, User) {
		
		$scope.users = getUsers;
		console.log($scope.users);

		$scope.$on('skjonnerDuHvaJegMener', function() {
			console.log("Skjønner du hva jeg mener");
		});

		$scope.addUser = function() {
			var user = new User({ name: $scope.newname });
			user.$save(function(response) {
				$scope.users.push(response);
				$scope.newname = '';

				$scope.$emit('notification', {
					msg: "Ny bruker lagt til!",
					alert: 'success'
				});
			}, function(err) {
				console.log(err.data);
			});
		};

		$scope.updateUser = function(index) {
			User.update({ userid: $scope.users[index].id}, { name: $scope.users[index].name }, function(response) {
				$scope.users[index].name = response.name;
				$scope.users[index].title = response.title;
				
				$scope.$emit('notification', {
					msg: 'Bruker er oppdatert',
					alert: 'success'
				});
			}, function(error) {

			});
		};

		$scope.deleteUser = function(index) {
			User.delete({userid: $scope.users[index].id }, { pay: 'load' }, function(response) {
				$scope.users.splice(index, 1);
				$scope.$emit('notification', {
					msg: 'Bruker slettet',
					alert: 'danger'
				}, function(response) {});
			});
		};

		$scope.allUsers = function() {
			console.log($scope.users);
		};

	}])

	.controller('baseCtrl', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.$on('notification', function(e, msg) {
			$scope.notification = msg.msg;
			$scope.alert = msg.alert;
			
			$timeout(function() {
				$scope.notification = null;
				$scope.$broadcast('skjonnerDuHvaJegMener', []);
			}, 3000);
		});
	}]);