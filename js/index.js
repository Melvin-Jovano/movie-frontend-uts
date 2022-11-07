const movieContainer = document.getElementById('movie-container');

async function getAllMovies() {
    try {
        const loadWrapper = document.createElement('div');
        loadWrapper.innerHTML = '<br>Loading... <br><br>';
        movieContainer.appendChild(loadWrapper);  

        const getAllMovies = await axios.get(`http://localhost:3000/api/movies`);

        if(getAllMovies.data.message !== 'Success') throw Error();
        
        movieContainer.innerHTML = '';

        getAllMovies.data.data.forEach(movie => {
            const a = document.createElement('a');
            a.setAttribute('class', 'text-decoration-none');
            a.href = `movie.html?id=${movie.id}`;

            const table = document.createElement('table');
            table.setAttribute('class', 'w-100');

            const tr1 = document.createElement('tr');
            const tdImg = document.createElement('td');
            tdImg.setAttribute('class', 'w-15 h-60px');
            tdImg.setAttribute('rowspan', '3');
            tdImg.setAttribute('align', 'top');
            tdImg.innerHTML = `<img class="thumbnail" src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="img" />`;

            const tdTitle = document.createElement('td');
            const div = document.createElement('div');
            div.setAttribute('class', 'pl-15px title pt-10');
            if(!movie.tagline) {
                div.setAttribute('class', 'pl-15px title');
                tdTitle.setAttribute('rowspan', '2');
            }
            div.innerHTML = movie.title;
            tdTitle.appendChild(div);

            const tdReadMore = document.createElement('td');
            tdReadMore.setAttribute('class', 'pr-1 w-10 text-muted');
            tdReadMore.setAttribute('align', 'right');
            tdReadMore.setAttribute('rowspan', '2');
            tdReadMore.innerHTML = '&gt';

            tr1.appendChild(tdImg);
            tr1.appendChild(tdTitle);
            tr1.appendChild(tdReadMore);
            table.appendChild(tr1);

            if(movie.tagline) {
                const tr2 = document.createElement('tr');
                tr2.innerHTML = `<td class='pl-15px pb-10 text-muted'><div class='title'><small>${movie.tagline}</small></div></td>`;
                table.appendChild(tr2);
            }

            a.appendChild(table);
            movieContainer.appendChild(a);

            const hr = document.createElement('hr');
            hr.setAttribute('class', 'm-0 p-0');
            const hrWrapper = document.createElement('div');
            hrWrapper.appendChild(hr);
            hrWrapper.setAttribute('class', 'pl-75px');

            movieContainer.appendChild(hrWrapper);
        });
    } catch (error) {
        movieContainer.innerHTML = '';
        const errorWrapper = document.createElement('div');
        errorWrapper.innerHTML = '<br>Maaf Coba Beberapa Saat Lagi... <br><br>';
        movieContainer.appendChild(errorWrapper);   
    }
}

getAllMovies();