import {WNodeProps} from './type'
import WHandle from '../WHandle'
import { Position } from "react-flow-renderer"
import { useCallback, useRef, useState } from 'react'
import styles from './style.module.css'; 
import './index.css'

export default function WNode(props: WNodeProps) {
    let [isActive, setActive] = useState(props.isActive)

    let handles = ["tl", "tm", "tr", "bl", "bm", "br", "l", "r"]

    const getPosition = (str: string): Position => {
        let pos = Position.Right
        switch (str.charAt(0)){
            case 't':
                pos = Position.Top
                break
            case 'b':
                pos = Position.Bottom
                break
            case 'l':
                pos = Position.Left
                break
            default:
                break;
        }
        return pos
    }
    // const nodeEl = useRef(null);

    const [height, setHeight] = useState<'auto' | number>('auto');
    const [width, setWidth] = useState<'auto' | number>('auto');
    const nodeEl = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
            setWidth(node.getBoundingClientRect().width);
        }
    }, []);

    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        console.log(event)
        setHeight(Number(height) + event.movementY)
        setWidth(Number(width) + event.movementX)
    }

    let classList = isActive ? [styles.active, styles.w_node, props.className]: [styles.w_node, props.className]
    return (
        <div
            className={classList.join(" ")}
            style={{height: height, width: width}}
            onClick={() => setActive(!isActive)} ref={nodeEl}
            onDrag={handleDrag}
        >
            {
                isActive ? (
                    <>
                    {
                        handles.map((handle: string, index: number) => (
                            <WHandle
                                position={getPosition(handle)}
                                type={"source"}
                                className={`handle_${handle}`}
                                onDrag = {handleDrag}
                                key={index}
                            />
                        ))
                    }
                    </>
                ) : null
            }
            <div className="text-center">
                click here to see Transform tools
            </div>
        </div>
    )
}