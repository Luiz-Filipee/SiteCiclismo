
const buttonMudarEtapa = document.querySelectorAll('.muda-etapa');
const titleEtapa = document.querySelector('.title-cidade');
const dataEtapa = document.getElementById('data-etapa');
const imagemEtapa = document.getElementById('imagem-etapa');
const buttonSaibaMais = document.querySelector('#saiba-mais');
const infoCategorias = document.querySelector('.info-categorias');
const buttonPatrocinio = document.querySelector('#button-patrocinio');

const buttonLogin = document.getElementById('button-login');
const ulNavHeader = document.querySelectorAll('.app__header-nav-list-item');

const iconeUser = document.querySelector('.icone-user');
const menuUser = document.getElementById('menu-lateral');


document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const distanceToTarget = targetSection.getBoundingClientRect().top;
            const startingY = window.pageYOffset;
            const duration = 1500; 
            let startTime = null;

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                window.scrollTo(0, startingY + distanceToTarget * progress);
                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        });
    });
});

ulNavHeader.forEach(li => {
    li.addEventListener('click', ()=>{
        ulNavHeader.forEach(item => {
            item.classList.remove('selecionado');
        });
        li.classList.add('selecionado');
    });
});


let etapasCadastradas = JSON.parse(localStorage.getItem('etapasCadastradas')) || [];
let indiceEtapaAtual = 0;

const etapaInicial = {
    title: document.querySelector('.title-cidade').textContent,
    data: document.getElementById('data-etapa').textContent,
    imagemEtapa: document.getElementById('imagem-etapa').getAttribute('src')
}

etapasCadastradas.push(etapaInicial);

const etapaTacuru = {
    title: 'Itaquirai',
    data: '21/05/2024',
    imagemEtapa: "/HTML/assets/imagem-tacuru.jpeg"
}

const etapaEldorado = {
    title: 'Eldorado',
    data: '31/06/2024',
    imagemEtapa: "/HTML/assets/imagem-eldorado.jpg"
}

etapasCadastradas.push(etapaTacuru);
etapasCadastradas.push(etapaEldorado);
atualizaListaEtapas();


function atualizaListaEtapas(){
    localStorage.setItem("etapasCadastradas", JSON.stringify(etapasCadastradas));
}

function alteraEtapa(){
    if(etapasCadastradas.length === 0){
        console.log('Nenhuma etapa cadastrada');
        return;
    }

    indiceEtapaAtual = (indiceEtapaAtual + 1) % etapasCadastradas.length;

    const etapaAtual = etapasCadastradas[indiceEtapaAtual];
    titleEtapa.classList.add('fade-out');
    dataEtapa.classList.add('fade-out');
    console.log('Nova imagem:', etapaAtual.imagemEtapa);
    imagemEtapa.classList.add('fade-out');
    infoCategorias.classList.add('fade-out');

    setTimeout(() => {
        titleEtapa.textContent = etapaAtual.title;
        dataEtapa.textContent = etapaAtual.data;
        imagemEtapa.setAttribute('src', etapaAtual.imagemEtapa);

        setTimeout(() => {
            titleEtapa.classList.remove('fade-out');
            dataEtapa.classList.remove('fade-out');
            imagemEtapa.classList.remove('fade-out');
            infoCategorias.classList.remove('fade-out');
        }, 100);
    }, 500);
}

let pessoasCadastradasEtapas = JSON.parse(localStorage.getItem('pessoasCadastradasEtapas')) || [];

function atualizaListaPessoas(){
    localStorage.setItem("pessoasCadastradasEtapas", JSON.stringify(pessoasCadastradasEtapas));
}

buttonSaibaMais.addEventListener('click', function(){
    const etapaSelecionado = etapasCadastradas[indiceEtapaAtual];
    Swal.fire({
        title: `Etapa ${etapaSelecionado.title}`,
        icon: "info",
        html: `
            <form style="display: flex; flex-direction: column; gap: 15px;">
                <label for="nome">Nome</label>
                <input id="input-nome" style="border: 1px solid #396DD5; border-radius: 10px; padding: 5px 5px;" type="text" name="nome">
                <label for="equipe">Equipe</label>
                <input id="input-equipe" style="border: 1px solid #396DD5; border-radius: 10px; padding: 5px 5px;" type="text" name="equipe">
                <label for="etapas">Selecione a Categoria</label>
                    <select id="select-categoria" style="border: 1px solid #396DD5; border-radius: 10px; padding: 5px 5px;" name="categorias" required="required" id="categorias">
                        <optgroup label="1 Pro">
                            <option value="1.1">Pro Masculino
                            <option value="1.2">Pro Feminino
                            <option value="1.3">Pro Livre
                        <optgroup label="2 Master">
                            <option value="2.1">Master A Masculino
                            <option value="2.2">Master B Masculino
                            <option value="2.3">Master A Feminino
                            <option value="2.4">Master B Feminino
                    </select>
                <label for="idade">Data de Nascimento</label>
                <input id="input-data-nascimento" style="border: 1px solid #396DD5; border-radius: 10px; padding: 5px 5px;" type="date" name="idade">
            </form>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Inscrever-se
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
            <i class="fa fa-thumbs-down">Fechar</i>
        `,
        cancelButtonAriaLabel: "Thumbs down",
        preConfirm: () => {
            const nome = document.getElementById('input-nome').value;
            const equipe = document.getElementById('input-equipe').value;
            const selectCategoria = document.getElementById('select-categoria').value;
            const dataNascimento = document.getElementById('input-data-nascimento').value;

            return { nome, equipe, selectCategoria, dataNascimento };
        }
      }).then((result) => {
        if(result.isConfirmed) {
            const pessoa = { nome, equipe, selectCategoria, dataNascimento } = result.value
            pessoasCadastradasEtapas.push(pessoa);
            atualizaListaPessoas();
        }
      });
});

buttonPatrocinio.addEventListener('click', function(){
    Swal.fire({
        icon: "success",
        title: "Entre em contato via email. Obrigado!",
        text: "consesulMs@gmail.com",
        footer: '<a href="#app__section-patrocinadores">Porque virar um patrocinador?</a>'
    });
});


buttonMudarEtapa.forEach(seta => {
    seta.addEventListener('click', ()=>{
        alteraEtapa();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sectionHome = document.getElementById('app__section-home');
    sectionHome.style.backgroundImage = 'url("/HTML/assets/imagem-background-site.png")';
    const imagens = [
        '/HTML/assets/background-ciclismo.jpeg',
        '/HTML/assets/backgournf-image-home-2.jpeg'
    ];

    let imageIndex = 0;

    function mudaImagemBackground(){
        imageIndex = (imageIndex + 1) % imagens.length;
        sectionHome.style.backgroundImage = `url(${imagens[imageIndex]})`;
    }

    setInterval(mudaImagemBackground, 8000);

    const estaLogado = localStorage.getItem('logado') === 'true';
    
    if(estaLogado){
        buttonLogin.classList.add('hidden');
        iconeUser.classList.remove('hidden');
    }
});

iconeUser.addEventListener('click', ()=>{
    menuUser.classList.toggle('active');
});

document.getElementById('minha-conta').addEventListener('click', ()=>{
    const usuarioLogaooJSON = localStorage.getItem('usuarioLogado');

    if(usuarioLogaooJSON){
        const usuarioLogado = JSON.parse(usuarioLogaooJSON);
        const emailUsuario = usuarioLogado.email;
        const nomeUsuario = usuarioLogado.nome;

        const htmlContent = `<form style="display: flex; flex-direction: column; gap: 15px;">
            <p id="email-usuario-logado">${emailUsuario}</p>
            <p id="nome-usuario-logado">${nomeUsuario}</p>             
        </form>
        `
        Swal.fire({
            title: "<strong>Minha Conta</strong>",
            icon: "info",
            html: htmlContent,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
              Ok
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
              Sair
            `,
            cancelButtonAriaLabel: "Thumbs down",
          })
    }else{
        console.log('Nenhum usuário encontrado');
    }
});


document.getElementById('sair').addEventListener('click', ()=>{
    localStorage.setItem('logado', 'false');
    buttonLogin.classList.remove('hidden');
    iconeUser.classList.add('hidden');
    menuUser.classList.toggle('active');
});