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
    const movie_covers = document.querySelectorAll('#movie_cover')
    if(movie_covers){
        movie_covers.forEach(cover => {
            cover.src = cover.dataset.img
        })
    }

    // Prevent submiting empty search form
    const search_form = document.querySelectorAll('#search-form')
    if(search_form){
        search_form.forEach(form => {
            form.addEventListener('submit', e => {
                const formdata = new FormData(e.target)
                if(!formdata.get('search')  && !formdata.get('order')){
                    e.preventDefault()
                }
            })
        })
    }
})