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
}