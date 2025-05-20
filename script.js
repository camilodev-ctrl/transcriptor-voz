const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const textoArea = document.getElementById('texto');
const guardarBtn = document.getElementById('guardar');


let recognition;

if('webkitSpeechRecognition' in window){
    recognition = new webkitSpeechrecognition();
    recognition.lang = 'es-Es';
    recognition.continuous = true;
    recognition.interimResults = false;


    recognition.onresult = event => {
        let transcript = '';
        for(let i = event.resultIndex; i < event.results.length; i++){
            transcript += event.results[i][0].transcript;
        }
        textoArea.value += transcript + ' ';
    };

    recognition.onerror = event=>{
        console.error('error en reconocimiento:',event.error);
    }

}else{
    alert('tu navegador no soporta la Web Speech API');
}

startBtn.onclick =()=>{recognition && recognition.start()};
stoptBtn.onclick =()=>{recognition && recognition.stop()};

// enviar texto a php
guardarBtn.onclick = () =>{
    fetch('guardar.php',{
        method: 'POST',
        headers:{'content-Type': 'application/x-www-form-urlencoded'},
        body: 'texto=' + encodeURIComponent(textoAreavalue)
    })
    .then(res => res.text())
    .then(data => alert('texto guardado en el servidor'))
    .catch(err => alert('error al guardar el texto'));
}