import React from 'react';
import { Menu, Button } from "semantic-ui-react";
import { getColor } from "../../../utils/basic/button";
import { menubackgroundColor, backgroundColor }from '../../../constants';


interface ButtonProps {
    name: string;
    title: string;
    onClick: (name: string) => void;
}

export const AppButton = ({ name, title, onClick }: ButtonProps) => {
    return (
        <Menu compact stackable borderless style={{ background: backgroundColor }}>
            <Menu.Item onClick={() => onClick(name)} style={{ background: menubackgroundColor }}>
                {title}
            </Menu.Item>
        </Menu>
    )
};

export interface Item {
    name: string;
    title: string;
    color: string;
    onClick: (menuItem: string) => void;
}

interface MenuProps {
    menuItems: Item[];
    style: {};
    backgroundColor: string;
}

export const AppMenu = ({ menuItems, style, backgroundColor }: MenuProps) => {
    return (
        <Menu compact stackable borderless style={{ background: backgroundColor }}>
            {Object.values(menuItems).map((menuItem: Item, index: number) => (
                <Menu.Item key={menuItem.name} onClick={() => menuItem.onClick(menuItem.name)} style={{ background: menubackgroundColor }}>
                    {menuItem.title}
                    {/* <Button color={getColor(menuItems[index].color)} style={style} onClick={() => menuItem.onClick(menuItem.name) }>{menuItem.title}</Button> */}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export interface ItemOpt {
    name: string;
    title: string;
    color: string;
    type: string;
    options: string[];
    onClick: (menuItem: string) => void;
    onSelection: (menuItem: string, selection: string) => void;
}

interface MenuPropsOpt {
    menuItems: ItemOpt[];
    style: {};
    backgroundColor: string;
}

export const AppMenuOpt = ({ menuItems, style, backgroundColor }: MenuPropsOpt) => {
    return (
        <Menu compact stackable borderless style={{ background: backgroundColor }}>
            {Object.values(menuItems).map((menuItem: ItemOpt, index: number) => (
                <Menu.Item key={index}>
                    {menuItem.type==='0'&&
                        <Button color={getColor(menuItem.color)} style={style} onClick={() => menuItem.onClick(menuItem.name) }>{menuItem.title}</Button>
                    }
                    {menuItem.type==='1'&&
                        <Button as="select" className="ui dropdown" color={getColor(menuItem.color)} style={style}
                            onChange={( event: React.FormEvent<HTMLInputElement> ) => menuItem.onSelection(menuItem.name, event.currentTarget.value)} >
                            <option value="" color={getColor(menuItem.color)} style={style}>{menuItem.title}</option>
                            {menuItem.options.map((option: string, index: number) => (
                                <option key={index} value={option} color={getColor(menuItem.color)} style={style}>{option}</option>
                            ))}
                        </Button>
                    }
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default AppMenu 