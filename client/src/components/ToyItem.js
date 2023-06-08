import Col from "react-bootstrap/esm/Col"
import Card from "react-bootstrap/esm/Card"
import Image from 'react-bootstrap/esm/Image'
import star from '../assets/star.svg'
import { useNavigate } from "react-router-dom"
import { TOY_ROUTE } from "../utils/consts"

const ToyItem = ({toy}) => {

    let navigate = useNavigate()

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(TOY_ROUTE + '/' + toy.id)}>
            <Card style={{cursor: 'pointer'}} border="light">
                <Image witdh={200} height={200} src={process.env.REACT_APP_API_URL + toy.img}/>
                <div className="d-flex justify-content-between mt-1">
                    <div className="text-black-50">Brand</div>
                    <div className="d-flex align-items-center">
                        <div>{toy.rating}</div>
                        <Image src={star} width={20} height={20}/>
                    </div>
                    
                </div>
                <div>{toy.name}</div>
            </Card>
        </Col>
    )
}

export default ToyItem