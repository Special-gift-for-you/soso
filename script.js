const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const finalScreen = document.getElementById("finalScreen");
const countdownEl = document.getElementById("countdown");
const bgMusic = document.getElementById("bgMusic");
const password = document.getElementById("password");

/* Login */
function goNext() {
  if (password.value === "982005") {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    bgMusic.volume = 0.4;
    bgMusic.play();
    startHearts();
  } else {
    alert("ركزي بقولك تاريخ عيد ميلادك");
  }
}

function goNext2() {
  page2.classList.add("hidden");
  page3.classList.remove("hidden");

    // شغّل منطق السهم + زر الإنهاء
  handlePage3Scroll();
}

/* Finish */
function finish() {
  page3.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  let time = 6;
  countdownEl.textContent = time;

  const timer = setInterval(() => {
    time--;
    countdownEl.textContent = time;

    if (time === 0) {
      clearInterval(timer);
      finalScreen.classList.add("hidden");
      page1.classList.remove("hidden");
      bgMusic.pause();
      bgMusic.currentTime = 0;
      password.value = "";
    }
  }, 1000);
}

/* Hearts */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (10 + Math.random() * 6) + "s";
    document.querySelector(".hearts-container").appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
  }, 600);
}

/* Scroll hint + Finish logic (Page 3 only) */
function handlePage3Scroll() {
  const hint = page3.querySelector('.scroll-hint');
  const finishBtn = document.querySelector('.fixed-finish');

  if (!hint || !finishBtn) return;

  // لو الصفحة مش محتاجة سكرول
  if (page3.scrollHeight <= page3.clientHeight + 20) {
    hint.style.display = 'none';
    finishBtn.style.display = 'block';
    return;
  }

  // الحالة الافتراضية
  hint.style.display = 'block';
  hint.style.opacity = '0.9';
  finishBtn.style.display = 'none';

  page3.addEventListener('scroll', () => {
    const nearBottom =
      page3.scrollTop + page3.clientHeight >= page3.scrollHeight - 40;

    if (nearBottom) {
      hint.style.opacity = '0';
      finishBtn.style.display = 'block';
    } else {
      hint.style.opacity = '0.9';
      finishBtn.style.display = 'none';
    }
  });
}

/* Snow */
/* ❄️ REAL SNOW */
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let flakes = [];

function resizeSnow() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

class Snowflake {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 1.5 + 0.4;
    this.wind = Math.random() * 0.6 - 0.3;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  fall() {
    this.y += this.speed;
    this.x += this.wind;

    if (this.y > h) {
      this.y = -10;
      this.x = Math.random() * w;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
}

function initSnow(count = 200) {
  flakes = [];
  for (let i = 0; i < count; i++) {
    flakes.push(new Snowflake());
  }
}
initSnow();

function snowLoop() {
  ctx.clearRect(0, 0, w, h);
  flakes.forEach(f => {
    f.fall();
    f.draw();
  });
  requestAnimationFrame(snowLoop);
}
snowLoop();
