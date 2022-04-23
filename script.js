var track1 = new Audio("lol.mp3");
var track2 = new Audio("lol2.mp3");
var track3 = new Audio("lol3.mp3");
var track4 = new Audio("lol4.mp3");
var track5 = new Audio("lol4.mp3");
var track6 = new Audio("lol4.mp3");
var track7 = new Audio("lol4.mp3");
var song = [track1, track2, track3, track4, track5, track6];
var songName = [
  "Say you wont let go",
  "Me and You",
  "7 years",
  "Crying Over You .feat (BEKA)",
  "We are Young",
  "Slow dancing in the dark",
  "Aaron in Paris",
];
var artistName = ["James Arthur", "HONNE", "Lukas Graham", "HONNE"];
var albumArt = new Array();
var current_minute = 0;
var current_seconds_long = 0;
var current_seconds = 0;
var current_time = 0;
var currentTimeVar = document.getElementById("current-time");

albumArt[0] = new Image();
albumArt[0].src = "artwork.jpg";

albumArt[1] = new Image();
albumArt[1].src = "artwork2.jpg";

albumArt[2] = new Image();
albumArt[2].src = "artwork3.jpg";

albumArt[3] = new Image();
albumArt[3].src = "artwork2.jpg";

var i = 0;
var isPlaying = false;
var list = song.length;

function togglePlay() {
  if (isPlaying) {
    song[i].pause();
    isPlaying = false;
  } else {
    song[i].play();
    isPlaying = true;
  }
}

function next() {
  if (list - 1 == i) {
    i = 0;
    // alert(i);
    document.getElementById("song").innerHTML = songName[i];
    document.getElementById("artist").innerHTML = artistName[i];
    document.getElementById("art").src = albumArt[i].src;
    if (isPlaying) song[i].play();
  } else {
    i++;
    // alert(i);
    document.getElementById("song").innerHTML = songName[i];
    document.getElementById("artist").innerHTML = artistName[i];
    document.getElementById("art").src = albumArt[i].src;
    if (isPlaying) song[i].play();
  }
}

function prev() {
  if (i == 0) {
    i = 0;
    // alert(i);
    document.getElementById("song").innerHTML = songName[i];
    document.getElementById("artist").innerHTML = artistName[i];
    document.getElementById("art").src = albumArt[i].src;
    if (isPlaying) song[i].play();
  } else {
    i--;
    // alert(i);
    document.getElementById("song").innerHTML = songName[i];
    document.getElementById("artist").innerHTML = artistName[i];
    document.getElementById("art").src = albumArt[i].src;
    if (isPlaying) song[i].play();
  }
}

$(".m_playButton").click(function () {
  $(this).toggleClass("active");
  togglePlay();
});

$(".m_fowardButton").click(function () {
  song[i].pause();
  song[i].currentTime = 0;
  next();
});

$(".m_prevButton").click(function () {
  song[i].pause();
  song[i].currentTime = 0;
  prev();
});

gsap.to(".library", {
  scrollTrigger: {
    trigger: ".library",
    start: "top 100%",
    end: "top 0%",
    scrub: true,
    markers: true,
  },
  y: "-100vh",
});

gsap.to(".nowPlaying", {
  scrollTrigger: {
    trigger: ".library",
    start: "top 100%",
    end: "top 0%",
    scrub: true,
    markers: true,
  },
  scale: 0.8,
});

function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2);
  if (seconds < 10) seconds = "0" + seconds;
  time = minutes + " : " + seconds;

  return time;
}

function calculateCurrentValue(currentTime) {
  current_minute = parseInt(currentTime / 60) % 60;
  current_seconds_long = currentTime % 60;
  current_seconds = current_seconds_long.toFixed();
  if (current_seconds < 10) current_seconds = "0" + current_seconds;
  current_time = current_minute + " : " + current_seconds + " / ";
  return current_time;
}

setInterval(lol, 1);

function lol() {
  var player = document.getElementById("player");
  var length = song[i].duration;
  var current_time = song[i].currentTime;
  var currentTime = calculateCurrentValue(current_time);
  // alert("lol");

  // calculate total length of value
  var totalLength = calculateTotalValue(length);
  document.getElementById("total-time").innerHTML = totalLength;

  // calculate current value
  currentTimeVar.innerHTML = "";
  currentTimeVar.innerHTML = currentTime;

  var progressbar = document.getElementById("progress-bar");
  progressbar.value = song[i].currentTime / song[i].duration;
  progressbar.addEventListener("click", seek);

  if (song[i].currentTime == song[i].duration) {
    next();
  }

  function seek(event) {
    var percent = event.offsetX / this.offsetWidth;
    song[i].currentTime = percent * song[i].duration;
    progressbar.value = percent / 100;
  }
}

var container = document.getElementById("song-list");
for (var j = 0; j < list; j++) {
  var newDiv = document.createElement("div");
  newDiv.id = j;
  newDiv.className = "songs";
  // document.getElementById("small-song-name").innerHTML = songName[j];
  // document.getElementById("small-art-work").innerHTML = artistName[j];
  container.appendChild(newDiv);
  songnamecreator(j);
}

function songnamecreator(j) {
  var smallsongcontainer = document.getElementById(j);
  var newsongDiv = document.createElement("div");
  newsongDiv.id = "small-song-name" + j;
  newsongDiv.className = "smallSongName";
  // newsongDiv.id = "small-art-work" + j;
  // newsongDiv.className = "smallArtWork";
  smallsongcontainer.appendChild(newsongDiv);
  document.getElementById("small-song-name" + j).innerHTML = songName[j];
  // document.getElementById("small-art-work").innerHTML = albumArt[j];
}

$(".songs").click(function () {
  // if ((isPlaying = false)) $(".songs").toggleClass("active");
  // $(this).toggleClass("active");
  // document.getElementById(i);
  song[i].pause();
  song[i].currentTime = 0;
  i = $(this).attr("id");
  song[i].play();
  $(".m_playButton").toggleClass("active");
  document.getElementById("song").innerHTML = songName[i];
  document.getElementById("artist").innerHTML = artistName[i];
  document.getElementById("art").src = albumArt[i].src;
  isPlaying = true;
});

$(".view").click(function () {
  $(".albumArtCotainer").toggleClass("active");
  $(".songName").toggleClass("active");
  $(".artistName").toggleClass("active");
  $(".lyrics").toggleClass("active");
  $(".view").toggleClass("active");
});

function loader() {
  loads = setTimeout(page, 200);
  window.top.scrollTo(0, 1);
}

function page() {
  $("#loader").css("display", "none");
  $(".nowPlaying").css("display", "flex");
  $(".library").css("display", "block");
}
