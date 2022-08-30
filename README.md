O projeto TrybeTunes foi feito no módulo de Front-End utilizando o react, foi feita a requisição
de dados por meio de uma Api, utilizado os ciclos de vida de um componente React, a função setState, o BrowserRouter, criando e controlando as rotas com o React Router, foi utilizado também o componente Redirect e criado links de navegação.

Para abrir a aplicação clone o repositório, acesse a pasta do projeto, instale as dependências 
e abra a aplicação com o comando start:
 - git clone git@github.com:FernandaGrein/TrybeTunes-projeto.git
 - cd TrybeTunes-projeto
 - npm install 
 - npm start

Forma cumpridos os seguintes requisitos: 
- Foram criadas rotas entre as paginas de login, busca, album, musicas Favoritas, perfil e editar perfil.
- Foi criado um componente Login, com um campo para inserção do nome e liberar o acesso.
- Na sequencia, foi criado um cabeçalho, que contem o nome do usuário e é renderizado nas demais rotas.
- Foram criados links de navegação dentro do cabeçalho que dão acesso à pagina de perfil, de músicas favoritas e à página de busca
- Na página de busca foi criado um campo para a inserção do nome de um artista para buscar todos os albuns deste artista, ao clicar para pesquisar um artistas é feito uma requisição à API para trazer os dados referentes à busca solicitada
- Ao selecionar um album a aplicação é redirecionada para o componente "album", que possui as musicas devidas, além do nome do artista e do nome do album.
- Dentro do album é possível adicionar músicas à lista de musicas favoritas, sendo possível favoritar e desfavoritar uma musica.
- Ao entrar nos albuns as músicas já haviam sido favoritadas anteriormente devem ser recuperadas, e continuar como favoritas.
- Na página de favoritos há uma listas das músicas selecionadas, sendo possível remover uma música a partir dessa página e atualizando a lista de favoritas e a música no album.
- Foi criado uma página de perfil, que traz o nome, email, descrição e imagem do usuário.
- Por fim, foi criada uma página para edição de perfil, onde todos os campos do perfil podem ser 
alterados.
