import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { openUploadWidget } from '../utils/CloudinaryService';
import { photosUploaded } from '../actions';
import { updateUploadedPhoto } from '../actions';

import Photo from './Photo';
import Introduction from './Introduction';
import {CloudinaryContext} from 'cloudinary-react';

class PhotoList extends Component {
    constructor(props) {
        super(props);
        this.state = { newPhoto: false };
    }

    render() {
        console.log(this.state.newPhoto)
        return (
            <div className="photoList">



                <div className="actions">
                    <a
                        className="upload_link"
                        onClick={this.uploadImageWithCloudinary.bind(this)}
                    >
                        Add photo
                    </a>
                </div>

                <div className="photos">
                    {this.props.photos.length === 0 && (
                        <p>No photos were added yet.</p>
                    )}
                    {
                    // {this.props.photos.map(photo => {
                    //     return (
                    //         <Photo
                    //             key={photo.public_id}
                    //             publicId={photo.public_id}
                    //         />
                    //     );
                    // })}
                  }
                            {
                              this.state.newPhoto &&
                            <Photo
                                key={this.state.newPhoto[0].asset_id}
                                publicId={this.state.newPhoto[0].public_id}
                            />
                          }


                </div>
            </div>
        );
    }

    uploadImageWithCloudinary() {
        const uploadOptions = { tags: 'myphotoalbum', ...this.context };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                this.props.onPhotosUploaded(photos);
                this.setState({newPhoto:photos})
                console.log(this.state.newPhoto,photos)
            } else {
                console.log(error);
            }
        });
    }

    static contextType = CloudinaryContext.contextType;
}

PhotoList.propTypes = {
    photos: PropTypes.array,
    onPhotosUploaded: PropTypes.func,
};

const PhotoListContainer = connect(
    state => ({ photos: state.photos }),
    {
        onPhotosUploaded: photosUploaded,
    }
)(PhotoList);

Object.assign(PhotoListContainer.contextTypes, PhotoList.contextTypes);

export default PhotoListContainer;
