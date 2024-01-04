<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-comandos">Comandos</a>
</p>

## 🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

- Backend
  - Typescript
  - Fastify
- Frontend
  - Typescript
  - NextJs 14

## Bibliotecas
- Backend
  - [Prisma](https://www.prisma.io/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Fastify](https://fastify.dev/)
  - [jwt](https://www.npmjs.com/package/jsonwebtoken)
  - [Biomejs](https://biomejs.dev/pt-br/)
  - [Zod](https://zod.dev/)
  - [Pino](https://github.com/pinojs/pino)

- Frontend
  - [Typescript](https://www.typescriptlang.org/)
  - [Zod](https://zod.dev/)
  - [React Router Dom](https://reactrouter.com/en/main)
  - [Vite](https://vitejs.dev/)
  - [Tailwind](https://tailwindcss.com/)
  - [Shadcn](https://ui.shadcn.com/)
  - [Lucide React](https://lucide.dev/)
  - [zustand](https://zustand-demo.pmnd.rs/)
  - [nookies](https://www.npmjs.com/package/nookies)

## 💻 Projeto

 Esse projeto foi desenvolvido para o teste de vaga da Bean Software desenvolvedor Pleno, com o objetivo de testar as capacidades técnicas do candidato.
 Para o Backend eu utilizei o *Repository Pattern* para ter inversão das dependencias e modalização dos componentes para testes.
 No Frontend utilizei o Vite com React router dom para faziar o roteamento das páginas, se utilizando de custom hooks, services e*Composition Pattern* para modular o código e deixar cada arquivo com sua responsabilidade.


## 🚀 Deploy
 Foi realizado o deploy do backend, frontend e hospedagem do banco postgres na render, você pode acessar <a href="https://www.beantest.devjosuehub.com.br/login/" target="_blank">**clicando aqui!**</a> 

## 🎆 Funcionalidades

Essas são as funcionaliadades do projeto: 

- Projeto
  - Dockerização com hot reload

- Backend
  - Criação de usuário.
  - Login de usuário.
  - Autenticação com jwt.
  - Criação de times de pokemon.

- Fronted
  - Loading skeleton em toda a aplicação se utilizando do estado da request.
  - Tratamento de erros.
  - Tratamento de página não encontrada.
  - Página de times listando os times do usuário logado.
  - Cards dos pokemons com modal para ver evoluções e status.
  - Responsividade Completa

## ⌨ Comandos

Primeiro comece clonando o repositório, **Importante: Se estiver utilizando o wsl2, clone o projeto dentro do sistema de arquivos do linux, pois o wsl2 não consegue transmitir atualizações de arquivos para o linux**

``` git clone https://github.com/Whoj01/Bean-test.git ```

Vamos acessar a branch develop para testar, já que a main está com o deploy da publicação.

``` git checkout develop ```

**Backend**
seguindo para o backend escreva em seu terminal 

``` cd server ```

Copie o .env.example o renomenando para .env e ensira essas váriaveis nele:

~~~env

  PORT=3333

  JWT_SECRET='testevagaBean:)'

  SALT=y3Unz
  PEPPER='testevagaBean:)'

  DATABASE_URL=DATABASE_URL="postgresql://postgres:2553218858@database:5432/beantest?schema=public"

~~~

Instale as depêndencias. Para que o editor não reclame sobre importações:

``` npm install  ```


**Frontend**

Vamos voltar uma pasta e entrar no projeto Frontend:

``` cd ../web ```

Vamos instalar as dependências, Para que o editor não reclame sobre importações:

``` npm i ```

**Rodar projeto**

Para que o projeto seja buildado apartir do docker-compose.yml, vá para a página raiz e escreva o comando: 

``` sudo docker-compose up -d --build --force-recreate ```

 ---

<p>Feito com ❤️ por Josué Dias 👋🏽 Entre em contato!</p>

[![Linkedin Badge](https://img.shields.io/badge/-Josuedias-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://https://www.linkedin.com/in/nycole-xavier-641271202/)](https://www.linkedin.com/in/josué-dias-271458224/)
