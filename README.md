# Kyuden
Plataforma de stream de animes, feita em Nestjs consumindo a api do [anime-scraper](https://github.com/Luis-Felipe-N/anime-scraper). Nesta plataforma, você pode salvar seus animes favoritos, realizar downloads, deixar comentários em cada episódio.

![alt text](public/cover.png)

## Documentação da Aplicação :weight_lifting:
Este repositório contém a implementação do DeepReview uma aplicação construída em:

- NextJs - ^13.4.1

- Node.js 18
- NPM 9.8.1

## Instalação e configuração :computer:
- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18 e NPM 9.8.1 instalados em sua máquina.
- Copie o arquivo **.env.example** para **.env** na raiz do projeto e defina as variáveis de ambiente necessárias para o seu ambiente.
- Execute `npm install` na pasta raiz do projeto para criar instalar as dependências.
- Por fim, execute `npm run dev` para subir a aplicação em modo de desenvolvimento.

## Autenticação :closed_lock_with_key:
A aplicação utiliza a api do nextAuth no modo Credentials, foi feita algumas modificações no authOptions, em relação às seções de ***authorize*** e ***session***.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível listar animes;
- [x] Deve ser possível salvar anime nos favoritos;
- [x] Deve ser possível remover anime nos favoritos;
- [x] Deve ser possível listar os animes favoritos;
- [x] Deve ser possível listar episódios;
- [x] Deve ser possível assistir um episódio;
- [x] Deve ser possível comentar em um episódio;
- [x] Deve ser possível pesquisar por um anime;
- [x] Deve ser possível alterar nickname, avatar e banner do perfil;

## RNs (Regras de negócio)

 
 
 Comentar em um anime não deve ser permitido para um usuário que não está logado.
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] A gravação do tempo atual do episódio não deve ocorrer se o usuário não estiver logado;
- [x] A ação de favoritar um anime não deve ser possível para um usuário que não está logado;
- [x] Usuário não deve comentar em um anime caso nao esteja logado;

## RNFs (Requisitos não-funcionais)
- [x] Deve ser registrado o tempo atual do episódio em que o usuário parou;
- [x] O episódio deve começar a ser reproduzido a partir do ponto em que o usuário o deixou da última vez;
- [x] O usuário deve ser autenticado usando o Firebase;
- [x] Os dados da aplicação precisam estar persistidos em um Realtime Database;