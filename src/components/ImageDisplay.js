import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, json: [], error: "" }
    }

    render() {
        console.log("in image display");
        console.log(this.props.imageUrls);
        return (
            <Fragment>
                <Container>
                    {this.props.imageUrls.map((src, key) => { return <img key={key} src={src} />})}
                </Container>
            </Fragment>
        );
    }
}

export default ImageDisplay;