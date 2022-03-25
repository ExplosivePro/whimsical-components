import {WHandleProps} from './type'
import { Handle } from "react-flow-renderer"
import styles from './index.module.css'; 

export default function WHandle(props: WHandleProps) {
    let className = [props.className, styles.handle].join(" ")
    return (
        <Handle draggable type={props.type} position={props.position} className={className}/>
    )
}