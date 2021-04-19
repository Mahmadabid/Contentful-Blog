import React from 'react'
import { Avatar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../Global/Types/SliceTypes';
import { setLoggedIn } from '../Global/Slice/LogInSlice';
import { addUser } from '../Global/Slice/userSlice';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'gatsby-plugin-firebase';

export const LogIn = () => {

    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    const isLogged = useSelector((state: State) => state.LogIn.value);
    const dispatch = useDispatch();
    const picture = useSelector((state: State) => state.user.picture);
    const name = useSelector((state: State) => state.user.name);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogIn = () => {
        auth
            .signInWithPopup(provider)
            .then((_result: any) => {
                /** @type {firebase.auth.OAuthCredential} */
                dispatch(setLoggedIn())
            }).catch((error: any) => {
                console.log(error);;
            });
    }

    const onLogout = () => {
        auth.signOut().then(function () {
            alert("You are logged out");
            dispatch(setLoggedIn())
        }).catch(function (error) {
            console.log(error)
        })

        handleClose();
    }

    auth.onAuthStateChanged(function (user) {
        if (user) {
            dispatch(addUser({ name: user.displayName, picture: user.photoURL }))
        } else {
            console.log("err");
        }
    });

    return (
        <div>
            {!isLogged ?
                <a onClick={onLogIn}>
                    <Button variant="outlined" color="primary"> Sign In</Button>
                </a>
                :
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" style={{ backgroundColor: 'transparent' }} disableFocusRipple={true} disableRipple={true} onClick={handleClick}>
                        <Avatar src={picture} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem disabled>{name}</MenuItem>
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            }

        </div>
    )
}
