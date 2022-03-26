import { NodeProps } from "react-flow-renderer";

export interface WNodeProps extends NodeProps {
    isActive?: boolean
    className?: string
}