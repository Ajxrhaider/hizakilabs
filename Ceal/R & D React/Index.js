/*var speed = 10;
var time = 5;
alert(speed * time);

var speed1 = 85;
var time1 = 1.5;
alert(speed1 * time1);

var speed2 = 12;
var time2 = 9;
alert(speed2 * time2);

var speed3 = 42;
var time3 = 21;
alert(speed3 * time3);

function getDistance(speed, time) {
    var result = speed * time;
    alert(result);
}
getDistance(10, 5);
getDistance(85, 1.5);
getDistance(12, 9);
getDistance(42, 21);
*/
function alert(content) {
    console.log(content);
}
function fomratDistance(distance) {
    return distance + "km";
}

function getDistance(speed, time) {
    var result = speed * time;
    alert(fomratDistance(result));
}

getDistance(10, 5);
getDistance(85, 1.5);
getDistance(12, 9);
getDistance(42, 21);