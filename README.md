# TrybeTunes

TrybeTunes é uma aplicação de reprodução de músicas (prévias) de bandas e artistas em todo o mundo. Após o login, é possível listar os álbuns da banda ou do artista pesquisado, visualizar e reproduzir prévias das músicas contidas em cada álbum, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando a biblioteca React, incluindo o React Router para roteamento.

O conteúdo da pasta `src/services`, que contém os arquivos `favoriteSongsAPI.js`, `searchAlbumsAPI.js`, `userAPI.js` e `musicsAPI.js`, foi fornecido pela [Trybe](https://betrybe.com). As funções contidas nesses arquivos são responsáveis por buscar artistas e músicas pela [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) e armazenar dados do usuário no localStorage.

## Instalação das dependências

Você precisará de um ambiente de execução [Node.js](https://nodejs.org) instalado em sua máquina para executar o comando de instalação de dependências.

Com o repositório clonado e dentro de um terminal:

1. Entre na pasta do repositório:

```
cd trybetunes/
```

2. Instale as dependências:

```
npm install
```

## Como executar

Para iniciar a aplicação, execute no terminal:

```
npm start
```

---
