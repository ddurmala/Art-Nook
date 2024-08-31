import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { useState } from 'react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { useMutation } from '@apollo/client'

import UploadWidget from './UploadWidget';
import { ADD_ARTWORK, DELETE_ARTWORK } from '../graphql/mutations'

const initialFormData = {
    title: '',
    description: '',
    imageUrl: '',
    date: '',
    errorMessage: ''
}

const ArtForm = () => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState(initialFormData);

    const [addArtwork] = useMutation(ADD_ARTWORK, {
        variables: formData,
        // refetchQueries: [GET_USER_ARTWORK, GET_ALL_ARTWORK]
    })

    const handleInputChange = event => {

        setFormData(prevState => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async event => {

        event.preventDefault()

        console.log(formData)

        const res = await addArtwork();

        console.log(res)

        setFormData({
            ...initialFormData
        })
    }

    const handleUpload = (error, result, widget) => {
        if (error) {
            // updateError(error);
            console.log(error)

            setFormData({
                ...formData,
                errorMessage: error.message
            })

            widget.close({
                quiet: true
            });

            return;
        }

        setFormData({
            ...formData,
            imageUrl: result.info.secure_url
        })

        setShowForm(true)

    };

    return (
        <>
            {!showForm ? (
                //     {/* Cloudinary Widget */}

                <div className="row justify-content-center">
                    <UploadWidget onUpload={handleUpload}>
                        {({ open }) => {
                            function handleOnClick(e) {
                                e.preventDefault();
                                open();
                            }
                            return (
                                <button class="position-absolute top-50 col-3" id="upload-image-btn" onClick={handleOnClick}>
                                    Upload an Image
                                </button>
                            )
                        }}
                    </UploadWidget>
                </div>
            ) : (
                <form >
                    <div className="mb-3">
                        <label className="form-label">Artwork Title</label>
                        <input onChange={handleInputChange} name="title" value={formData.title} type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input onChange={handleInputChange} name="description" value={formData.description} type="text" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Month & Year Art was Created:</label>
                        <input onChange={handleInputChange} name="date" type="text" value={formData.date} placeholder="MM/YYYY" />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>

            )}

        </>
    );
};

export default ArtForm;

