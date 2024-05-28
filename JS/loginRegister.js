
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const emailLogin = document.getElementById('input-email-login');
const senhaLogin = document.getElementById('input-senha-login');

const nomeCadastro = document.getElementById('input-nome-cadastro');
const emailCadastro = document.getElementById('input-email-cadastro');
const senhaCadastro = document.getElementById('input-senha-cadastro');

const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-Register');
const forgotPassword = document.getElementById('forgot-password');

const formRegister = document.getElementById('form-register');
const formLogin = document.getElementById('form-login');

let pessoasCadastradas = JSON.parse(localStorage.getItem('pessoasCadastradas')) || [];

function atualizaListaPessoasCadastradas(){
    localStorage.setItem("pessoasCadastradas", JSON.stringify(pessoasCadastradas));
}

function validaCampos(){
    if(nomeCadastro.value && emailCadastro.value && senhaCadastro.value){
        return true;
    }else{
        return false;
    }
}

function resetaCampos(){
    nomeCadastro.value = '';
    emailCadastro.value = '';
    senhaCadastro.value = '';
}

formRegister.addEventListener('submit', (event)=>{
    event.preventDefault();

    if(event.submitter == btnRegister){
        if(validaCampos()){
            const pessoa = {
                nome: nomeCadastro.value,
                email: emailCadastro.value,
                senha: senhaCadastro.value,
                logado: false
            };
            cadastrar(pessoa);
            atualizaListaPessoasCadastradas();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario cadastrado com sucesso",
                showConfirmButton: false,
                timer: 2000
            });
            resetaCampos();
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Preencha todos os campos. Tente novamente",
                showConfirmButton: false,
                timer: 2000
            });
        }
    }
});

formLogin.addEventListener('submit', (event)=>{
    event.preventDefault();

    if(event.submitter == btnLogin){
        pessoasCadastradas.forEach(pessoaCadastrada => {
            if(pessoaCadastrada.email == emailLogin.value && pessoaCadastrada.senha == senhaLogin.value){
                pessoaCadastrada.logado = true;
                logar(pessoaCadastrada);
                return;
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "email ou senha incorretas. Tente novamente",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }
});

function cadastrar(pessoa){
    pessoasCadastradas.push(pessoa);
}

function logar(pessoa) {
    if(pessoa != null){
        localStorage.setItem('logado', 'true');
        localStorage.setItem('usuarioLogado', JSON.stringify(pessoa));
        window.location.href = 'index.html';
    }
}

btnRegister.addEventListener('click', function(){
    const usuario = {
        email: emailCadastro,
        senha: senhaCadastro
    }
    cadastrar(usuario);
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

forgotPassword.addEventListener('click', ()=>{
    Swal.fire({
        title: "<strong>Recuperar Senha</strong>",
        icon: "info",
        html: `
        <form style="display: flex; flex-direction: column; gap: 15px;">
            <label for="email">Informe seu email cadastrado</label>
             <input id="input-email" style="border: 1px solid #396DD5; border-radius: 10px; padding: 5px 5px;" type="email" name="email">
         </form>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
          Enviar
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
          Sair
        `,
        cancelButtonAriaLabel: "Thumbs down",
        preConfirm: () => {
            const inputEmailForgotPassword = document.getElementById('input-email').value;

            if(!inputEmailForgotPassword){
                Swal.showValidationMessage('Por favor, informe um email valido!');
                return false;
            }

            return inputEmailForgotPassword;
        }
      }).then((result) => {
        if(result.isConfirmed) {
            const email = result.value;
            const pessoa = pessoasCadastradas.find(p => p.email === email);

            if(pessoa){
                Swal.fire({
                    title: "Recuperar Senha",
                    text: "Um email foi enviado para seu email",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Este email não está cadastrado",
                    icon: "error"
                });
            }
        }
      });
});
