import React, { DragEvent } from 'react'
import cn from 'classnames'

export interface DraggerProps {
    onFile: (files: FileList) => void
    children: React.ReactNode
}
const Dragger: React.FC<DraggerProps> = props => {
    const { onFile, children } = props
    const [dragOver, setDragOver] = React.useState(false)
    const classes = cn('guns-upload__dragger', {
        'is-dragover': dragOver,
    })

    const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false)
        const { files } = e.dataTransfer
        if (files && files.length > 0) {
            onFile(files)
        }
    }

    return (
        <div
            className={classes}
            onDragOver={e => {
                handleDrag(e, true)
            }}
            onDragLeave={e => {
                handleDrag(e, false)
            }}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger
