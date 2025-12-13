let connected = false;
let serverIP = "192.168.4.1";
let devicePassword = "";

// DOM-элементы — добавим новые
const deviceStatus = document.getElementById('deviceStatus');
const currentNetwork = document.getElementById('currentNetwork');
const deviceIP = document.getElementById('deviceIP');
const scanBtn = document.getElementById('scanBtn');
const startAPBtn = document.getElementById('startAPBtn');

const setupSection = document.querySelector('.setup');
const controlPanel = document.getElementById('controlPanel');
const status = document.querySelector('.status');
const serverIPInput = document.getElementById('serverIP');
const passwordInput = document.getElementById('devicePassword');
const connectBtn = document.getElementById('connectBtn');
const backBtn = document.getElementById('backBtn');

// Эмуляция: статус Wi-Fi
function updateWiFiStatus() {
  status.textContent = "Запрос статуса...";
  status.style.color = "orange";

  // Эмуляция задержки — как будто идёт запрос к ESP
  setTimeout(() => {
    // Случайный режим: либо STA (подключён к сети), либо AP (своя сеть)
    const modes = [
      { status: "Режим: STA", network: "HomeNet", ip: "192.168.1.105" },
      { status: "Режим: AP", network: "OKEAN_Lodka", ip: "192.168.4.1" },
      { status: "Нет подключения", network: "—", ip: "—" }
    ];
    const mode = modes[Math.floor(Math.random() * modes.length)];

    deviceStatus.textContent = mode.status;
    currentNetwork.textContent = mode.network;
    deviceIP.textContent = mode.ip;

    status.textContent = "Готово";
    status.style.color = "green";
  }, 1200);
}

// Эмуляция: сканирование сетей
scanBtn.onclick = function () {
  scanBtn.disabled = true;
  scanBtn.textContent = "Сканирую...";

  setTimeout(() => {
    alert("Сканирование завершено!\n\n(Это эмуляция. В реальности: HomeNet, WiFi_Guest, OKEAN_Test)");
    scanBtn.disabled = false;
    scanBtn.textContent = "Обновить сети";
    // Можно обновить статус
    updateWiFiStatus();
  }, 1500);
};

// Эмуляция: запуск точки доступа
startAPBtn.onclick = function () {
  if (confirm("Запустить режим точки доступа?")) {
    startAPBtn.disabled = true;
    status.textContent = "Запуск AP...";
    status.style.color = "blue";

    setTimeout(() => {
      deviceStatus.textContent = "Режим: AP";
      currentNetwork.textContent = "OKEAN_Lodka";
      deviceIP.textContent = "192.168.4.1";
      serverIPInput.value = "192.168.4.1";
      status.textContent = "Точка доступа запущена";
      status.style.color = "green";
      startAPBtn.disabled = false;
    }, 1800);
  }
};

// Инициализация — при загрузке
window.onload = function () {
  updateWiFiStatus(); // показать статус
};

// --- Остальной код (подключение, команды) остаётся как был ---
// (скопируй сюда предыдущий код из connectBtn, sendCommand и т.д.)
// или я пришлю всё целиком в следующем сообщении
// Кнопки управления
document.getElementById("btnOn").onclick = () => sendCommand("led/on");
document.getElementById("btnOff").onclick = () => sendCommand("led/off");