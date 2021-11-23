import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react"
import { useHistory } from "react-router";

const NavBar = (props) => {
    const [opened, setOpened] = useState(false);
    const history = useHistory();
    const navigateTo = path => {
        history.push(path)
    }
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={()=>setOpened(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Gestión Informático
                </Typography>
                <Button onClick={()=>navigateTo("/login")} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={"left"}
                open={opened}
                onClose={()=>setOpened(false)}
            >
                <List>
                    <Divider />
                    {props.routes.map((route, index) => {
                        return (
                            <ListItem button key={index} onClick={()=>{navigateTo(route.path)}}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={route.text} />
                            </ListItem>
                        )
                    })
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default NavBar
