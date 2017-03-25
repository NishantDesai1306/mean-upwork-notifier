/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          title: 'Dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html'
        })
        .state('dashboard.home', {
        	url: '/home',
					title: 'Dashboard',
          templateUrl: 'app/pages/dashboard/home/home.html',
					sidebarMeta: {
						icon: 'ion-home',
						order: 0
					}
        })
				.state('dashboard.statistics', {
        	url: '/statistics',
					title: 'Staistics',
          templateUrl: 'app/pages/dashboard/stats/stats.html',
          controller: 'StatisticsCtrl',
					sidebarMeta: {
						icon: 'ion-stats-bars',
						order: 100
					}
        });
  }

})();
