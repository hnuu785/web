let u01Img = new Image();
u01Img.src = 'image/unit/01.png';
let u02Img = new Image();
u02Img.src = 'image/unit/02.png';
let u03Img = new Image();
u03Img.src = 'image/unit/03.png';
let u04Img = new Image();
u04Img.src = 'image/unit/04.png';
let u05Img = new Image();
u05Img.src = 'image/unit/05.png';
let u06Img = new Image();
u06Img.src = 'image/unit/06.png';
let u07Img = new Image();
u07Img.src = 'image/unit/07.png';
let u08Img = new Image();
u08Img.src = 'image/unit/08.png';
let u09Img = new Image();
u09Img.src = 'image/unit/09.png';
let u10Img = new Image();
u10Img.src = 'image/unit/10.png';

let uaImg = new Image();
uaImg.src = 'image/unit/a.png';
let ubImg = new Image();
ubImg.src = 'image/unit/b.png';
let ucImg = new Image();
ucImg.src = 'image/unit/c.png';
let udImg = new Image();
udImg.src = 'image/unit/d.png';
let ueImg = new Image();
ueImg.src = 'image/unit/e.png';
let ufImg = new Image();
ufImg.src = 'image/unit/f.png';

let uAImg = new Image();
uAImg.src = 'image/unit/A.png';
let uBImg = new Image();
uBImg.src = 'image/unit/B.png';

let zAImg = new Image();
zAImg.src = 'image/attack/zergAttack.png';
let tAImg = new Image();
tAImg.src = 'image/attack/terranAttack.png';
let pAImg = new Image();
pAImg.src = 'image/attack/protoseAttack.png';

let unitsType = [
	{ img : u01Img, kind : zAImg, grade : 0 },
	{ img : u02Img, kind : zAImg, grade : 0 },
	{ img : u03Img, kind : zAImg, grade : 0 },
	{ img : u04Img, kind : zAImg, grade : 0 },
	{ img : u05Img, kind : pAImg, grade : 0 },
	{ img : u06Img, kind : pAImg, grade : 0 },
	{ img : u07Img, kind : pAImg, grade : 0 },
	{ img : u08Img, kind : tAImg, grade : 0 },
	{ img : u09Img, kind : tAImg, grade : 0 },
	{ img : u10Img, kind : tAImg, grade : 0 },
	{ img : uaImg, kind : zAImg, grade : 1 },
	{ img : ubImg, kind : zAImg, grade : 1 },
	{ img : uAImg, kind : zAImg, grade : 2 },
	{ img : ucImg, kind : tAImg, grade : 1 },
	{ img : udImg, kind : pAImg, grade : 1 },
	{ img : ueImg, kind : pAImg, grade : 1 },
	{ img : ufImg, kind : tAImg, grade : 1 },
	{ img : uBImg, kind : tAImg, grade : 2 },
];

/*
저그
01 02 = a (1) 10번
03 04 = b (1) 11번
 a  b = A (2) 12번
테란
01 10 = c (1) 13번
05 08 = f (1) 16번
 e 04 08 = B (2) 17번
프로토스
05 07 = d (1) 14번
06 09 = e (1) 15번
*/

let e01Img = new Image();
e01Img.src = 'image/enemy/01.png';
let e02Img = new Image();
e02Img.src = 'image/enemy/02.png';
let e03Img = new Image();
e03Img.src = 'image/enemy/03.png';
let e04Img = new Image();
e04Img.src = 'image/enemy/04.png';
let e05Img = new Image();
e05Img.src = 'image/enemy/05.png';
let e06Img = new Image();
e06Img.src = 'image/enemy/06.png';
let e07Img = new Image();
e07Img.src = 'image/enemy/07.png';
let e08Img = new Image();
e08Img.src = 'image/enemy/08.png';
let e09Img = new Image();
e09Img.src = 'image/enemy/09.png';
let e10Img = new Image();
e10Img.src = 'image/enemy/10.png';

let enemiesType = [
	{ hp : 100, img : e01Img },
	{ hp : 500, img : e02Img },
	{ hp : 2000, img : e03Img },
	{ hp : 5000, img : e04Img },
	{ hp : 10000, img : e05Img },
	{ hp : 20000, img : e06Img },
	{ hp : 40000, img : e07Img },
	{ hp : 70000, img : e08Img },
	{ hp : 120000, img : e09Img },
	{ hp : 10000000, img : e10Img },
];