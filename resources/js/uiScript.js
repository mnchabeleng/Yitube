/**
 * Handle common UI components
 */

window.addEventListener('load', (e) => {
    // Video player load
    const videoPlayerOverlay = document.querySelector('#video-player .overlay')
    if(videoPlayerOverlay){
        videoPlayerOverlay.style.display = 'none'
    }

    // Load movie poster
    const movieCovers = document.querySelectorAll('#movie_cover')
    if(movieCovers){
        movieCovers.forEach(cover => {
            cover.src = cover.dataset.img
        })
    }

    // Prevent submiting empty search form
    const searchForm = document.querySelectorAll('#search-form')
    if(searchForm){
        searchForm.forEach(form => {
            form.addEventListener('submit', e => {
                const formdata = new FormData(e.target)
                if(!formdata.get('search')  && !formdata.get('order')){
                    e.preventDefault()
                }
            })
        })
    }

    // Movie suggestion on search
    const searchInput = document.querySelector('#search')
    if(searchInput){
        const awesomplete = new Awesomplete(searchInput, {
            minChars: 2,
            maxItems: 5
        })

        searchInput.addEventListener('input', () => {
            fetch(`http://localhost:3000/api/movies?search=${ searchInput.value }`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0){
                    const movieTitles = data.map(movie => movie.title)
                    awesomplete.list = movieTitles
                }
            })
        })
    }
})