angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the register modal
        $scope.registerData = {};

        // Create the register modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the register modal to close it
        $scope.closeRegister = function () {
            $scope.modal.hide();
        };

        // Open the register modal
        $scope.register = function () {
            $scope.modal.show();
        };

        // Perform the register action when the user submits the register form
        $scope.doRegister = function (formValid) {
            if (formValid){
                console.log('Doing register', $scope.registerData);

                // Simulate a register delay.
                $timeout(function () {
                    $scope.closeRegister();
                }, 1000);
            } else {
                console.log('register fail', $scope.registerData);
            }
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

.directive('hls', function () {
    return {
        restrict: 'E',
        template: '<video class="player" controls></video>',
        replace: true,
        link: function (scope, el) {
            var video = el[0];
            var hls = new Hls();
            hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                // video.play();
            });
        }
    }
});
