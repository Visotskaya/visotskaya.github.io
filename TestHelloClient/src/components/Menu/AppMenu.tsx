import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from './Menu';
import { AppMenuProps, MenuItem } from '../../types/menu';

export const AppMenu: React.FC<AppMenuProps> = ({items, className = '', children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);

    const findActiveItemId = (menuItems: MenuItem[], currentPath: string): string | undefined => {
        for (const item of menuItems) {
            if (item.children) {
                const childActiveId = findActiveItemId(item.children, currentPath);
                if (childActiveId) return childActiveId;
            }
            if (currentPath === `/${item.id}` || (item.id === 'home' && currentPath === '/')) {
                return item.id;
            }
        }
        return undefined;
    };

    const activeItemId = findActiveItemId(items, location.pathname);

    const handleItemClick = (itemId: string) => {
        const path = itemId === 'home' ? '/' : `/${itemId}`;
        navigate(path);
    };

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <Menu
            items={items}
            activeItemId={activeItemId}
            onItemClick={handleItemClick}
            className={className}
            isExpanded={isExpanded}
            onToggle={handleToggle}
        >
            {children}
        </Menu>
    );
};