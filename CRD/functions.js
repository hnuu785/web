function drawField() {
	context.clearRect(0, 0, 1400, 820);
	// 유닛 공간
	context.strokeRect(150, 150, 500, 500);
	// 조합 공간
	context.strokeStyle = 'red';
	context.strokeRect(489, 151, 160, 120);
	context.font = '40px 굴림';
	context.fillStyle = 'black';
	context.fillText("비콘", 530, 225);
	// 랜덤 유닛 뽑기
	context.strokeStyle = 'black';
	context.strokeRect(820, 40, 560, 100);
	context.font = '40px 궁서';
	context.fillText("랜덤유닛뽑기(" + unitCoin + ")", 920, 100);
	// 저그유닛 강화
	context.strokeRect(820, 180, 560, 100);
	context.font = '40px 궁서';
	context.fillText("저그유닛 강화+" + zCnt + " 비용:" + (zCnt + 1) * 5, 840, 240);
	// 테란유닛 강화
	context.strokeRect(820, 320, 560, 100);
	context.font = '40px 궁서';
	context.fillText("테란유닛 강화+" + tCnt + " 비용:" + (tCnt + 1) * 5, 840, 380);
	// 토스유닛 강화
	context.strokeRect(820, 460, 560, 100);
	context.font = '40px 궁서';
	context.fillText("토스유닛 강화+" + pCnt + " 비용:" + (pCnt + 1) * 5, 840, 520);
	// 조합하기
	context.strokeRect(820, 600, 260, 100);
	context.font = '40px 궁서';
	context.fillText("조합하기", 870, 660);
	// 판매하기
	context.strokeRect(1120, 600, 260, 100);
	context.font = '40px 궁서';
	context.fillText("판매하기", 1170, 660);
	// 다음 스테이지
	context.strokeRect(1120, 740, 260, 50);
	context.font = '24px 맑은고딕';
	context.fillText("스테이지올리기", 1165, 775);
	// 돈
	context.font = '30px 맑은고딕';
	context.fillText("돈 : " + money, 820, 740);
	// 스테이지
	context.font = '30px 맑은고딕';
	context.fillText("스테이지 : " + stage, 820, 780);
	// 버전
	context.font = '20px 맑은고딕';
	context.fillStyle = 'red';
	context.fillText("CRD 1.0 v.20231110", 820, 810);
	// 시간
	context.font = '30px 맑은고딕';
	context.fillStyle = 'black';
	context.fillText("시간 : " + Math.floor(frame / 60) + "초", 340, 500);
	// 적의 수
	context.font = '30px 맑은고딕';
	context.fillStyle = 'black';
	context.fillText("적 : " + enemy.length, 340, 550);
}

document.addEventListener('click', function() {
	let clickX = event.clientX - canvas.offsetLeft;
	let clickY = event.clientY - canvas.offsetTop;
	
	if (clickX >= 820 && clickX <= 1380 && clickY >= 40 && clickY <= 140) {
		console.log('ranunit');
		if (unitCoin > 0) {
			randomUnit();
			unitCoin -= 1;
		}
	}
	if (clickX >= 820 && clickX <= 1380 && clickY >= 180 && clickY <= 280) {
		if (money >= (zCnt + 1) * 5) {
			zergEnhence = 0.01 * zCnt * zCnt;
			money -= (zCnt + 1) * 5;
			zCnt += 1;
		}
	}
	if (clickX >= 820 && clickX <= 1380 && clickY >= 320 && clickY <= 420) {
		if (money >= (tCnt + 1) * 5) {
			terranEnhence = 0.01 * tCnt * tCnt;
			money -= (tCnt + 1) * 5;
			tCnt += 1;
		}
		
	}
	if (clickX >= 820 && clickX <= 1380 && clickY >= 460 && clickY <= 560) {
		if (money >= (pCnt + 1) * 5) {
			protoseEnhence = 0.01 * pCnt * pCnt;
			money -= (pCnt + 1) * 5;
			pCnt += 1;
		}
	}
	if (clickX >= 820 && clickX <= 1080 && clickY >= 560 && clickY <= 660) {
		combine();
	}
	if (clickX >= 1120 && clickX <= 1380 && clickY >= 560 && clickY <= 660) {
		sell();
	}
	for (i = 0; i < units.length; i++) {
		if (clickX >= units[i].x && clickX <= units[i].x + 80 && clickY >= units[i].y && clickY <= units[i].y + 100) {
			idx = i;
			sw1 = true;
		}
	}
	if (clickX >= 1120 && clickX <= 1380 && clickY >= 740 && clickY <= 790) {
		stage += 1;
	}
});
document.addEventListener('contextmenu', function() {
	event.preventDefault();
	units[idx].dx = event.clientX - canvas.offsetLeft - 40;
	units[idx].dy = event.clientY - canvas.offsetTop - 50;
	if (sw1) {
		units[idx].move = true;
	}
	if (units[idx].dx < 150 || units[idx].dx > 570 || units[idx].dy < 150 || units[idx].dy > 550) {
		units[idx].move = false;
	}
});

function randomUnit() {
	let r = Math.floor(Math.random() * (10 - 0) + 0);
	units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[r].img , kind : unitsType[r].kind, grade : unitsType[r].grade, cnt : 0, sell : false });
}

function drawUnit() {
	for (i = 0; i < units.length; i++) {
		context.drawImage(units[i].img, units[i].x, units[i].y);
		
		units[i].cnt += 4;
		
		//buf1.innerHTML = units[0].x + 40;
		//buf2.innerHTML = units[0].y + 50;
		
		if (units[i].x + 40 <= 300 && units[i].y + 50 <= 500) { // 왼쪽으로 공격
			context.drawImage(units[i].kind, units[i].x + 20 - units[i].cnt, units[i].y + 25);
			if (units[i].x + 20 - units[i].cnt <= 5) {
				units[i].cnt = 0;
			}
			for (j = 0; j < enemy.length; j++) {
				distance = Math.sqrt( Math.pow(units[i].x + 20 - units[i].cnt - (enemy[j].x + 40), 2) + Math.pow(units[i].y + 25 - (enemy[j].y + 50), 2) );
				if (distance < 50) {
					if (units[i].kind == zAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1.5) * (zergEnhence + 1);
					}
					if (units[i].kind == tAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1.5) * (terranEnhence + 1);
					}
					if (units[i].kind == pAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1.5) * (protoseEnhence + 1);
					}
				}
			}
		}
		if (units[i].x + 40 >= 300 && units[i].y + 50 <= 300) { // 위쪽으로 공격
			context.drawImage(units[i].kind, units[i].x + 20, units[i].y + 25 - units[i].cnt);
			if (units[i].y + 25 - units[i].cnt <= 5) {
				units[i].cnt = 0;
			}
			for (j = 0; j < enemy.length; j++) {
				distance = Math.sqrt( Math.pow(units[i].x + 20 - (enemy[j].x + 40), 2) + Math.pow(units[i].y + 25 - units[i].cnt - (enemy[j].y + 50), 2) );
				if (distance < 50) {
					if (units[i].kind == zAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (zergEnhence + 1);
					}
					if (units[i].kind == tAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (terranEnhence + 1);
					}
					if (units[i].kind == pAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (protoseEnhence + 1);
					}
				}
			}
		}
		if (units[i].x + 40 >= 500 && units[i].y + 50 >= 300) { // 오른쪽으로 공격
			context.drawImage(units[i].kind, units[i].x + 20 + units[i].cnt, units[i].y + 25);
			if (units[i].x + 20 + units[i].cnt >= 795) {
				units[i].cnt = 0;
			}
			for (j = 0; j < enemy.length; j++) {
				distance = Math.sqrt( Math.pow(units[i].x + 20 + units[i].cnt - (enemy[j].x + 40), 2) + Math.pow(units[i].y + 25 - (enemy[j].y + 50), 2) );
				if (distance < 50) {
					if (units[i].kind == zAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (zergEnhence + 1);
					}
					if (units[i].kind == tAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (terranEnhence + 1);
					}
					if (units[i].kind == pAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (protoseEnhence + 1);
					}
				}
			}
		}
		if (units[i].x + 40 <= 500 && units[i].y + 50 >= 500) { // 아래쪽으로 공격
			context.drawImage(units[i].kind, units[i].x + 20, units[i].y + 25 + units[i].cnt);
			if (units[i].y + 25 + units[i].cnt >= 795) {
				units[i].cnt = 0;
			}
			for (j = 0; j < enemy.length; j++) {
				distance = Math.sqrt( Math.pow(units[i].x + 20 - (enemy[j].x + 40), 2) + Math.pow(units[i].y + 25 + units[i].cnt - (enemy[j].y + 50), 2) );
				if (distance < 50) {
					if (units[i].kind == zAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (zergEnhence + 1);
					}
					if (units[i].kind == tAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (terranEnhence + 1);
					}
					if (units[i].kind == pAImg) {
						enemy[j].hp -= (units[i].grade * units[i].grade + 1) * (protoseEnhence + 1);
					}
				}
			}
		}
	}
}

function moving() {
	for (i = 0; i < units.length; i++) {
		if (units[i].move) {
			if (units[i].x == units[i].dx && units[i].y == units[i].dy) {
				units[i].move = false;
			}
			if (units[i].x < units[i].dx) {
				units[i].x += 1;
			}
			if (units[i].x > units[i].dx) {
				units[i].x -= 1;
			}
			if (units[i].y < units[i].dy) {
				units[i].y += 1;
			}
			if (units[i].y > units[i].dy) {
				units[i].y -= 1;
			}
		}
	}
}

function enemies() {
	if (stage == 1){
		if (frame % 180 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[0].hp, fhp : enemiesType[0].hp, img : enemiesType[0].img });
		}
	}
	if (stage == 2){
		if (frame % 170 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[1].hp, fhp : enemiesType[1].hp, img : enemiesType[1].img });
		}
	}
	if (stage == 3){
		if (frame % 160 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[2].hp, fhp : enemiesType[2].hp, img : enemiesType[2].img });
		}
	}
	if (stage == 4){
		if (frame % 150 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[3].hp, fhp : enemiesType[3].hp, img : enemiesType[3].img });
		}
	}
	if (stage == 5){
		if (frame % 140 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[4].hp, fhp : enemiesType[4].hp, img : enemiesType[4].img });
		}
	}
	if (stage == 6){
		if (frame % 130 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[5].hp, fhp : enemiesType[5].hp, img : enemiesType[5].img });
		}
	}
	if (stage == 7){
		if (frame % 120 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[6].hp, fhp : enemiesType[6].hp, img : enemiesType[6].img });
		}
	}
	if (stage == 8){
		if (frame % 110 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[7].hp, fhp : enemiesType[7].hp, img : enemiesType[7].img });
		}
	}
	if (stage == 9){
		if (frame % 101 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[8].hp, fhp : enemiesType[8].hp, img : enemiesType[8].img });
		}
	}
	if (stage == 10){
		if (frame % 90 == 0) {
			enemy.push({ x : 20, y : 20, hp : enemiesType[9].hp, fhp : enemiesType[9].hp, img : enemiesType[9].img });
		}
	}
	
	
	for (i = 0; i < enemy.length; i++) {
		if (enemy[i].hp <= 0) {
			money += (stage * 3 + 1);
			enemy.splice(i, 1);
		}
		else {
			if (enemy[i].x == 20 && enemy[i].y < 680) {
				enemy[i].y += 2;
			}
			if (enemy[i].x < 700 && enemy[i].y == 680) {
				enemy[i].x += 2;
			}
			if (enemy[i].x == 700 && enemy[i].y > 20) {
				enemy[i].y -= 2;
			}
			if (enemy[i].x > 20 && enemy[i].y == 20) {
				enemy[i].x -= 2;
			}
			context.fillStyle = 'green';
			context.fillRect(enemy[i].x - 11, enemy[i].y + 105, (enemy[i].hp / enemy[i].fhp) * 100, 20);
			context.strokeRect(enemy[i].x - 11, enemy[i].y + 105, 100, 20);
			context.drawImage(enemy[i].img, enemy[i].x, enemy[i].y);
		}
	}
}

function sell() {
	for (i = 0; i < units.length; i++) {
		if (units[i].x + 80 >= 489 && units[i].y <= 271) {
			units[i].sell = true;
		}
	}
	for (i = 0; i < units.length; i++) {
		if (units[i].sell == true) {
			if (units[i].grade == 0) {
				money += 20;
			}
			if (units[i].grade == 1) {
				money += 30;
			}
			if (units[i].grade == 2) {
				money += 200;
			}
			units.splice(i, 1);
			i = 100;
		}
	}
}

function combine() {
	console.log('combine');
	for (i1 = 0; i1 < units.length; i1++) {
		if (units[i1].x + 80 >= 489 && units[i1].y <= 271) {
			for (i2 = 0; i2 < units.length; i2++) {
				if (units[i2].x + 80 >= 489 && units[i2].y <= 271) {
					if (units[i1].img == u01Img && units[i2].img == u02Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[10].img , kind : unitsType[10].kind, grade : unitsType[10].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == u03Img && units[i2].img == u04Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[11].img , kind : unitsType[11].kind, grade : unitsType[11].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == uaImg && units[i2].img == ubImg) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[12].img , kind : unitsType[12].kind, grade : unitsType[12].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == u01Img && units[i2].img == u10Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[13].img , kind : unitsType[13].kind, grade : unitsType[13].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == u05Img && units[i2].img == u07Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[14].img , kind : unitsType[14].kind, grade : unitsType[14].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == u06Img && units[i2].img == u09Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[15].img , kind : unitsType[15].kind, grade : unitsType[15].grade, cnt : 0, sell : false });
					}
					else if (units[i1].img == u05Img && units[i2].img == u08Img) {
						if (i1 < i2) {
							units.splice(i1, 1); units.splice(i2 - 1, 1);
						}
						else {
							units.splice(i1, 1); units.splice(i2, 1);
						}
						units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[16].img , kind : unitsType[16].kind, grade : unitsType[16].grade, cnt : 0, sell : false });
					}
					for (i3 = 0; i3 < units.length; i3++) {
						if (units[i3].x + 80 >= 489 && units[i3].y <= 271) {
							if (units[i1].img == ueImg && units[i2].img == u04Img && units[i3].img == u08Img) {
								eraserUnit3(i1, i2, i3);
								units.push({ x : 360, y : 350, dx : 0, dy : 0, move : false, img : unitsType[17].img , kind : unitsType[17].kind, grade : unitsType[17].grade, cnt : 0, sell : false });
							}
							for (i4 = 0; i4 < units.length; i4++) {
								if (units[i4].x + 80 >= 489 && units[i4].y <= 271) {
									
								}
							}
						}
					}
				}
			}
		}
	}
}

function eraserUnit3(x1, x2, x3) {
	let arr = [x1, x2, x3];
	for (i = 0; i < 2; i++) {
		for (j = i + 1; j < 3; j++) {
			if (arr[i] < arr[j]) {
				tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
		}
	}
	for (i = 0; i < 3; i++) {
		units.splice(arr[i], 1);
	}
	arr.splice(0);
}

function eraserUnit4(x1, x2, x3, x4) {
	let arr = [x1, x2, x3, x4];
	for (i = 0; i < 3; i++) {
		for (j = i + 1; j < 4; j++) {
			if (arr[i] < arr[j]) {
				tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
		}
	}
	for (i = 0; i < 4; i++) {
		units.splice(arr[i], 1);
	}
	arr.splice(0);
}