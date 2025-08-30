# Importa as bibliotecas necessárias do Flask
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Rota principal que exibe a página inicial
@app.route('/')
def index():
    return render_template('index.html') 

# Nova rota para receber os dados do formulário via POST
@app.route('/analisar', methods=['POST'])
def analisar():
    # Inicializa a variável para guardar o texto do e-mail
    email_content = ""

    # Verifica se o texto foi enviado pelo campo 'email_text'
    if 'email_text' in request.form and request.form['email_text'].strip():
        email_content = request.form['email_text']
        print("--- E-mail recebido via campo de texto ---")
        print(email_content)

    # Se não veio texto, verifica se foi enviado um arquivo
    elif 'email_file' in request.files and request.files['email_file'].filename != '':
        file = request.files['email_file']
        # Aqui faremos a lógica para ler .txt e .pdf depois
        # Por enquanto, vamos apenas confirmar o recebimento
        email_content = f"Arquivo '{file.filename}' recebido com sucesso."
        print(f"--- Recebido o arquivo: {file.filename} ---")

    # Se nenhum dado foi enviado, retorna um erro
    else:
        return jsonify({'error': 'Nenhum texto ou arquivo foi enviado.'}), 400

    # Por enquanto, vamos apenas retornar um JSON simples para confirmar
    # que os dados foram recebidos. A lógica de IA virá aqui depois.
    return jsonify({
        'status': 'sucesso',
        'dados_recebidos': email_content
    })

if __name__ == '__main__':
    app.run(debug=True)