import {WHandleProps} from './type'
import { Handle } from "react-flow-renderer"
import styles from './index.module.css'; 

export default function WHandle(props: WHandleProps) {
    let className = [styles.handle, styles.handle_h, props.className].join(" ")
    return (
        <Handle {...props} className={className}/>
    )
}