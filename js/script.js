document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const resetBtn = document.getElementById('reset');  // nuevo botón reset
  const textoArea = document.getElementById('texto');
  const guardarBtn = document.getElementById('guardar');

  if (!('webkitSpeechRecognition' in window)) {
    alert('Tu navegador no soporta la Web Speech API. Usa Chrome o Edge.');
    startBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = true;  // deshabilitar reset también
    guardarBtn.disabled = true;
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = event => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    textoArea.value += transcript + ' ';
  };

  recognition.onerror = event => {
    console.error('Error en reconocimiento:', event.error);
  };

  startBtn.onclick = () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  stopBtn.onclick = () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  guardarBtn.onclick = () => {
    const texto = textoArea.value.trim();
    if (texto.length === 0) {
      alert('No hay texto para guardar.');
      return;
    }

    fetch('guardar.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: 'texto=' + encodeURIComponent(texto)
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      textoArea.value = '';
    })
    .catch(error => {
      alert('Error al guardar el texto en el servidor.');
      console.error(error);
    });
  };

  // NUEVO: botón reset para limpiar textarea
  resetBtn.onclick = () => {
    if (confirm('¿Seguro que quieres borrar todo el texto y empezar de nuevo?')) {
      textoArea.value = '';
      // Opcional: detener grabación si está activa
      if (stopBtn.disabled === false) {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
      }
    }
  };

  stopBtn.disabled = true;
});