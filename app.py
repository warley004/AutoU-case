import os
import json
import google.generativeai as genai # ADICIONADO: Biblioteca do Google
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from PyPDF2 import PdfReader

load_dotenv()
app = Flask(__name__)

# --- CONFIGURAÇÃO DA API DO GOOGLE GEMINI ---
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
except Exception as e:
    print(f"Erro ao configurar a API do Google: {e}")

# --- FUNÇÃO PRINCIPAL DA IA (AGORA COM GEMINI) ---
def analisar_email_com_ia(texto_email):
    # O prompt é muito similar, mas ajustado para o Gemini
    prompt = f"""
    Analise o e-mail abaixo e retorne SOMENTE um objeto JSON válido.
    Sua resposta DEVE ser um objeto JSON e nada mais.
    O JSON deve conter duas chaves: "categoria" e "sugestao_resposta".

    As categorias possíveis são: "Produtivo" ou "Improdutivo".
    A sugestão de resposta deve ser curta e profissional.

    E-mail para análise:
    ---
    {texto_email}
    ---
    """
    
    try:
        # Inicializa o modelo Gemini (Flash é rápido e ótimo para essa tarefa)
        model = genai.GenerativeModel('gemini-1.5-flash')
        # Gera o conteúdo
        response = model.generate_content(prompt)
        
        # Limpa a resposta para garantir que é um JSON puro
        # Gemini às vezes retorna o JSON dentro de ```json ... ```
        cleaned_response = response.text.strip().replace('```json', '').replace('```', '')
        
        # Converte a string JSON em um dicionário Python
        return json.loads(cleaned_response)

    except Exception as e:
        print(f"Erro na chamada da API do Google: {e}")
        return {"error": f"Ocorreu um erro ao processar sua solicitação com a IA: {e}"}

# --- ROTAS DA APLICAÇÃO (NÃO MUDAM) ---
@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/analisar', methods=['POST'])
def analisar():
    email_content = ""
    if 'email_text' in request.form and request.form['email_text'].strip():
        email_content = request.form['email_text']
    elif 'email_file' in request.files and request.files['email_file'].filename != '':
        file = request.files['email_file']
        if file.filename.endswith('.txt'):
            email_content = file.stream.read().decode('utf-8')
        elif file.filename.endswith('.pdf'):
            try:
                reader = PdfReader(file.stream)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                email_content = text
            except Exception as e:
                return jsonify({'error': f'Erro ao ler o arquivo PDF: {e}'}), 500
        else:
             return jsonify({'error': 'Formato de arquivo não suportado.'}), 400
    
    if not email_content:
        return jsonify({'error': 'Nenhum texto ou arquivo válido foi enviado.'}), 400

    resultado_ia = analisar_email_com_ia(email_content)
    
    if "error" in resultado_ia:
        return jsonify(resultado_ia), 500
    else:
        return jsonify(resultado_ia)

if __name__ == '__main__':
    app.run(debug=True)