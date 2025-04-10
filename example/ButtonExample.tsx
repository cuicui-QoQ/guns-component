import Button, { ButtonSize, ButtonType } from '../src/components/Button/button'
function ButtonExample() {
    return (
        <>
            <>
                <Button
                    size={ButtonSize.Large}
                    onClick={e => {
                        console.log(e.target)
                    }}
                >
                    Large
                </Button>
                <Button size={ButtonSize.Standard}>Standard</Button>
                <Button size={ButtonSize.Small}>Small</Button>
            </>
            <>
                <Button btnType={ButtonType.Primary}>Primary</Button>
                <Button btnType={ButtonType.Danger}>Danger</Button>
                <Button btnType={ButtonType.Default}>Default</Button>
                <Button
                    btnType={ButtonType.Link}
                    href={'https://www.baidu.com'}
                >
                    Link
                </Button>
            </>
            <>
                <Button disabled> hello </Button>
            </>
        </>
    )
}

export default ButtonExample
