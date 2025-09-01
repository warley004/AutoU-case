// Aguarda o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do HTML com os quais vamos interagir
    const form = document.getElementById('email-form');
    const resultadoDiv = document.getElementById('resultado');
    const loadingSpinner = document.getElementById('loading-spinner');
    const conteudoResultado = document.getElementById('conteudo-resultado');

    // Adiciona um "escutador" para o evento de 'submit' (envio) do formulário
    form.addEventListener('submit', async (event) => {
        // Previne o comportamento padrão do formulário, que é recarregar a página
        event.preventDefault();

        // Limpa resultados anteriores e mostra o spinner de carregamento
        conteudoResultado.innerHTML = '';
        resultadoDiv.classList.remove('d-none'); // Mostra a seção de resultados
        loadingSpinner.classList.remove('d-none'); // Mostra o spinner

        // Cria um objeto FormData a partir do formulário. Isso pega todos os dados,
        // incluindo o texto e o arquivo, se houver.
        const formData = new FormData(form);

        try {
            // Faz a requisição para o nosso backend na rota '/analisar'
            // Usamos 'await' para esperar a resposta chegar antes de continuar
            const response = await fetch('/analisar', {
                method: 'POST',
                body: formData, // Envia os dados do formulário no corpo da requisição
            });

            // Converte a resposta do backend (que é JSON) em um objeto JavaScript
            const data = await response.json();

            // Esconde o spinner de carregamento
            loadingSpinner.classList.add('d-none');

            // Verifica se a resposta do backend contém um erro
            if (response.status !== 200 || data.error) {
                exibirResultado(
                    'Erro', 
                    data.error || 'Ocorreu um erro desconhecido. Tente novamente.',
                    true // Indica que é uma mensagem de erro
                );
            } else {
                // Se deu tudo certo, exibe a classificação e a sugestão de resposta
                exibirResultado(data.categoria, data.sugestao_resposta);
            }

        } catch (error) {
            // Se a requisição falhar (ex: problema de rede), exibe um erro
            loadingSpinner.classList.add('d-none');
            exibirResultado('Erro de Conexão', 'Não foi possível se conectar ao servidor. Verifique sua conexão e tente novamente.', true);
            console.error('Erro na requisição:', error);
        }
    });

    /**
     * Função auxiliar para formatar e exibir o resultado na tela.
     */
    function exibirResultado(categoria, sugestao, isError = false) {
        // Define a cor do "badge" da categoria (azul para produtivo, cinza para improdutivo, vermelho para erro)
        const badgeClass = isError ? 'bg-danger' : (categoria === 'Produtivo' ? 'bg-primary' : 'bg-secondary');

        // Cria o HTML que será inserido na página com o resultado
        const resultadoHTML = `
            <div class="mb-3">
                <h5>Classificação: <span class="badge ${badgeClass}">${categoria}</span></h5>
            </div>
            <div>
                <h5>Sugestão de Resposta:</h5>
                <p class="sugestao-resposta">${sugestao.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        // Insere o HTML gerado dentro da div de conteúdo do resultado
        conteudoResultado.innerHTML = resultadoHTML;
    }

    // --- LÓGICA DO SELETOR DE TEMA ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');

// Função para aplicar o tema salvo
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

    // Verifica se já existe um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Adiciona o evento de clique no botão
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';

        // Aplica o novo tema e salva no localStorage
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});