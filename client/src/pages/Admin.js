import Button from "react-bootstrap/esm/Button"
import Container from "react-bootstrap/esm/Container"
import CreateType from "../components/modals/CreateType"
import CreateBrand from "../components/modals/CreateBrand"
import CreateToy from "../components/modals/CreateToy"
import { useState } from "react"

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [toyVisible, setToyVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant="outline-dark" className="mt-4" onClick={() =>setTypeVisible(true)}>Добавить тип</Button>
            <Button variant="outline-dark" className="mt-4" onClick={() =>setBrandVisible(true)}>Добавить бренд</Button>
            <Button variant="outline-dark" className="mt-4" onClick={() =>setToyVisible(true)}>Добавить товар</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateToy show={toyVisible} onHide={() => setToyVisible(false)}/>
        </Container>
    )
}

export default Admin