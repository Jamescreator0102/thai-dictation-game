// ===============================
// เกมเขียนตามคำบอกภาษาไทย
// Version 1.0
// ===============================

// --------------------
// คำศัพท์ตัวอย่าง
// --------------------

const words = [
  "โรงเรียน",
  "คุณธรรม",
  "พยัญชนะ",
  "ประเทศไทย",
  "นักเรียน",
  "ภาษาไทย",
  "ความสุข",
  "ซื่อสัตย์",
  "รับผิดชอบ",
  "มิตรภาพ"
];

// --------------------

let current = 0;
let score = 0;
let correct = 0;

let currentWord = "";

// --------------------

function startGame() {

  const name = document.getElementById("playerName").value.trim();

  if(name === ""){
    alert("กรุณากรอกชื่อผู้เล่น");
    return;
  }

  document.getElementById("showName").innerText = name;

  document.getElementById("startScreen").classList.remove("active");
  document.getElementById("gameScreen").classList.add("active");

  loadQuestion();

}

// --------------------

function loadQuestion(){

  currentWord = words[current];

  document.getElementById("answerInput").value = "";

  document.getElementById("feedback").className="feedback";
  document.getElementById("feedback").innerHTML="";

  document.getElementById("currentNo").innerText = toThai(current+1);

  document.getElementById("totalNo").innerText = toThai(words.length);

  document.getElementById("scoreText").innerText = toThai(score);

  document.getElementById("progressBar").style.width =
      ((current)/words.length*100)+"%";

}

// --------------------

function speakWord(){

  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(currentWord);

  msg.lang="th-TH";

  msg.rate=0.85;

  speechSynthesis.speak(msg);

}

// --------------------

function checkAnswer(){

  const ans=document.getElementById("answerInput").value.trim();

  const fb=document.getElementById("feedback");

  if(ans===""){

      fb.className="feedback wrong";

      fb.innerHTML="กรุณาพิมพ์คำตอบ";

      return;

  }

  if(ans===currentWord){

      score+=10;

      correct++;

      fb.className="feedback correct";

      fb.innerHTML="🎉 ถูกต้อง";

  }else{

      fb.className="feedback wrong";

      fb.innerHTML=
      "❌ ไม่ถูกต้อง<br><br>คำที่ถูกคือ <b>"+currentWord+"</b>";

  }

  document.getElementById("scoreText").innerText=toThai(score);

  setTimeout(nextQuestion,1500);

}

// --------------------

function nextQuestion(){

  current++;

  if(current>=words.length){

      finishGame();

      return;

  }

  loadQuestion();

}

// --------------------

function finishGame(){

  document.getElementById("gameScreen").classList.remove("active");

  document.getElementById("resultScreen").classList.add("active");

  document.getElementById("finalScore").innerText=
      toThai(score);

  document.getElementById("correctCount").innerText=
      toThai(correct);

  document.getElementById("wrongCount").innerText=
      toThai(words.length-correct);

  const percent=Math.round(correct/words.length*100);

  document.getElementById("percentText").innerText=
      percent+"%";

  let level="";

  if(percent<50){

      level="🌱 กำลังพัฒนา";

  }else if(percent<70){

      level="📘 พอใช้";

  }else if(percent<85){

      level="⭐ ทำได้ดี";

  }else{

      level="👑 นักเขียนคำยอดเยี่ยม";

  }

  document.getElementById("levelText").innerHTML=level;

}

// --------------------

function restartGame(){

  current=0;

  score=0;

  correct=0;

  document.getElementById("resultScreen").classList.remove("active");

  document.getElementById("startScreen").classList.add("active");

}

// --------------------

function toThai(num){

  return num.toString().replace(/\d/g,function(d){

      return "๐๑๒๓๔๕๖๗๘๙"[d];

  });

}
