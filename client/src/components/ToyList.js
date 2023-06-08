import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from ".."
import Row from "react-bootstrap/esm/Row"
import ToyItem from "./ToyItem"

const ToyList = observer(() => {
    const {toy} = useContext(Context)
    return (
        <Row className="d-flex">
            {toy.toys.map(toy =>
                <ToyItem className="ml-2" key={toy.id} toy={toy} />
            )}
        </Row>
    )
})

export default ToyList