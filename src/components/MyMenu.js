import React from "react";
import { List } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
function MyMenu() {
  const location = useLocation();
  const menuItems = [
    {
      name: '我的文章',
      path: '/my/posts',
    },
    {
      name: '我的收藏',
      path: '/my/collections',
    }
  ];
  return <List inverted animated selection>
    {menuItems.map((menuItem) => {
      return (
        <List.Item inverted
          as={Link}
          to={menuItem.path}
          key={menuItem.name}
          active={menuItem.path === location.pathname}>
          <List.Header>
            {menuItem.name}
          </List.Header>
        </List.Item>
      );
    })}
  </List>
}
export default MyMenu;