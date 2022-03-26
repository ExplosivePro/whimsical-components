import {WHandleProps} from './type'
import { Handle } from "react-flow-renderer"
import styles from './index.module.css'; 
import { Position } from "react-flow-renderer"

export default function WHandle({className, direction, onDrag, onDragStart}: WHandleProps) {

    const getPosition = (direction: string): Position => {
        return direction[0] === 'm' ? (
            direction[1] === 'r' ? Position.Right : Position.Left
        ) : (
            direction[0] === 't' ? Position.Top : Position.Bottom 
        )
    }
    
    let customClass = [className, styles.w_handle, styles.handle, styles[`handle_${direction}`]].join(" ")
    return (
        <Handle draggable 
            type='source'
            className={customClass}
            position={getPosition(direction)}
            onDrag = {onDrag}
            onDragStart = {onDragStart}
            data-direction={direction}
        />
    )
}