 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { doc, getFirestore, addDoc, setDoc, getDoc, collection } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import {
getAuth,
signInAnonymously,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBU3k4VaQPcUIlpIi-pQzIYl7k2-LFOJ_A",
  authDomain: "cs6065-assignment1.firebaseapp.com",
  projectId: "cs6065-assignment1",
  storageBucket: "cs6065-assignment1.firebasestorage.app",
  messagingSenderId: "1090653007317",
  appId: "1:1090653007317:web:5ad329c8e813bd0b2e215c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

await signInAnonymously(auth);

onAuthStateChanged(auth, user => {
    
});

var noOfTrials = 1;
var blockNo = 1;
var currentTargetElement = null;
var clickableButtons = $('.two');
var currentState = 'start'
var misclicks = 0;
var startTime = null;
var userId = '';

function Start(e){
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

    startTime = e.timeStamp;
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

async function StoreData(misclicks, timeTaken){    
    await addDoc(
        collection(db, "data"),{
            user: userId,
            block: blockNo,
            trial: noOfTrials,
            misclicks: misclicks,
            timeTaken, timeTaken,
    });
}

async function StoreTrialComplete(){
    await setDoc(
        doc(db, "complete", userId),
        {
            complete: true
        },
        { merge: true }
    );
}


function OnClickTarget(e){
    StoreData(misclicks, e.timeStamp - startTime);

    $('audio')[0].play();
    currentTargetElement.prop('disabled', true);
    currentTargetElement.addClass('inactive');
    currentTargetElement.removeClass('active');

    $('.start').prop('disabled', false);
    $('.start').addClass('active');
    $('.start').removeClass('inactive');

    noOfTrials++;
    currentState = 'start';
    misclicks=0;

    if(noOfTrials === 21 && blockNo === 1)
    {   noOfTrials = 1;
        blockNo = 2;
        ShowBlockButtons();
        $('.start').html('Click to Continue');
    }
    else if (noOfTrials === 21 && blockNo === 2)
    {   noOfTrials = 1;
        blockNo = 3;
        ShowBlockButtons();
        $('.start').html('Click to Continue');
    }else if(noOfTrials === 21 && blockNo === 3){
        noOfTrials = 1;
            $('#start').hide();
            $('#trialsComplete').show();
            StoreTrialComplete();
        
    }
}

$(document).on('mousedown', function(e){
    if(currentState === 'start') return;
    if(!currentTargetElement.is(e.target) && currentTargetElement.has(e.target).length ===0 )
        misclicks++;
});


function getPointOnCircle(radius, angle){
    const x = radius * Math.cos(angle * Math.PI/180);
    const y = radius * Math.sin(angle * Math.PI/180);

    return {x: x, y: y};
}

$(document).ready(function(){
    ArrangeButtons();
    $(window).on('resize', ArrangeButtons);
});

async function OnClickEnter(){
    const inputVal = $('#userID').val().trim();
    if(inputVal === "") {
        $('.error').html('Please enter a user ID');
        return;
    }

    userId = inputVal;
    const docRef = doc(db, "complete", userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        $('.error').html('User ID '+userId+' has already been used.');
        return;
    }
    
    $('.input-container').hide();
    $('#start').show();
    $('#userIDDisplay').html('User ID: '+userId);
}

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

    $('#start').hide();
    $('#trialsComplete').hide();

    $('.start').on('click', Start);
    $('.click').on('click', OnClickTarget);
    $('#enter').on('click', OnClickEnter);
}
