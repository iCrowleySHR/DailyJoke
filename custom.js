  let linkAPI = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist&lang=en'
  generationJoke()

  const nsfw = document.querySelector('#nsfw')
  const religious = document.querySelector('#religious')
  const political = document.querySelector('#political')
  const sexist = document.querySelector('#sexist')
  const explicit = document.querySelector('#explicit')

  let btnApply = document.querySelector('#btnApply')
  btnApply.addEventListener('click',function(){
    
    let blackList = [''] //O usuario escolhe se não quer alguns tipos de piadas
    if(nsfw.checked){
      blackList.push('nsfw')
    }
    if(religious.checked){
      blackList.push('religious')
    }
    if(political.checked){
      blackList.push('political')
    }
    if(sexist.checked){
      blackList.push('sexist')
    }
    if(explicit.checked){
      blackList.push('explicit')
    }

    //Select selecionado o idioma do usuario
    let selectLang = document.querySelector('#lang') 
    let lang = selectLang.options[selectLang.selectedIndex].value

    //Link da api com as informações inseridas do Usuario
    linkAPI = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist${blackList}&${lang}`
    generationJoke()
    
  })

function generationJoke(){
  //Manipulação da API 
    fetch(`${linkAPI}`, {
      method: 'GET'
    })
      .then(resposta => resposta.json())
      .then(dados => {

        if(dados){ // valida que existe algo dentro da variavel Dados
          let jokeArea = document.querySelector('.jokeArea')

          if(dados.type === 'single'){ // Piada com apenas uma parte
            jokeArea.innerHTML= dados.joke
          }
            else if(dados.type === 'twopart'){ // piada com duas partes
            jokeArea.innerHTML= `${dados.setup} ${dados.delivery}`
            }
              //console.log(dados)
              //console.log(linkAPI)  
        }

      })
      .catch(erro => {
        console.error('Erro:', erro);
      });
}


// console.log(linkAPI)
