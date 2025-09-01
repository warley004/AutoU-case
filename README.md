# AutoU Case Prático: Analisador de E-mails com IA

![Live Demo](https://img.shields.io/badge/Live_Demo-Visitar-brightgreen?style=for-the-badge)  
**[Visite a aplicação online aqui!]([COLE A URL DO SEU PROJETO NO RENDER AQUI])**

![Prévia da Aplicação](https://i.imgur.com/your-screenshot-url.png)
_**Dica:** Tire um print da sua aplicação no tema escuro e substitua o link acima para deixar seu README ainda mais atrativo!_

---

## 📄 Descrição

Este projeto é uma solução web desenvolvida como parte do processo seletivo da AutoU. A aplicação utiliza inteligência artificial para classificar e-mails em categorias de produtividade e sugerir respostas automáticas, otimizando o fluxo de trabalho e liberando tempo da equipe.

A interface foi projetada para ser moderna, intuitiva e responsiva, oferecendo uma experiência de usuário fluida e agradável.

---

## ✨ Features (Funcionalidades)

* **Análise com IA:** Classifica e-mails em **Produtivo** ou **Improdutivo**.
* **Sugestão de Respostas:** Gera respostas automáticas contextuais baseadas na classificação.
* **Múltiplos Formatos de Entrada:** Suporte para colar texto diretamente, ou fazer upload de arquivos `.txt` e `.pdf`.
* **Tema Dual (Light/Dark):** Seletor de tema para preferência do usuário, com persistência da escolha.
* **Validação Inteligente:** Avisa o usuário caso tente enviar um texto e um arquivo ao mesmo tempo.
* **Interface Responsiva:** Experiência de uso otimizada para desktops e dispositivos móveis.
* **Feedback Visual:** Indicadores de carregamento e mensagens de erro claras para o usuário.

---

## 🛠️ Tecnologias Utilizadas

A aplicação foi construída com uma stack moderna e eficiente:

* **Backend:** Python 3, Flask, Gunicorn
* **Inteligência Artificial:** Google Gemini API (via Google AI Studio)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Framework CSS:** Bootstrap 5
* **Deploy (Hospedagem):** Render
* **Controle de Versão:** Git & GitHub

---

## 🚀 Como Rodar Localmente

Para executar este projeto no seu ambiente local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/AutoU-case.git](https://github.com/seu-usuario/AutoU-case.git)
    cd AutoU-case
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    # Criar
    python -m venv venv
    # Ativar (Windows)
    .\venv\Scripts\activate
    # Ativar (macOS/Linux)
    source venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure as variáveis de ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione sua chave da API do Google Gemini a este arquivo:
        ```
        GOOGLE_API_KEY="SUA_CHAVE_DE_API_AQUI"
        ```

5.  **Execute a aplicação:**
    ```bash
    flask run
    ```
    A aplicação estará disponível em `http://127.0.0.1:5000`.

---

## 👨‍💻 Autor

Desenvolvido por **[SEU NOME AQUI]**.

* **LinkedIn:** `[link-para-seu-linkedin]`
* **GitHub:** `[link-para-seu-github]`