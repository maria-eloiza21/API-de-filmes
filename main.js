const API_KEY = 'c9af1200';
const resultadoDiv = document.getElementById('resultado');

async function buscarFilmes() {
    console.log('Iniciando busca...');
    const termo = document.getElementById('search').value.trim(); 
    if (!termo) {
        alert('Por favor, digite o nome do filme.');
        return;   
    }

    try {
        console.log('Termo de busca:', termo);
        const urlBusca = `http://www.omdbapi.com/?s=${encodeURIComponent(termo)}&apikey=${API_KEY}`;
        console.log('URL da requisição:', urlBusca);
        const respostaBusca = await fetch(urlBusca);
        console.log('Status da resposta:', respostaBusca.status);
        const dadosBusca = await respostaBusca.json();
        console.log('Dados recebidos:', dadosBusca);
        
        if (!dadosBusca.Search || dadosBusca.Search.length === 0 || dadosBusca.Response !== 'True') {
            document.getElementById('resultado').innerHTML = '<p>Filme não encontrado.</p>';
            return;
        }

        exibirFilmes(dadosBusca.Search);
    } catch (error) {
        document.getElementById('resultado').innerHTML = '<p>Erro ao buscar filmes. Tente novamente.</p>';
        console.error('Erro na requisição:', error);
    }
}

function exibirFilmes(filmes) {
    console.log('Exibindo filmes:', filmes);
    resultadoDiv.innerHTML = '';
    filmes.forEach(filme => {
        const filmeCard = document.createElement('div');
        filmeCard.classList.add('filme-card');
        filmeCard.innerHTML = `
            <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/150'}" alt="${filme.Title}">
            <h3>${filme.Title}</h3>
            <p>Ano: ${filme.Year}</p>
        `;
        resultadoDiv.appendChild(filmeCard);
    });
}