// Canvas
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// 색, 선굵기
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const check = document.getElementById("jsCheck");
const customColor = document.querySelector("#jsColorCustom");

// 마우스커서
const mouseCursor = document.querySelector(".cursor");
const cursorRange = document.querySelector(".cursor_range");

// 그림판 크기
const widthForm = document.querySelector(".controls__width");
const heightForm = document.querySelector(".controls__height");

// 버튼
const saveBtn = document.getElementById("jsSave");
const rectBtn = document.querySelector("#jsRect");
const circleBtn = document.querySelector("#jsCircle");
const triangleBtn = document.querySelector("#jsTriangle");
const eraseBtn = document.querySelector("#jsErase");
const resetBtn = document.querySelector("#jsReset");
const paintBtn = document.querySelector("#jsPaint");
const fillBtn = document.querySelector("#jsFill");
const textBtn = document.querySelector("#jsText");

// 초기값
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
const CURSOR_RANGE_CTRL = 0.1;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

mouseCursor.classList.remove("cursor");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

check.style.backgroundColor = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let paint = true;
let painting = false;
let rect = false;
let recting = false;
let circle = false;
let circling = false;
let triangle = false;
let triangling = false;
let fill = false;
let text=false;

let startX = 0;
let startY = 0;

// 사각형 그리기
function startRecting(event) {
  if (rect === true) {
    recting = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function stopRecting(event) {
  if (rect === true) {
    recting = false;
    ctx.stroke();
    ctx.closePath();
  }
}

function onMouseMoveR(event) {
  if (rect === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    const width = x - startX;
    const height = y - startY;
    if (!recting) {
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.rect(startX, startY, width, height);
    }
  }
}

function handleRectClick(event) {
  if (rect === false) {
    rect = true;
    circle = false;
    triangle = false;
    fill = false;
    paint = false;
    text=false;
    ctx.canvas.style.cursor = "none";
  }
}
// 원 그리기
function startCircling(event) {
  if (circle === true) {
    circling = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function stopCircling(event) {
  if (circle === true) {
    circling = false;
    ctx.stroke();
    ctx.closePath();
  }
}

function onMouseMoveC(event) {
  if (circle === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!circling) {
    } else {
      ctx.beginPath();
      ctx.moveTo(startX, startY + (y - startY) / 2);
      ctx.bezierCurveTo(
        startX,
        startY,
        x,
        startY,
        x,
        startY + (y - startY) / 2
      );
      ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    }
  }
}

function handleCircleClick(event) {
  if (circle === false) {
    rect = false;
    circle = true;
    triangle = false;
    fill = false;
    paint = false;
    text=false;
    ctx.canvas.style.cursor = "none";
  }
}
// 세모 그리기
function startTriangling(event) {
  if (triangle === true) {
    triangling = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function stopTriangling(event) {
  if (triangle === true) {
    triangling = false;
    ctx.stroke();
    ctx.closePath();
  }
}

function onMouseMoveT(event) {
  if (triangle === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!triangling) {
    } else {
      ctx.beginPath();
      ctx.moveTo(startX + (x - startX) / 2, startY);
      ctx.lineTo(startX, y);
      ctx.lineTo(x, y);
      ctx.lineTo(startX + (x - startX) / 2, startY);
    }
  }
}

function handleTriangleClick(event) {
  if (triangle === false) {
    rect = false;
    circle = false;
    triangle = true;
    fill = false;
    paint = false;
    text=false;
    ctx.canvas.style.cursor = "none";
  }
}
// 선 그리기
function startPainting(event) {
  if (paint === true) {
    painting = true;
  }
}

function stopPainting(event) {
  if (paint === true) {
    painting = false;
  }
}

function onMouseMove(event) {
  if (paint === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      restore_array.push(imageData);
    }
  }
}

function handlePaintClick(event) {
  if (paint === false) {
    rect = false;
    circle = false;
    triangle = false;
    fill = false;
    paint = true;
    ctx.canvas.style.cursor = "none";
  }
}

// 채우기
function handleFillClick() {
  if (fill === false) {
    paint = false;
    rect = false;
    circle = false;
    triangle = false;
    fill = true;
    text=false;
    ctx.canvas.style.cursor = "pointer";
    mouseCursor.classList.remove("cursor");
  }
}

function handleCanvasClick() {
  if (fill === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
// 지우개

function handleEraseClick() {
  ctx.strokeStyle = "white";
}

// 초기화

function handleResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  restore_array = [];
  index = -1;
  ctx.beginPath();
}

// 색
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  check.style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function handleCColorChange(event) {
  const color = event.target.value;
  check.style.backgroundColor = color;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

// 선굵기
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  cursorRange.style.width = size * CURSOR_RANGE_CTRL + "rem";
  cursorRange.style.height = size * CURSOR_RANGE_CTRL + "rem";
}

// 저장(png로)
function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

// 커서
function handleCursor(event) {
  if (paint === true || rect === true) {
    ctx.canvas.style.cursor = "none";
    mouseCursor.classList.add("cursor");
  } else {
    ctx.canvas.style.cursor = "pointer";
    mouseCursor.classList.remove("cursor");
  }
  mouseCursor.style.top = event.pageY + "px";
  mouseCursor.style.left = event.pageX + "px";
}

function hideCursor() {
  mouseCursor.classList.remove("cursor");
}

// canvas 크기, 배경값 초기화
function handleCanvasWidth(event) {
  event.preventDefault();
  canvas.width = event.target[0].value;
  ctx.strokeStyle = check.style.backgroundColor;
  ctx.fillStyle = ctx.strokeStyle;
}

function handleCanvasHeight(event) {
  event.preventDefault();
  canvas.height = event.target[0].value;
  ctx.strokeStyle = check.style.backgroundColor;
  ctx.fillStyle = ctx.strokeStyle;
}

// 그리기 과정 각각에 해당하는 함수들
if (canvas) {
  // 사각형
  canvas.addEventListener("mousemove", onMouseMoveR);
  canvas.addEventListener("mousedown", startRecting);
  canvas.addEventListener("mouseup", stopRecting);
  canvas.addEventListener("mouseleave", stopRecting);
  // 원
  canvas.addEventListener("mousemove", onMouseMoveC);
  canvas.addEventListener("mousedown", startCircling);
  canvas.addEventListener("mouseup", stopCircling);
  canvas.addEventListener("mouseleave", stopCircling);
  // 세모
  canvas.addEventListener("mousemove", onMouseMoveT);
  canvas.addEventListener("mousedown", startTriangling);
  canvas.addEventListener("mouseup", stopTriangling);
  canvas.addEventListener("mouseleave", stopTriangling);
  // 그리기
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  // 채우기
  canvas.addEventListener("click", handleCanvasClick);

  // 커서
  canvas.addEventListener("mouseleave", hideCursor);
  canvas.addEventListener("mousemove", handleCursor);
  // 저장
  canvas.addEventListener("contextmenu", handleCM);
}

// 색범위
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (customColor) {
  customColor.addEventListener("input", handleCColorChange);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

// 그림판 크기
if (widthForm) {
  widthForm.addEventListener("submit", handleCanvasWidth);
}

if (heightForm) {
  heightForm.addEventListener("submit", handleCanvasHeight);
}

// 버튼
if (rectBtn) {
  rectBtn.addEventListener("click", handleRectClick);
}
if (circleBtn) {
  circleBtn.addEventListener("click", handleCircleClick);
}
if (triangleBtn) {
  triangleBtn.addEventListener("click", handleTriangleClick);
}
if (fillBtn) {
  fillBtn.addEventListener("click", handleFillClick);
}

if (paintBtn) {
  paintBtn.addEventListener("click", handlePaintClick);
}

if (eraseBtn) {
  eraseBtn.addEventListener("click", handleEraseClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}


//로컬이미지 불러오기
function draw(ev) {
  console.log(ev);
  var canvas = document.getElementById("jsCanvas");
  var ctx = canvas.getContext("2d");
  (img = new Image()),
    (f = document.getElementById("uploadimage").files[0]),
    (url = window.URL || window.webkitURL),
    (src = url.createObjectURL(f));

  img.src = src;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    url.revokeObjectURL(src);
  };
}

document.getElementById("uploadimage").addEventListener("change", draw, false);

     
// 텍스트 입력
var mouseX = 0;
var mouseY = 0;
var startingX = 0;

//아무 단어 저장
var recentWords = [];

//백스페이스
var undoList = [];

//키 입력 후 캔버스 상태 저장
function saveState() {
  undoList.push(canvas.toDataURL());
}

saveState();

//백스페이스 눌렀을 때 불러오기
function undo() {
  undoList.pop();

  var imgData = undoList[undoList.length - 1];
  var image = new Image();

  image.src = imgData;
  image.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };
}

canvas.addEventListener(
  "click",
  function (e) {
    //클릭 시 타이핑 할 텍스트 위치
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
    startingX = mouseX;

    recentWords = [];

    return false;
  },
  false
);

//키입력 이벤트
document.addEventListener(
  "keydown",
  function (e) {
    //캔버스 폰트 설정
    ctx.font = "16px Arial";

    if (e.key === "Backspace") {
      undo();

      var recentWord = recentWords[recentWords.length - 1];

      mouseX -= ctx.measureText(recentWord).width;
      recentWords.pop();
    } else if (e.key === "Enter") {
      mouseX = startingX; //키 입력
      mouseY += 20;
    } else {
      //캔버스에 텍스트 쓰기
      ctx.fillText(e.key, mouseX, mouseY);

      //키 입력 후 마우스 커서 이동
      mouseX += ctx.measureText(e.key).width;

      saveState();
      recentWords.push(e.key);
    }
  },
  false
);

// 기능
// 사각형 그리기
function startRecting(event) {
  if (rect === true) {
    recting = true;
    startX = event.offsetX;
    startY = event.offsetY;
    ctx.beginPath();
  }
}

function stopRecting(event) {
  if (rect === true) {
    recting = false;
    ctx.stroke();
    ctx.closePath();
  }
}

function onMouseMoveR(event) {
  if (rect === true) {
    const x = event.offsetX;
    const y = event.offsetY;
    const width = x - startX;
    const height = y - startY;
    if (!recting) {
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.rect(startX, startY, width, height);
    }
  }
}

function handleRectClick(event) {
  if (rect === false) {
    rect = true;
    circle = false;
    triangle = false;
    fill = false;
    paint = false;
    ctx.canvas.style.cursor = "none";
  }
}