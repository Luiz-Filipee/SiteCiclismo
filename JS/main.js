
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
const perfilUser = document.querySelector('.perfil');
const inputEmailInfo = document.getElementById('input-nome-info');
const inputNomeInfor = document.getElementById('input-email-info');
const inputNumeroInfo = document.getElementById('input-numero-info');
const iconFotoPerfilUser = document.getElementById('icon__perfil');

const suporte = document.getElementById('suporte');

const fotosEtapas = document.querySelectorAll('.foto-etapa');

const buttonVoltaHome = document.getElementById('voltarAoTopo');

document.addEventListener('DOMContentLoaded', () => {
    const sectionEtapas = document.querySelectorAll('section');
    const observador = new IntersectionObserver((entrada) => {
        entrada.forEach((entrou) => {
            if(entrou.isIntersecting){
                entrou.target.classList.add('visible');
            }
        });
    },{
        threshold: 0.1
    });

    sectionEtapas.forEach((item) =>{
        observador.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const alvoId = this.getAttribute('href');
            const sectionAlvo = document.querySelector(alvoId);
            const distanciaDoAlvo = sectionAlvo.getBoundingClientRect().top;
            const InicioY = window.pageYOffset;
            const duracao = 1000; 
            let tempoInicio = null;

            function animacaoScroll(tempoAtual) {
                if (tempoInicio === null) tempoInicio = tempoAtual;
                const tempoUtilizado = tempoAtual - tempoInicio;
                const progresso = Math.min(tempoUtilizado / duracao, 1);
                window.scrollTo(0, InicioY + distanciaDoAlvo * progresso);
                if (tempoUtilizado < duracao) {
                    requestAnimationFrame(animacaoScroll);
                }
            }

            requestAnimationFrame(animacaoScroll);
        });
    });
});

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 100){
        buttonVoltaHome.style.display = 'block';
        buttonVoltaHome.style.opacity = '1';
    }else{
        buttonVoltaHome.style.opacity = '0';
        setTimeout(() => {
            buttonVoltaHome.style.display = 'none';
        }, 300);
    }
});

buttonVoltaHome.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

cadastraEtatas();
atualizaListaEtapas();

function cadastraEtatas(){
    etapasCadastradas.push(etapaTacuru);
    etapasCadastradas.push(etapaEldorado);
}


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
        '/HTML/assets/backgournf-image-home-2.jpeg',
        '/HTML/assets/imagem-background-site.png'
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

document.getElementById('item-sair').addEventListener('click', ()=>{
    localStorage.setItem('logado', 'false');
    buttonLogin.classList.remove('hidden');
    iconeUser.classList.add('hidden');
    menuUser.classList.toggle('active');
    resetaCamposPerfil();
});

document.getElementById('item-perfil').addEventListener('click', ()=>{
    const imagemPerfilUser = document.getElementById('icon__perfil');
    imagemPerfilUser.style.transform = 'translateY(-5px)';
    setTimeout(() => {
        imagemPerfilUser.style.transform = 'translateY(0)';
    }, 500);
});

document.getElementById('item-informacoes').addEventListener('click', ()=>{
    const formUserPerfil = document.getElementById('form-info-user');
    formUserPerfil.style.transform = 'translateY(-5px)';
    setTimeout(() => {
        formUserPerfil.style.transform = 'translateY(0)';
    }, 500);
});

function resetaCamposPerfil(){
    inputEmailInfo.value = '';
    inputNomeInfor.value = '';
    inputNumeroInfo.value = '';
    iconFotoPerfilUser.setAttribute('src', '/HTML/assets/imagem_padrao_foto_perfil.jpg');
}

document.querySelector('.btn-perfil').addEventListener('click', ()=>{
    perfilUser.classList.toggle('hidden');
});

document.getElementById('minha-conta').addEventListener('click', ()=>{
    perfilUser.classList.toggle('hidden');
    const usuarioLogaooJSON = localStorage.getItem('usuarioLogado');
    

    if(usuarioLogaooJSON){
        const usuarioLogado = JSON.parse(usuarioLogaooJSON);
        inputEmailInfo.value = usuarioLogado.nome;
        inputNomeInfor.value = usuarioLogado.email;
        iconFotoPerfilUser.setAttribute('src','/HTML/assets/icon-pessoa.jpg');
        inputNumeroInfo.value = '67998375906';
    }else{
        console.log('Nenhum usuário encontrado');
        inputNumeroInfo.value = 'Nao Possui numero no cadastro';
    }
});

fotosEtapas.forEach((fotos) =>{
    fotos.addEventListener('click', ()=>{

       fotos.classList.toggle('active');
    });
});


document.getElementById('sair').addEventListener('click', ()=>{
    localStorage.setItem('logado', 'false');
    buttonLogin.classList.remove('hidden');
    iconeUser.classList.add('hidden');
    menuUser.classList.toggle('active');
});

suporte.addEventListener('click',function(){
    Swal.fire({
        icon: "success",
        title: "Entre em contato via email. Obrigado!",
        text: "consesulMs@gmail.com",
        footer: '<a href="#app__section-patrocinadores">Porque virar um patrocinador?</a>'
    });
});