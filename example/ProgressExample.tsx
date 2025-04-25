import React from 'react'
import Progress from '../src/components/Progress/progress'
function ProgressExample() {
    const [percent, setPercent] = React.useState(30)

    return (
        <>
            <Progress percent={percent} styles={{ width: '100px' }} />
            <button
                onClick={() => {
                    setPercent(percent - 10)
                }}
            >
                -
            </button>
            <button
                onClick={() => {
                    setPercent(percent + 10)
                }}
            >
                +
            </button>
        </>
    )
}

export default ProgressExample
