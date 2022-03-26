import { HandleProps } from "react-flow-renderer";

export interface WHandleProps {
    className?: string;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    direction: string;
}