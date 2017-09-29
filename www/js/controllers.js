angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.registerData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegister = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.register = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doRegister = function () {
            console.log('Doing register', $scope.registerData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeRegister();
            }, 1000);
        };
    })

    .factory('userData', function ($http, $q) {
        return {
            getUser: function ($stateParams) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/user/' + $stateParams.userId, {
                    params: {
                    client_id: '9ce0acce7ef3194558c7',
                        client_secret: '2ecd08db5e0ed67e2a71e8c371a46509b33c4ce2'
                    }})
                    .then(function (response) {
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }
        };
    })

    .controller('usersController', ['$scope', '$http', 'userData',
        function ($scope, $http, userData) {
        $scope.users = [];
            $http({
                url: "https://api.github.com/users",
                method: "GET",
                params: {
                    client_id: '9ce0acce7ef3194558c7',
                    client_secret: '2ecd08db5e0ed67e2a71e8c371a46509b33c4ce2'}
            }).success(function (data) {
                $scope.users = data;
            });
    }])

    .controller('userController', ['$scope', '$http', 'userData', '$stateParams',
        function ($scope, $http, userData, $stateParams) {
        userData.getUser($stateParams).then(function (data) {
            $scope.user = data;
        })
    }])

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});
