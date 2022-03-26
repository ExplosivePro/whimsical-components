import { memo } from 'react';
import { WNodeProps } from './type'
import WHandle from '../WHandle'
import { useState } from 'react'
import styles from './style.module.css';

interface Dimension {
    x: number;
    y: number;
}

interface Point {
    x: number;
    y: number;
}

export default memo(({id, selected, xPos, yPos, data, className }: WNodeProps) => {
    const [isActive, setActive] = useState(selected)
    const [dimension, setDimension] = useState<Dimension>({ x: 250, y: 40 })

    let directions = ["tl", "tm", "tr", "bl", "bm", "br", "ml", "mr"]


    const [fixed, setFixed] = useState<Point>({ x: 0, y: 0 })
    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        let direction = event.currentTarget.dataset.direction;
        let ret = { x: 0, y: 0 }

        switch (direction) {
            case "tl":
            case "ml":
                ret = { x: xPos + dimension.x, y: yPos + dimension.y }
                break;
            case "bl":
                ret = { x: xPos + dimension.x, y: yPos }
                break;
            case "tr":
            case "tm":
                ret = { x: xPos, y: yPos + dimension.y }
                break;
            default:
                ret = { x: xPos, y: yPos }
                break;
        }
        setFixed(ret)
    }
    const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
        let direction = event.currentTarget.dataset.direction;
        if (!direction || (event.clientX === 0 && event.clientX === 0))
            return
            

        let ratio = dimension.x / dimension.y
        let newPosition = { x: xPos, y: yPos }
        let newDimension = { x: 0, y: 0 }

        if (direction[0] === 't') {
            newDimension.y = fixed.y - event.clientY
        } else if (direction[0] === 'm') {
            newDimension.y = dimension.y
        } else {
            newDimension.y = event.clientY - fixed.y - 20
        }

        if (direction[1] === 'l') {
            newDimension.x = fixed.x - event.clientX
        } else if (direction[1] === 'm') {
            newDimension.x = dimension.x
        } else {
            newDimension.x = event.clientX - fixed.x - 20
        }

        if (event.shiftKey) {
            if (direction[0] !== "m" && direction[1] !== "m") {
                if (newDimension.x > newDimension.y * ratio) {
                    newDimension.x = newDimension.y * ratio
                }
                else {
                    newDimension.y = newDimension.x / ratio
                }
            } else {
                newDimension.x = direction['1'] === 'm' ? newDimension.y * ratio : newDimension.x
                newDimension.y = direction['0'] === 'm' ? newDimension.x / ratio : newDimension.y                
            }
        }
        if (direction[0] !== "m" && direction[1] !== "m") {
            newPosition.x = direction['1'] === 'r' ? fixed.x : fixed.x - newDimension.x
            newPosition.y = direction['0'] === 'b' ? fixed.y : fixed.y - newDimension.y
        } else {
            if (direction === 'tm')
                newPosition = { x: fixed.x, y: event.clientY + 5 }
            else if (direction === 'ml')
                newPosition = { x: fixed.x - newDimension.x, y: fixed.y - newDimension.y }
        }

        data.onChange(id, { position: newPosition })
        setDimension(newDimension)
    };

    let style = { width: dimension.x, height: dimension.y }
    let classList = isActive ? [styles.active, styles.w_node, "w-min-40 h-min-40", className] : [styles.w_node, className]
    return (
        <div
            className={classList.join(" ")}
            onClick={() => setActive(!isActive)}
            style={style}
        >
        {
            isActive ? (
            <>
            {
                directions.map((direction: string, index: number) => (
                    <WHandle
                        key={'id-' + index}
                        direction={direction}
                        onDrag={handleDrag}
                        onDragStart={onDragStart}
                    />
                ))
            }
            </>
            ) : null
        }
            <div className="text-center w-full">
                {data.label}
            </div>
        </div>
    )
})