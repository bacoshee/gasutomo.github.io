const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];

// スロット画像パス
const symbols = [
    'img/cola.png',
    'img/calpis.png',
    'img/calpissoda.png',
    'img/fanta.png',
    'img/kira.png',
    'img/drpeppa.png',
    'img/ginger.png',
    'img/lemon.png',
    'img/orange.png'
];

let slotTimers = [];
let isSpinning = [false, false, false];

// ▼ スタート処理
function startSlot() {
    document.getElementById('result').textContent = '';

    // ★ スタートボタン非活性（灰色にするだけ）
    const startBtn = document.getElementById('startButton');
    startBtn.disabled = true;
    startBtn.classList.add('disabled');

    // ★ ストップボタンを表示（非活性にはしない）
    document.querySelectorAll('.stopButton').forEach(btn => {
        btn.style.display = 'block';
    });

    for (let i = 0; i < slots.length; i++) {
        isSpinning[i] = true;
        slotTimers[i] = setInterval(() => {
            const r = Math.floor(Math.random() * symbols.length);
            slots[i].innerHTML = `<img src="${symbols[r]}" class="slot-img">`;
        }, 100);
    }
}



// ▼ ストップ処理
function stopSlot(reelIndex) {
    if (isSpinning[reelIndex]) {
        clearInterval(slotTimers[reelIndex]);
        isSpinning[reelIndex] = false;

        // ★ 押したストップボタンを非活性（復活させない）
        const stopBtn = document.getElementById(`stopButton${reelIndex + 1}`);
        stopBtn.disabled = true;
        stopBtn.classList.add('disabled');

        // ★ 全停止したら結果を出す
        if (!isSpinning.includes(true)) {
            checkResult();
        }
    }
}



// ▼ 結果
function checkResult() {
    const result = slots.map(slot => slot.querySelector('img').src);

    document.getElementById('result').innerHTML =
        '【ガス友からのお願い】<br>出た目をすべて混ぜて飲んでね！';
}


// ▼ イベント付与
document.getElementById('startButton').addEventListener('click', startSlot);
document.getElementById('stopButton1').addEventListener('click', () => stopSlot(0));
document.getElementById('stopButton2').addEventListener('click', () => stopSlot(1));
document.getElementById('stopButton3').addEventListener('click', () => stopSlot(2));
