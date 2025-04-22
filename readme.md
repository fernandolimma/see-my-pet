Estrutura do Projeto

see-my-pet/
├── public/
│   ├── index.html       (página pública do PET)
│   ├── login.html       (página de login)
│   ├── edit.html        (página de edição)
│   └── js/scripts.js    (lógica do frontend)
├── .env                 (variáveis de ambiente)
├── server.js            (ponto de entrada)
└── package.json         (dependências)

Passo a Passo para Executar a Aplicação

1. Clone o projeto (ou baixe os arquivos)

2. Instale as dependências
No diretório do projeto, execute:
- npm install
Isso instalará os pacotes listados no package.json (Express, Mongoose, QRCode, etc.).

3. Configure as variáveis de ambiente
Certifique-se de que o arquivo .env na raiz do projeto contenha:
MONGO_URI= Informe sua URI
JWT_SECRET= Informe sua Chave
PORT=5000

4. Inicie o servidor
Execute o comando:
- npm start

5. Acesse a aplicação
Abra o navegador e acesse:

Página pública (visualização do PET):
→ http://localhost:5000

Página de login (para tutores):
→ http://localhost:5000/login.html

Rotas da API (para testes)
Você pode testar as rotas diretamente via Postman ou Insomnia:

Listar PETs: GET http://localhost:5000/api/pets

Criar PET: POST http://localhost:5000/api/pets (com body JSON)

Gerar QR Code de edição: GET http://localhost:5000/api/pets/ID_DO_PET/qr/edit

Possíveis Problemas e Soluções
Erro ao conectar ao MongoDB:

Verifique a MONGO_URI no .env.

Certifique-se de que o IP do seu servidor está na lista de permissões do MongoDB Atlas.

Porta em uso:

Altere a PORT no .env para outro valor (ex: 3000).

Páginas não carregam:

Verifique se o servidor está rodando (npm start).

Confira se os arquivos HTML estão na pasta public.

Login não redireciona:

Garanta que o token JWT está sendo salvo no localStorage (veja o console do navegador > "Application" > "Local Storage").