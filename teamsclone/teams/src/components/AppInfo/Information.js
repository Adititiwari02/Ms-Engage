import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Header from './../HeaderFooter/Header';
import { Container} from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import carousel from "./../../css/carousel.css"
import chat from "./../../Images/chat.png";
import makeGroup from "./../../Images/makeGroup.png";
import makeNote from "./../../Images/makeNote.png";
import videoCall from "./../../Images/videoCall.png";
import themes from "./../../Images/themes.jpeg";

function Information() {
    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ maxHeight: "100vh" }} style={{ maxwidth: "100%" }}>
            <div className="w-100">
            <h1 style={{textAlign: "center", marginBottom: "40px"}}>Some features of the app!!</h1>
            <Carousel>
            <Carousel.Item style={{height: "500px"}}>
                <img
                height="500px"
                width="100%"
                className="d-block w-100"
                src={videoCall}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item style={{height: "500px"}}>
                <img
                height="500px"
                width="100%"
                className="d-block w-100"
                src={makeGroup}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item style={{height: "500px"}}>
                <img
                height="500px"
                width="100%"
                className="d-block w-100"
                src={chat}
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item style={{height: "500px"}}>
                <img
                height="500px"
                width="100%"
                className="d-block w-100"
                src={makeNote}
                alt="Fourth slide"
                />
            </Carousel.Item>
            <Carousel.Item style={{height: "500px"}}>
                <img
                height="500px"
                width="100%"
                className="d-block w-100"
                src={themes}
                alt="Fifth slide"
                />
            </Carousel.Item>
            </Carousel>
            </div>
            </Container>
        </div>
    )
}

export default Information
