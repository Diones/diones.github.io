function exportVid(blob) {
    const vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    document.body.appendChild(vid);
    const a = document.createElement('a');
    a.download = 'myvid.webm';
    a.href = vid.src;
    a.textContent = 'download the video';
    document.body.appendChild(a);
  }

function startRecording(canvas) {
    const chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = canvas.captureStream(); // grab our canvas MediaStream
    const rec = new MediaRecorder(stream); // init the recorder
    // every time the recorder has new data, we will store it in our array
    rec.ondataavailable = e => chunks.push(e.data);
    // only when the recorder stops, we construct a complete Blob from all the chunks
    rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
    
    rec.start();
    setTimeout(()=>{ console.log('stopping'); rec.stop()}, 15000); // stop recording in 3s
  }
//  Quando a página for carregada 
//  Chama a função carregar()
//
window.onload = function carregar() {
//  Captura o Canvas
    var canvas = document.getElementById("canvas");
//  Passagem do canvas para a função efeitoMatrix()
    efeitoMatrix(canvas);
//  Função que efetua o efeito matrix
    function efeitoMatrix(neo) {
    //	Variáveis
        var tela = window.screen;
        var largura = (neo.width = tela.width);
        var altura = (neo.height = tela.height);
        var letras = Array(256).join(1).split("");
    //	Desenha o efeito matrix na tela
        var desenhaMatrix = function () {
    //  Fundo Preto e transparência em .05
        neo.getContext("2d").fillStyle = "rgba(0,0,0,.05)";
        neo.getContext("2d").fillRect(0, 0, largura, altura);
    //	Letras
        neo.getContext("2d").fillStyle = "#0F0";
    //  Função Map que desenha as letras
        letras.map(function (posicao_y, index) {
    //	Texto
        // var texto = String.fromCharCode(48 + Math.random() * 33);
        var texto = String.fromCharCode(51);
        var posicao_x = index * 20;
        neo.getContext("2d").fillText(texto, posicao_x, posicao_y);
        neo.getContext("2d").font = '33px Arial';
    //	Array index de descreve o efeito matrix
        letras[index] = posicao_y > 758 + Math.random() * 1e4 ? 0 : posicao_y + 30;
    //
        });
      }
    //  A um intervalo de milisegundos a função desenhaMatrix() é chamada
        setInterval(desenhaMatrix, 60);
        startRecording(neo);
    }
}