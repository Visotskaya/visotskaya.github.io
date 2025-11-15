export interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    children?: MenuItem[];
    path?: string; // Добавляем путь для роутинга
}

export interface MenuProps {
    items: MenuItem[];
    activeItemId?: string;
    onItemClick?: (itemId: string) => void;
    className?: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: (props: RenderProps) => React.ReactNode;
}

export interface RenderProps {
    items: MenuItem[];
    activeItemId?: string;
    isMobile: boolean;
    isOpen: boolean;
    isExpanded: boolean;
    toggleMenu: () => void;
    handleItemClick: (itemId: string) => void;
    expandedItems: Set<string>;
    toggleExpandedItem: (itemId: string) => void;
    onToggle: () => void;
}

export interface AppMenuProps {
    items: MenuItem[];
    className?: string;
    children: (props: any) => React.ReactNode;
}