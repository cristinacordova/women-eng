'use strict';

var womenEngApp = angular.module('womenEngApp', ['tableSort']);
var KEY = '1aZTqdr_wgpb3bYrkuYxiqqsVxs-p6E5wNkhK3xyroYo';


/** Controllers **/
womenEngApp.controller("WomenEngCtrl", function($scope, $http) {
  $scope.women = [];
  $scope.csv = 'https://docs.google.com/spreadsheets/d/' + KEY + '/export?gid=0&format=csv';
  var json = 'https://spreadsheets.google.com/feeds/list/' + KEY + '/od6/public/values?alt=json';

  $http.get(json).success(function(d) {
    var data = d.feed.entry;
    var len = data.length;
    var trim = 3;
    $scope.women = data.splice(trim, len);
    $scope.count = len - trim;

    for (var i = 0; i < $scope.count; i++) {
      var w = $scope.women[i];

      if (w['gsx$womeninengineering']) {
        w['name'] = w['gsx$womeninengineering']['$t'];
      }

      if (w['gsx$_cokwr']) {
        w['role'] = w['gsx$_cokwr']['$t'];
      }

      w['links'] = [];
      if (w['gsx$_cpzh4']) {
        w['company'] = w['gsx$_cpzh4']['$t'];
      }
      if (w['gsx$_cre1l']) {
        w['links']['linkedin'] = w['gsx$_cre1l']['$t'];
      }
      if (w['gsx$_ciyn3']) {
        w['links']['web'] = w['gsx$_ciyn3']['$t'];
      }
      if (w['gsx$_chk2m']) {
        w['links']['twitter'] = w['gsx$_chk2m']['$t'];
      }
      if (w['gsx$_ckd7g']) {
        w['links']['github'] = w['gsx$_ckd7g']['$t'];
      }

      $scope.women[i] = w;
    }
  });
});
