import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import React from "react";
import { auth } from "./utils/firebase";
import { signOut } from "firebase/auth";
function Header() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);
    return (
        <Menu inverted pointing stackable  >
            <Menu.Item as={Link} to="/posts">
            <img alt="logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' />
            </Menu.Item>
            <Menu.Menu position="right">
                {user ? (<>
                    <Menu.Item as={Link} to="/new-post">
                        發表文章
                    </Menu.Item>
                    <Menu.Item as={Link} to="/my">
                        會員
                    </Menu.Item>
                    <Menu.Item as={Link} to="/posts" onClick={() => signOut(auth)}>
                        登出
                    </Menu.Item>
                </>) : (
                    <Menu.Item as={Link} to="/signin">
                        註冊/登入
                    </Menu.Item>
                )};
            </Menu.Menu>
        </Menu>
        
    );
}

export default Header;

