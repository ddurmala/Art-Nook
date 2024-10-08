import { useQuery } from "@apollo/client"

import ArtItem from "../components/ArtItem"

import { GET_ALL_ARTWORK } from "../graphql/queries"


function MainGallery({user}) {
    const { data } = useQuery(GET_ALL_ARTWORK)

    return (
        <>
            <section>
                <h1 className="main-gallery basicfont text-center mb-5">The Art Show</h1>
            </section>


            <section id="main-gallery-output" className="container text-center">


                <div className="row">
                    {data?.getAllArtwork.map((art, index) => (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                            <ArtItem
                                showFav={true}
                                art={art}
                                main={true}
                                user={user} />
                        </div>
                    ))}

                </div>

            </section>
        </>
    )
}

export default MainGallery