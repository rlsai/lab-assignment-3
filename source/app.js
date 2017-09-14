'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var keyword = document.getElementById("txt_placeName").value.replace(/\s/g, "");
            if (keyword != null && keyword != "") {
                document.getElementById('div_ReviewList').style.display = 'none';
                // below is the youtube API which gives top trending videos for a keyword
                var handler = $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+keyword +"&key=AIzaSyC9InOn8sNuJlP1945E3LNDBhJ1F9AMdhA");
                handler.success(function (data) {
                    console.log(data);

                   for(var i = 0;i < data["items"].length;i++) {
                       $scope.venueList[i] = {
                           "name": data.items[i].snippet.title,
                           "category": data.items[i].snippet.description,
                           "id": data.items[i].id.videoId,
                           "location": keyword
                       };
                   }
                    $http({
                        method: "POST",
                        url: "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&"+"key="+
                        "trnsl.1.1.20170913T172631Z.5ebac44ad4d3f6f6.36ed0b9a05e546b42a1ac0c457f6209509d403f3&text="+keyword,
                    }).then(
                    function (result) {
                            console.log(result["data"]["text"][0]);

                            document.getElementById("translatedText").innerHTML = "Translated text for " +keyword + " in russian is " +result["data"]["text"][0];


                    })

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }

    });
