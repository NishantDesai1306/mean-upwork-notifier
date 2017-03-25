/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login')
    .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($scope, $uibModal, $state) {
    $scope.login = function() {
      $state.go('dashboard.home');
    };
  }

})();
