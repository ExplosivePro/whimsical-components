import { HandleProps } from "react-flow-renderer";

export interface WHandleProps extends HandleProps {
    className?: string;
    onDrag?: (event: React.DragEvent<HTMLDivElement>) => void
}