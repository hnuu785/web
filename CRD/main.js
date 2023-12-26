const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

let buf1 = document.getElementById('buffer1');
let buf2 = document.getElementById('buffer2');

let frame = 0;
let zergEnhence = 0;
let terranEnhence = 0;
let protoseEnhence = 0;
let zCnt = 0;
let tCnt = 0;
let pCnt = 0;
let money = 0;
let stage = 1;
let i = 0;
let j = 0;
let k = 0;
let i1 = 0;
let i2 = 0;
let i3 = 0;
let i4 = 0;
let idx = 0;
let sw1 = false;
let cnt = 0;
let tmp = 0;
let distance = 1000;
let unitCoin = 100;

let units = [];
let enemy = [];

function gameLoop() {
	if (enemy.length >= 40) {
		context.font = '50px 궁서';
		context.fillStyle = 'red';
		context.fillText("GAME OVER", 270, 400);
		return;
	}
	
	drawField();
	drawUnit();
	moving();
	enemies();
	frame += 1;
	if (frame % (60 * 60) == 0) {
		stage += 1 ;
		unitCoin += 2;
	}
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);