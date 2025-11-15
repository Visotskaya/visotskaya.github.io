import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {MenuItem, MenuProps, RenderProps} from '../../types/menu';

const MenuContext = createContext<Omit<RenderProps, 'items'> | null>(null);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a Menu component');
    }
    return context;
};

export const Menu: React.FC<MenuProps> = ({
                                              items,
                                              activeItemId,
                                              onItemClick,
                                              className = '',
                                              isExpanded,
                                              onToggle,
                                              children
                                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [checkMobile]);

    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);

    // Автоматически раскрываем родительские элементы если активен дочерний
    useEffect(() => {
        if (activeItemId) {
            const findParentIds = (menuItems: MenuItem[], targetId: string, parents: string[] = []): string[] => {
                for (const item of menuItems) {
                    if (item.id === targetId) {
                        return parents;
                    }
                    if (item.children) {
                        const found = findParentIds(item.children, targetId, [...parents, item.id]);
                        if (found.length > 0) return found;
                    }
                }
                return [];
            };

            const parentIds = findParentIds(items, activeItemId);
            const newSet = new Set(expandedItems);
            parentIds.forEach(id => newSet.add(id));
            setExpandedItems(newSet);
        }
    }, [activeItemId, items]);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const toggleExpandedItem = useCallback((itemId: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    }, []);

    const handleItemClick = useCallback((itemId: string) => {
        onItemClick?.(itemId);

        if (isMobile) {
            setIsOpen(false);
        }
    }, [onItemClick, isMobile]);

    const renderProps: RenderProps = {
        items,
        activeItemId,
        isMobile,
        isOpen,
        isExpanded,
        toggleMenu,
        handleItemClick,
        expandedItems,
        toggleExpandedItem,
        onToggle
    };

    return (
        <MenuContext.Provider value={{
            activeItemId,
            isMobile,
            isOpen,
            isExpanded,
            toggleMenu,
            handleItemClick,
            expandedItems,
            toggleExpandedItem,
            onToggle
        }}>
            <div className={`menu ${className}`}>
                {children(renderProps)}
            </div>
        </MenuContext.Provider>
    );
};