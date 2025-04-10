import Menu from '../src/components/Menu/menu'
import MenuItem from '../src/components/Menu/menuItem'

function MenuExample() {
    return (
        <>
            <>
                <Menu onSelect={index => alert(index)}>
                    <MenuItem index={0}>cool link</MenuItem>
                    <MenuItem index={1} disabled>
                        cool link
                    </MenuItem>
                    <MenuItem index={2}>cool link</MenuItem>
                </Menu>
            </>
            <>
                <Menu mode="vertical" onSelect={index => alert(index)}>
                    <MenuItem index={0}>cool link</MenuItem>
                    <MenuItem index={1} disabled>
                        cool link
                    </MenuItem>
                    <MenuItem index={2}>cool link</MenuItem>
                </Menu>
            </>
        </>
    )
}

export default MenuExample
