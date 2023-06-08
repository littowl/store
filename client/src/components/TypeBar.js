import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from ".."
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const {toy} = useContext(Context)
    return (
        <div>
            Типы:
            <ListGroup className="mt-2">
                {toy.types.map(type =>
                    <ListGroup.Item 
                        onClick={() => toy.selectedType = type}
                        style={{cursor: "pointer", border: type.id === toy.selectedType.id ? '2px solid pink' : '1px solid lightgray'}}
                        key={type.id}
                    >
                        {type.name}</ListGroup.Item>
                )}
            </ListGroup>
        </div>
        
    )
})

export default TypeBar