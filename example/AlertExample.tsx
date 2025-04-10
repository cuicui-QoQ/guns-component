import Alert, { AlertType } from '../src/components/Alert/alert'
function AlertExample() {
    return (
        <div style={{ width: '300px' }}>
            <Alert
                showIcon
                message={'Success Text'}
                type={AlertType.Success}
                afterClose={() => {
                    console.log('close')
                }}
                closable
                action={<div>actionNode</div>}
            ></Alert>
            <Alert
                showIcon
                message={'Info Text'}
                type={AlertType.Info}
                description={
                    'Additional description and information about copywriting.'
                }
            ></Alert>
            <Alert
                showIcon
                message={'Warning Text'}
                type={AlertType.Warning}
            ></Alert>
            <Alert
                showIcon
                message={'Error Text'}
                type={AlertType.Error}
            ></Alert>
        </div>
    )
}

export default AlertExample
