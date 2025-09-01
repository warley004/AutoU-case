document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('email-form');
    const resultadoDiv = document.getElementById('resultado');
    const loadingSpinner = document.getElementById('loading-spinner');
    const conteudoResultado = document.getElementById('conteudo-resultado');
    const emailFileInput = document.getElementById('email_file');
    const clearFileBtn = document.getElementById('clear-file-btn');

    emailFileInput.addEventListener('change', () => {
        if (emailFileInput.files.length > 0) {
            clearFileBtn.classList.remove('d-none');
        } else {
            clearFileBtn.classList.add('d-none');
        }
    });

    clearFileBtn.addEventListener('click', () => {
        emailFileInput.value = ''; 
        clearFileBtn.classList.add('d-none');
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailTextInput = document.getElementById('email_text');
        const emailFileInput = document.getElementById('email_file');
        const textValue = emailTextInput.value.trim();
        const fileSelected = emailFileInput.files.length > 0;

        if (textValue !== '' && fileSelected) {
            showAlertModal('Por favor, preencha apenas UM dos campos: ou o texto do e-mail ou o arquivo. Limpe um dos campos para continuar.');
            return;
        }

        conteudoResultado.innerHTML = '';
        resultadoDiv.classList.remove('d-none');
        loadingSpinner.classList.remove('d-none');

        const formData = new FormData(form);

        try {
            const response = await fetch('/analisar', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            loadingSpinner.classList.add('d-none');

            if (response.status !== 200 || data.error) {
                exibirResultado('Erro', data.error || 'Ocorreu um erro desconhecido.', true);
            } else {
                exibirResultado(data.categoria, data.sugestao_resposta);
            }

        } catch (error) {
            loadingSpinner.classList.add('d-none');
            exibirResultado('Erro de Conexão', 'Não foi possível se conectar ao servidor.', true);
            console.error('Erro na requisição:', error);
        }
    });

    function exibirResultado(categoria, sugestao, isError = false) {
        const badgeClass = isError ? 'bg-danger' : (categoria === 'Produtivo' ? 'bg-primary' : 'bg-secondary');

        const resultadoHTML = `
            <div class="mb-3">
                <h5>Classificação: <span class="badge ${badgeClass}">${categoria}</span></h5>
            </div>
            <div>
                <h5>Sugestão de Resposta:</h5>
                <p class="sugestao-resposta">${sugestao.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        conteudoResultado.innerHTML = resultadoHTML;
    }

    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    const alertModalBody = document.getElementById('alertModalBody');

    function showAlertModal(message) {
        alertModalBody.textContent = message;
        alertModal.show();
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            darkIcon.classList.add('d-none');
            lightIcon.classList.remove('d-none');
        } else {
            body.classList.remove('dark-theme');
            darkIcon.classList.remove('d-none');
            lightIcon.classList.add('d-none');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {

        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});