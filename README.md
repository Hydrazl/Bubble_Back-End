# 🫧 BUBBLE — Backend

O Backend do Bubble é responsável por toda a lógica da aplicação, autenticação de usuários, gerenciamento das bolhas (comunidades), controle do feed personalizado, sistema de notificações e funcionamento do chat.

Ele garante que cada usuário visualize apenas conteúdos relacionados às bolhas em que está inserido, mantendo a segurança, organização e integridade dos dados da plataforma.

---

## 🛠️ Tech Stack

| Tecnologia | Função no Projeto |
|------------|-------------------|
| <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=339933&labelColor=0D1117&color=0D1117" /> | Ambiente de execução do servidor |
| <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=FFFFFF&labelColor=0D1117&color=0D1117" /> | Criação da API REST e gerenciamento de rotas |
| <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=F7DF1E&labelColor=0D1117&color=0D1117" /> | Implementação da lógica da aplicação |
| <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=4479A1&labelColor=0D1117&color=0D1117" /> | Banco de dados relacional da aplicação |
| <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=52B0E7&labelColor=0D1117&color=0D1117" /> | ORM para modelagem e manipulação do banco de dados |

---

## 📦 Dependências Principais

```bash
{
  "dependencies": {
    "express": "^4.x",
    "sequelize": "^6.x",
    "mysql2": "^3.x",
    "jsonwebtoken": "^9.x",
    "bcrypt": "^5.x",
    "cors": "^2.x",
    "dotenv": "^16.x"
  }
}
```
## 🛠️ Instalação

```bash
# Na raiz do projeto
npm install

# Produção
npm start
```

## 🏃 Executando

```bash
# Da raiz do projeto
npm run dev
```

## 🔐 Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

```env
# 🌐 SERVIDOR
PORT=4000
NODE_ENV=development

# 🗄️ BANCO DE DADOS (MySQL local)
DB_NAME=bubble_db
DB_USER=
DB_PASS=
DB_HOST=
DB_DIALECT=mysql

# 🔑 JWT (Autenticação)
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_EXPIRES_IN=7d

# 📂 UPLOADS (pastas do projeto)
UPLOADS_PATH=uploads
USERS_UPLOADS_PATH=uploads/users
BANNERS_UPLOADS_PATH=uploads/users/banner
TEMPS_UPLOADS_PATH=uploads/temps
```

## ⚙️ Responsabilidades da API

- 🔐 Registro e autenticação de usuários (JWT)
- 👥 Criação e gerenciamento de bolhas
- 📰 Feed personalizado baseado nas bolhas do usuário
- 🔔 Sistema de notificações por atividade
- 💬 Sistema de chat entre usuários
- 🗄️ Persistência e integridade dos dados com MySQL + Sequelize


## 👨‍💻 Colaboradores

- [João Teixeira](https://github.com/ts-joao)
- [Henri Baruki](https://github.com/Baruki-Bytes)
- [Lucas Alves](https://github.com/ktzxs)
- [Felipe Farias](https://github.com/felipinho3105)
