const AnimeImage = ({animeImageInfo}) => {
    return (
        <div className = 'container my-5'>
            <img src = {animeImageInfo.url} className = 'img rounded mx-auto d-block' style = {{height: "35rem" }} alt = 'catgirls for the wiiiin'/>
        </div>
    )
}

export default AnimeImage
