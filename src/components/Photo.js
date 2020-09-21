import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import { url } from '../utils/CloudinaryService';
import PhotoThumbnails from './PhotoThumbnails';
import {CloudinaryContext} from 'cloudinary-react';
import "../main.css"
// import Pattern from "https://cdn.glitch.com/36f6b162-1d74-4754-8c4a-8326b3e8a9d1%2Fmodel_2.png?v=1600647689785";

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { showMore: false };
    }

    render() {
        const model = "https://cdn.glitch.com/36f6b162-1d74-4754-8c4a-8326b3e8a9d1%2Fmodel_2.png?v=1600647689785"
        const options = { ...this.context, ...this.props };
        const urlPath = url(options.publicId, options);
        // const pattern = `https://res.cloudinary.com/diarrablu/image/upload/diarrablu/uploads/${this.props.publicId}.png`
        const pattern = urlPath

        console.log(this.props.publicId,pattern)
        const style = {backgroundImage:`url(${pattern}),url(${model}) ` }
        return (
            <div>

                <div
                    className="blend"
                    style = {style}
                />

                <div
                    className="collar"
                />


            </div>
        );
    }

    showMore() {
        this.setState({ showMore: true });
    }

    showLess() {
        this.setState({ showMore: false });
    }

    static contextType = CloudinaryContext.contextType;
}

Photo.propTypes = {
    context: PropTypes.object,
    publicId: PropTypes.string,
};

export default Photo;
