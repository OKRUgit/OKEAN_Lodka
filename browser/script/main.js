llet connected = false;
let serverIP = "192.168.4.1";
let devicePassword = "";

// DOM-элементы
const setupSection = document.querySelector('.setup');
const controlPanel = document.getElementById('controlPanel');
const status = document.querySelector('.status');
const serverIPInput = document.getElementById('serverIP');
const passwordInput = document.getElementById('devicePassword');
const connectBtn = document.getElementById('connectBtn');
const backBtn = document.getElementById('backBtn');

// Кнопка "Подключиться"
connectBtn.onclick = function () {
  serverIP = serverIPInput.value.trim();
  devicePassword = passwordInput.value.trim();

  if (!serverIP) {
    alert("Введите IP-адрес сервера!");
    return;
  }

  status.textContent = "Проверка пароля...";
  status.style.color = "orange";

  // Эмуляция проверки (в будущем — реальный запрос к ESP)
  setTimeout(() => {
    if (devicePassword === "okean") {  // Простой пароль для теста
      status.textContent = "✅ Подключено!";
      status.style.color = "green";
      setupSection.style.display = "none";
      controlPanel.style.display = "block";
      connected = true;
    } else {
      status.textContent = "❌ Неверный пароль";
      status.style.color = "red";
      setTimeout(() => {
        status.textContent = "Не подключено";
        status.style.color = "black";
      }, 2000);
    }
  }, 1000);
};

// Кнопка "Назад"
backBtn.onclick = function () {
  controlPanel.style.display = "none";
  setupSection.style.display = "block";
  connected = false;
  status.textContent = "Не подключено";
  status.style.color = "black";
};

// Отправка команды
function sendCommand(command) {
  if (!connected) return;

  console.log(`Отправка: ${serverIP}/${command}`);
  fetch(`http://${serverIP}/${command}`, {
    method: "GET",
    mode: "cors",  // пока для теста, позже может потребоваться настройка ESP
  })
  .then(response => {
    if (response.ok) {
      console.log("Команда выполнена");
    } else {
      console.warn("Ошибка:", response.status);
    }
  })
  .catch(err => {
    console.error("Ошибка связи:", err);
    alert("❌ Нет связи с сервером. Проверьте Wi-Fi и IP.");
  });
}

// Кнопки управления
document.getElementById("btnOn").onclick = () => sendCommand("led/on");
document.getElementById("btnOff").onclick = () => sendCommand("led/off");