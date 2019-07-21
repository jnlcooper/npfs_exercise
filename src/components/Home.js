import React, { Fragment } from 'react';
import {Jumbotron, Container, Form, Col, Row, Button} from 'react-bootstrap';
import axios from 'axios';
import './Home.css';
import { Heading } from './Heading';
import ImageDisplay from './ImageDisplay'

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            keyword: "",
            width: 0,
            height: 0,
            widthErr: false,
            heightErr: false,
            jumboImg: [],
            imageUrls: []
        });
    }
    
    async componentDidMount() {
        const banner = await this.getRandomPhotos("coding", 300, 1400, 1);
        this.setState({jumboImg: banner})
    }

    async getRandomPhotos(query, height, width, count) {
        const res = await axios.get(`https://api.unsplash.com/photos/random`, {
            params: { query, count: String(count) },
            headers: {
                Authorization: 'Client-ID 33fef47b7e5bc5ecea2c1ae746956d21523f80f931309ee2d7394b6f754e3aea'
            }
        });
        return res.data.map(src => { return `${src.urls.raw}&h=${height}&w=${width}&fit=crop` });
    }

    onSearchClick = () => {
        let err = false;
        const {keyword, height, width} = this.state;

        if(width <= 0) {
            this.setState({widthErr: true});
            err = true;
        }

        if(height <= 0) {
            this.setState({heightErr: true});
            err = true;
        }

        if(err) return;

        this.getRandomPhotos(keyword, height, width, 6)
            .then(imageUrls => {
                this.setState({imageUrls})
            });

    }

    render() {
        return (
            <Fragment>
                <Heading />
                <Jumbotron className="jumbo">
                    <img src={this.state.jumboImg} className="jumbo-img"/>
                </Jumbotron>
                <Container className="mb-5">
                    <Form>
                        <Row>
                            <Form.Group as={Col} controlId="formGridKeyword" className="mb-0">
                                <Form.Label>KEYWORD</Form.Label>
                                <Form.Control input="text" placeholder="Enter keyword" onChange={event => this.setState({keyword: event.target.value})} />
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="formGridWidth" className="mb-0">
                                <Form.Label>IMAGE WIDTH *</Form.Label>
                                <Form.Control input="text" placeholder="Enter image width" onChange={event => this.setState({width: event.target.value, widthErr: false})} isInvalid={isNaN(this.state.width) || this.state.widthErr}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridHeight" className="mb-0">
                                <Form.Label>IMAGE HEIGHT *</Form.Label>
                                <Form.Control input="text" placeholder="Enter image height" onChange={event => this.setState({height: event.target.value, heightErr: false})} isInvalid={isNaN(this.state.height) || this.state.heightErr}/>
                            </Form.Group>
                            
                            <Col className="search-btn-col">
                                <Button variant="primary" onClick={this.onSearchClick}>Search!</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <ImageDisplay 
                    imageUrls={this.state.imageUrls}
                />
            </Fragment>
        );
    }
}

export default Home;