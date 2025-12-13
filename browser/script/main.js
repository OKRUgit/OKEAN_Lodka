let connected = false;

// При загрузке страницы
window.onload = function() {
  const status = document.querySelector('.status');
  setTimeout(() => {
    status.textContent = "Статус: готово";
    status.style.color = "green";
    connected = true;
  }, 1500);
};

// Обработчики кнопок
document.getElementById("btnOn").onclick = function() {
  if (!connected) return;
  console.log("Команда: ВКЛ");
  alert("Команда отправлена: ВКЛ");
};

document.getElementById("btnOff").onclick = function() {
  if (!connected) return;
  console.log("Команда: ВЫКЛ");
  alert("Команда отправлена: ВЫКЛ");
};