
function getPointOnCircle(radius, angle){
    const x = radius * Math.cos(angle * Math.PI/180);
    const y = radius * Math.sin(angle * Math.PI/180);

    return {x: x, y: y};
}



$(document).ready(function(){
    ArrangeButtons();
    $(window).on('resize', ArrangeButtons);
});

function ArrangeButtons(){
    const startButton = $('button:nth-child(5)');
    startButton.css("left", "50%");
    startButton.css("top", "50%");
    startButton.css("translate", "-50% -50%");

    const buttonSize = startButton.width();
    const centerPos = startButton.position();
    const radius = buttonSize * 3;

    const tlButton = $('#tlButton');
    var pointOnCircle = getPointOnCircle(radius, -90-45);
    tlButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    tlButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');
    
    const tm = $('#tcButton');
    pointOnCircle = getPointOnCircle(radius, -90);
    tm.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    tm.css("top",  (centerPos.top + pointOnCircle.y) + 'px');

    const trButton = $('#trButton');
    pointOnCircle = getPointOnCircle(radius, -90+45);
    trButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    trButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');
    
    const mrButton = $('#mrButton');
    pointOnCircle = getPointOnCircle(radius, 0);
    mrButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    mrButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');
    
    const brButton = $('#brButton');
    pointOnCircle = getPointOnCircle(radius, 45);
    brButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    brButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');
    
    const bcButton = $('#bcButton');
    pointOnCircle = getPointOnCircle(radius, 90);
    bcButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    bcButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');

    const blButton = $('#blButton');
    pointOnCircle = getPointOnCircle(radius, 135);
    blButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    blButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');

    const mlButton = $('#mlButton');
    pointOnCircle = getPointOnCircle(radius, 135+45);
    mlButton.css("left", (centerPos.left + pointOnCircle.x) + 'px');
    mlButton.css("top",  (centerPos.top + pointOnCircle.y) + 'px');
}

var click = 0;
function Start(){
    click++;
    $('.click').hide();
    if(click%3 === 0){
        $('.click').show();
    }else if(click%2 === 0)
        $('.four').show();
        else
            $('.two').show();
}