import Menu from '../src/components/Menu/menu'
import MenuItem from '../src/components/Menu/menuItem'
import SubMenu from '../src/components/Menu/subMenu'

function MenuExample() {
    return (
        <>
            <>
                <Menu onSelect={index => alert(index)}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link</MenuItem>
                    <MenuItem>cool link</MenuItem>
                </Menu>
            </>
            <>
                <Menu mode="vertical" onSelect={index => alert(index)}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link</MenuItem>
                    <MenuItem>cool link</MenuItem>
                </Menu>
            </>
            <>
                <Menu onSelect={index => alert(index)}>
                    <MenuItem>cool link</MenuItem>
                    <MenuItem disabled>cool link</MenuItem>
                    <SubMenu title="横向子菜单">
                        <MenuItem>cool link</MenuItem>
                        <MenuItem disabled>cool link</MenuItem>
                        <MenuItem>cool link</MenuItem>
                    </SubMenu>
                    <MenuItem>cool link</MenuItem>
                </Menu>
            </>
            <>
                <Menu mode="vertical" onSelect={index => alert(index)}>
                    <MenuItem>cool link 乘风破浪会有时直挂云帆济沧海</MenuItem>
                    <MenuItem disabled>cool link</MenuItem>
                    <SubMenu title="纵向子菜单">
                        <MenuItem>cool link</MenuItem>
                        <MenuItem disabled>cool link</MenuItem>
                        <MenuItem>cool link</MenuItem>
                    </SubMenu>
                    <MenuItem>cool link</MenuItem>
                </Menu>
            </>
        </>
    )
}

export default MenuExample
