async function getAllMovies() {
    try {
        const getAllMovies = await axios.get(`http://localhost:3000/api/movies`);
        if(getAllMovies.data.message !== 'Success') throw Error();
        const movieContainer = document.getElementById('movie-container');

        getAllMovies.data.data.forEach(movie => {
            const table = document.createElement('table');
            table.setAttribute('class', 'w-100');
            // table.setAttribute('border', '1');

            const tr1 = document.createElement('tr');
            const tdImg = document.createElement('td');
            tdImg.setAttribute('class', 'w-15 h-55px');
            tdImg.setAttribute('rowspan', '2');
            tdImg.innerHTML = `<img class="thumbnail" src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="img" />`;

            const tdTitle = document.createElement('td');
            const div = document.createElement('div');
            div.setAttribute('class', 'pl-2 title');
            div.innerHTML = movie.title;
            tdTitle.appendChild(div);

            const tdReadMore = document.createElement('td');
            tdReadMore.setAttribute('class', 'pr-1 w-10');
            tdReadMore.setAttribute('align', 'right');
            tdReadMore.setAttribute('rowspan', '2');
            tdReadMore.innerHTML = '>';

            tr1.appendChild(tdImg);
            tr1.appendChild(tdTitle);
            tr1.appendChild(tdReadMore);
            table.appendChild(tr1);

            if(movie.tagline) {
                const tr2 = document.createElement('tr');
                tr2.innerHTML = `<td class='pl-2 text-muted'><div class='title'><small>${movie.tagline}</small></div></td>`;
                table.appendChild(tr2);
            }
            movieContainer.appendChild(table);
        });

    } catch (error) {
        console.error(error);        
    }
}

getAllMovies();