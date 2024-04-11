var linhas = 3
var colunas = 3

var blocoAtual //bloco que estou
var outroBloco //bloco que quero chegar

var jogadas = 0

//var imgOrdem = ["1","2","3","4","5","6","7","8","9"]

var imgOrdem =["4","2","8","5","1","6","7","9","3"]

window.onload = function(){
    for (let r=0; r < linhas; r++){
        for(let c = 0; c < colunas; c++){
            //<img id="0-0" src="1.jpg">
            let bloco = document.createElement("img")
            bloco.id = r.toString() + "-" + c.toString()//coordenadas
            bloco.src = "Img/"+ imgOrdem.shift() + ".jpg" 
            //O metodo .shift() remove o valor do indice 0 do array e guarda na variável a qual foi atribuido
            
            //Arrastar:
            bloco.addEventListener("dragstart", arrastarIniciar)//Quando você clica em uma imagem para arrastar
            bloco.addEventListener("dragover", arrasteSobre)//Mover a imagem enquanto clica
            bloco.addEventListener("dragenter", arrastarEntrar)//Arrastando uma imagem para outra
            bloco.addEventListener("dragleave", arrastarSair)//Deixando a nova imagem
            bloco.addEventListener("drop", arrastarDerrubar)//Image sobre imagem, arrasta imagem
            bloco.addEventListener("dragend", arrastarFinal)//Depois de arrastar e soltar, trocar os dois blocos
            
            //Agora vamos inserir a variável 'bloco' na div board
            // ela carrega a tag img que foi constrída
            document.getElementById("quadro").append(bloco)
        }
    }
}


function arrastarIniciar(){
    blocoAtual = this //Bloco atual
}

function arrasteSobre(e){
    e.preventDefault()
}

function arrastarEntrar(e){
    e.preventDefault()
}

function arrastarSair(){

}

function arrastarDerrubar(){
    outroBloco = this //bloco de imagem sendo solto em cima do outro
}

function arrastarFinal(){
    if(!outroBloco.src.includes("3.jpg")){
        return
    }

    let coordenadasIniciais = blocoAtual.id.split("-") //Converte "0-0" => ["0","0"] Se o id for "0-0" vamos dividir a string pelo ífen e obter um array e assim podemos analisar
    let r = parseInt(coordenadasIniciais[0])//rows
    let c = parseInt(coordenadasIniciais[1])//colums

    let outrasCoordenadas = outroBloco.id.split("-")
    let r2 = parseInt(outrasCoordenadas[0])
    let c2 = parseInt(outrasCoordenadas[1])
    // Verificar se estão na mesma linha e se c2 está a esquerda de c
    let esquerda = r == r2 && c2 == c-1
    // Verificar se estão na mesma linha e se c2 está a direita de c
    let direita = r == r2 && c2 == c+1
    // Verificar se estão na mesma coluna e se r2 está a esquerda de r
    let cima = c == c2 && r2 == r-1
    //Verificar se estão na mesma coluna e se r2 está a direita de r
    let baixo = c == c2 && r2 == r+1

    let adjacente = esquerda || direita || cima || baixo

    if (adjacente){
        let imgAtual = blocoAtual.src
        let outraImg = outroBloco.src

        blocoAtual.src = outraImg
        outroBloco.src = imgAtual

        jogadas += 1

        document.getElementById("jogadas").innerText = jogadas
    }
}
