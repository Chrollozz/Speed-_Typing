// ดึง Element ต่าง ๆ จาก HTML มาใช้งาน
const wordEl = document.getElementById('word'); // แสดงคำสุ่ม
const textEl = document.getElementById('text'); // ช่องให้ผู้เล่นพิมพ์คำ
const scoreEl = document.getElementById('score'); // แสดงคะแนน
const timeEl = document.getElementById('time'); // แสดงเวลา

const btnLevelEl = document.getElementById('level-btn'); // ปุ่มสำหรับเปิด/ปิดการตั้งค่าระดับความยาก
const settingsEl = document.getElementById('settings'); // ส่วนของการตั้งค่าระดับความยาก
const levelFormEl = document.getElementById('level-form'); // ฟอร์มการตั้งค่าระดับความยาก
const levelEl = document.getElementById('level'); // เลือกระดับความยาก
const gameoverEl = document.getElementById('gameover-container'); // ส่วนแสดงข้อความเมื่อจบเกม

// คำที่ใช้ในเกม (สัตว์ต่าง ๆ)
const words = [
    "ช้าง", "เสือ", "สิงโต", "วัว", "ควาย", "แพะ", "แกะ", "ลิง", "หมู", 
    "กระรอก", "ค้างคาว", "นกกระจอก", "นกเงือก", "ไก่", "เป็ด", "ห่าน", 
    "นกยูง", "นกอินทรี", "นกแก้ว", "งู", "จระเข้", "เต่า", "ตะพาบน้ำ", 
    "ตะกวด", "กิ้งก่า", "ตุ๊กแก", "ปลาหมอ", "ปลากระพง", "ปลาฉลาม", 
    "ปลาวาฬ", "ปลาหมึก", "กุ้ง", "ปู", "หอย", "แมงดาทะเล", "ผีเสื้อ", 
    "แมลงวัน", "แมลงปอ", "มด", "ปลวก", "แมลงสาบ", "ตั๊กแตน", "ยุง"
];

let randomText; // เก็บคำที่สุ่มมาแสดง
let score = 0; // คะแนนเริ่มต้น
let time = 10; // เวลาสำหรับระดับปานกลาง (easy => 15, medium => 10, hard => 5)
const saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium'; // บันทึกระดับความยากที่เลือกไว้ใน Local Storage

let level = 'medium'; // กำหนดระดับความยากเริ่มต้น

const timeInterval = setInterval(updateTime, 1000); // ตั้งเวลานับถอยหลัง (1 วินาที)

// ฟังก์ชันสุ่มคำ
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// ฟังก์ชันแสดงคำสุ่มและเวลาใน UI
function displayWordToUI() {
    randomText = getRandomWord(); // สุ่มคำใหม่
    wordEl.innerHTML = randomText; // แสดงคำที่สุ่มได้
    timeEl.innerHTML = time; // แสดงเวลา
}

// ตรวจจับการพิมพ์ข้อความในช่อง input
textEl.addEventListener('input', (e) => {
    const inputText = e.target.value; // ข้อความที่ผู้เล่นพิมพ์

    if (inputText === randomText) { // ถ้าพิมพ์ตรงกับคำที่สุ่มมา
        if (saveMode == 'easy') {
            time += 5; // เพิ่มเวลา 5 วินาทีสำหรับระดับง่าย
        } else if (saveMode == 'medium') {
            time += 3; // เพิ่มเวลา 3 วินาทีสำหรับระดับปานกลาง
        } else {
            time += 2; // เพิ่มเวลา 2 วินาทีสำหรับระดับยาก
        }
        displayWordToUI(); // แสดงคำใหม่
        updateScore(); // อัปเดตคะแนน
        e.target.value = ''; // ล้างช่อง input
    }
});

// ฟังก์ชันอัปเดตคะแนน
function updateScore() {
    score += 10; // เพิ่มคะแนน 10 แต้ม
    scoreEl.innerHTML = score; // แสดงคะแนนใหม่
}

// ฟังก์ชันอัปเดตเวลา
function updateTime() {
    time--; // ลดเวลาลง 1 วินาที
    timeEl.innerHTML = time; // แสดงเวลาที่ลดลง
    if (time === 0) { // ถ้าเวลาหมด
        clearInterval(timeInterval); // หยุดนับถอยหลัง
        gameOver(); // เรียกฟังก์ชันจบเกม
    }
}

// ฟังก์ชันแสดงข้อความเมื่อจบเกม
function gameOver() {
    gameoverEl.innerHTML = `
    <h1>จบเกมแล้วนะครับ</h1>
    <p>คะแนนของคุณ = ${score} แต้ม</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>
    `;
    gameoverEl.style.display = 'flex'; // แสดงหน้าจอจบเกม
}

// เปิด/ปิดการตั้งค่าระดับความยาก
btnLevelEl.addEventListener('click', () => {
    settingsEl.classList.toggle('hide'); // เพิ่ม/ลบคลาส 'hide' เพื่อซ่อนหรือแสดงการตั้งค่า
});

// เปลี่ยนระดับความยาก
levelEl.addEventListener('change', (e) => {
    level = e.target.value; // รับค่าระดับที่เลือก
    localStorage.setItem("mode", level); // บันทึกระดับความยากลงใน Local Storage
});

// ฟังก์ชันเริ่มเกม
function startGame() {
    levelEl.value = saveMode; // ตั้งค่าระดับความยากที่บันทึกไว้
    if (saveMode == 'easy') {
        time = 15; // เวลาสำหรับระดับง่าย
    } else if (saveMode == 'medium') {
        time = 10; // เวลาสำหรับระดับปานกลาง
    } else {
        time = 5; // เวลาสำหรับระดับยาก
    }
    displayWordToUI(); // แสดงคำสุ่มใน UI
}
startGame(); // เริ่มเกมทันทีที่โหลด
textEl.focus(); // โฟกัสไปที่ช่อง input ให้พร้อมพิมพ์
