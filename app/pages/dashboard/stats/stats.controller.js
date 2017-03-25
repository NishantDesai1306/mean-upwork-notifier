/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('StatisticsCtrl', StatisticsCtrl);

  /** @ngInject */
  function StatisticsCtrl($scope, $timeout) {
    $scope.loading = true;
    $scope.progress = 0;
    $scope.getProgressStyle = function() {
      return {
        width: $scope.progress+'%'
      };
    };

    var load = function() {
      var min = 400;
      var max = 1000;
      var randomTimeout = Math.random() * (max - min) + min;
      $timeout(function() {
        $scope.progress += 10;
        if($scope.progress === 100) {
          $scope.loading = false;
        }
        else {
          load();
        }
      }, randomTimeout);
    };
    load();
  }

})();
