import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import star from '../assets/star.svg'
import Button from "react-bootstrap/esm/Button"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchOneToy } from "../http/toyAPI"

const ToyPage = () => {
    const [toy, setToy] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetchOneToy(id).then(data => setToy(data))
    })
    return (
        <Container className="mt-3"> 
        <Row>
            <Col md={4}>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL + toy.img}/>
            </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2>{toy.name}</h2>
                    
                        {toy.rating}
                    
                </Row>
            </Col>
            <Col md={4}>
                <Card
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width:300, height: 300, fontSize:32, border: '1px solid'}}
                >
                    <h3>{toy.price} руб.</h3>
                    <Button variant="outline-dark">Добавить в корзину</Button>
                </Card> 
            </Col>
        </Row>
        <Row className="d-flex flex-column m-3">
            <h1>Характеристики:</h1>
            {/* {description.map((info, id) => 
                <Row key={info.id} style={{background: id%2 ? 'lightgray' : 'transparent', padding:3}}>
                    {info.title}:{info.description}
                </Row>    
            )} */}
        </Row>
            
        </Container>
    )
}

export default ToyPage