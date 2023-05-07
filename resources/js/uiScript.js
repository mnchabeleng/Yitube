/**
 * Handle common UI components
 */

const API_URL = 'https://yts.mx/api/v2/list_movies.json'

window.addEventListener('load', (e) => {
    // Video player load
    const videoPlayerOverlay = document.querySelector('#video-player .overlay')
    if(videoPlayerOverlay){
        videoPlayerOverlay.style.display = 'none'
    }

    // Load movie poster
    /*
    const movieCovers = document.querySelectorAll('#movie_cover')
    if(movieCovers){
        movieCovers.forEach(cover => {
            if(!cover.onerror){
                cover.src = cover.dataset.img
            }
        })
    }
    */

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
            fetch(`${ API_URL }?limit=${ 5 }&query_term=${ searchInput.value }`)
            .then(res => res.json())
            .then(data => {
                const movies = data?.data?.movies

                if(movies != undefined && movies.length > 0){
                    const movieTitles = movies.map(movie => movie.title)
                    awesomplete.list = movieTitles
                }
            })
        })
    }

    // Movies carousel display
    const owlCarousel = $('.owl-carousel')
    if( owlCarousel ){
        owlCarousel.owlCarousel({
            dots: false,
            nav: true,
            loop: true,
            margin: 10,
            lazyLoad: true,
            responsiveClass: true,
            responsive: {
            0: { items: 2, nav: true, loop: false },
            600: { items: 4, nav: true, loop: false },
            1000: { items: 6, nav: false, loop: false, margin: 30 }
            }
        })
    }
})