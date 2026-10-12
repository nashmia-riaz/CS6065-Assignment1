
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

var noOfTrials = 0;
var blockNo = 1;
var currentTargetElement = null;
var clickableButtons = $('.two');
var currentState = 'start'

function Start(){
    $('.start').prop('disabled', true);   
    $('.start').addClass('inactive');
    $('.start').removeClass('active');
    $('.start').html('Start');

    const randomIndex = Math.floor(Math.random() * clickableButtons.length)
    currentTargetElement = clickableButtons.eq(randomIndex);
    currentTargetElement.addClass('active');
    currentTargetElement.removeClass('inactive');
    currentTargetElement.prop('disabled', false);

    currentState = 'target';
}

function ShowBlockButtons(){
    $('.click').hide();

    if(blockNo === 1)
        clickableButtons = $('.two');        
    else if (blockNo === 2){
        clickableButtons = $('.four');
    }else if(blockNo === 3){
        clickableButtons = $('.click');
    }
    
    clickableButtons.show();
}

function OnClickTarget(){
    $('audio')[0].play();
    currentTargetElement.prop('disabled', true);
    currentTargetElement.addClass('inactive');
    currentTargetElement.removeClass('active');

    $('.start').prop('disabled', false);
    $('.start').addClass('active');
    $('.start').removeClass('inactive');

    noOfTrials++;
    currentState = 'start';

    if(noOfTrials === 20){
        blockNo = 2;
        ShowBlockButtons();
        $('.start').html('Click to Continue');
    }
    else if (noOfTrials === 40)
    {   
        blockNo = 3;
        ShowBlockButtons();
        $('.start').html('Click to Continue');
    }
}

$(document).on('mousedown', function(e){
    if(currentState === 'start') return;
    if(!currentTargetElement.is(e.target) && currentTargetElement.has(e.target).length ===0 )
        console.log('misclick');
});