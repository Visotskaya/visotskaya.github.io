import React, { useState, useEffect } from 'react';
import { useMenu } from './Menu';
import { MenuItem } from '../../types/menu';

// Иконки Material Design
const MenuIcons: Record<string, string> = {
    cars: 'toys',
    toys: 'cruelty_free',
    time: 'pie_chart',
    eco: 'eco',
    sweets: 'icecream',
    castle: 'castle',
    payment:'paid'
};

const MenuItemComponent: React.FC<{
    item: MenuItem;
    level?: number;
    isExpanded: boolean;
    isMobile: boolean;
    onItemClickWithChildren?: (itemId: string) => void;
    onAnyItemClick?: () => void;
}> = ({ item, level = 0, isExpanded, isMobile, onItemClickWithChildren, onAnyItemClick }) => {
    const {
        activeItemId,
        handleItemClick,
        expandedItems,
        toggleExpandedItem
    } = useMenu();

    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItemId === item.id;
    const isParentActive = item.children?.some(child => activeItemId === child.id);
    const isExpandedItem = expandedItems.has(item.id);

    const handleClick = () => {
        // Сначала закрываем всплывающее меню (если открыто)
        onAnyItemClick?.();

        if (hasChildren) {
            if (isExpanded && !isMobile) {
                // В развернутом состоянии на десктопе - раскрываем/скрываем подменю
                toggleExpandedItem(item.id);
            } else {
                // В свернутом состоянии или на мобильных - вызываем колбэк для показа всплывающего меню
                onItemClickWithChildren?.(item.id);
            }
        } else {
            handleItemClick(item.id);
        }
    };

    // Показываем текст только в развернутом состоянии или для подпунктов
    const showText = isExpanded || level > 0;

    return (
        <div>
            <button
                onClick={handleClick}
                className={`
          w-full text-left py-3 rounded-none transition-all duration-200 
          flex items-center group relative
          ${level > 0 ? 'text-sm' : ''}
          ${isActive
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500'
                    : isParentActive
                        ? 'bg-gray-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                }
          ${level === 0 ? 'px-4' : 'px-6'}
        `}
                style={{
                    paddingLeft: `${level * 16 + (isExpanded ? 16 : level > 0 ? 48 : 16)}px`,
                    marginBottom: '2px'
                }}
                title={!showText ? item.label : undefined}
            >
                {/* Material Design иконка */}
                <span className={`
          material-icons-round flex-shrink-0 transition-all duration-200
          ${isActive ? 'text-blue-500' : isParentActive? 'text-blue-500' : 'text-gray-500'}
          ${showText ? 'mr-4 text-xl' : 'mx-auto text-2xl'}
        `}>
                    {MenuIcons[item.id] || 'arrow_right'}
                </span>

                {/* Текст и дополнительные элементы */}
                {showText && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="font-medium truncate">
                            {item.label}
                        </span>
                        {hasChildren && isExpanded && !isMobile && (
                            <span className={`material-icons-round transform transition-transform duration-200 text-gray-400 ${
                                isExpandedItem ? 'rotate-180' : ''
                            }`}>
                                expand_more
                            </span>
                        )}
                    </div>
                )}
            </button>

            {/* Подменю показываем ТОЛЬКО в развернутом состоянии и НЕ на мобильных */}
            {isExpanded && hasChildren && isExpandedItem && item.children && !isMobile && (
                <div className="mt-1">
                    {item.children.map(child => (
                        <MenuItemComponent
                            key={child.id}
                            item={child}
                            level={level + 1}
                            isExpanded={isExpanded}
                            isMobile={isMobile}
                            onAnyItemClick={onAnyItemClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Компонент для всплывающего подменю в свернутом состоянии (работает и на мобильных и на десктопе)
const FloatingSubmenu: React.FC<{
    item: MenuItem;
    isVisible: boolean;
    onItemClick: (itemId: string) => void;
    activeItemId?: string;
    topPosition: number;
    onClose: () => void;
    isMobile: boolean;
}> = ({ item, isVisible, onItemClick, activeItemId, topPosition, onClose, isMobile }) => {
    if (!isVisible || !item.children) return null;

    const handleChildClick = (childId: string) => {
        onItemClick(childId);
        onClose();
    };

    return (
        <div
            className={`
                absolute bg-white shadow-2xl rounded-lg py-2 z-50 min-w-56 border border-gray-200
                ${isMobile ? 'left-3 top-0' : 'left-3 top-0'}
            `}
            style={{ top: `${topPosition}px` }}
        >
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <span className="material-icons-round text-sm">close</span>
                </button>
            </div>
            {item.children.map(child => {
                const isChildActive = activeItemId === child.id;
                return (
                    <button
                        key={child.id}
                        onClick={() => handleChildClick(child.id)}
                        className={`
              w-full text-left px-4 py-3 transition-colors flex items-center
              text-sm
              ${isChildActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }
            `}
                    >
                        <span className="material-icons-round text-gray-500 text-lg mr-3">
                            {MenuIcons[child.id] || 'arrow_right'}
                        </span>
                        <span>{child.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export const StyledMenu: React.FC<{ items: MenuItem[] }> = ({ items }) => {
    const {
        isExpanded,
        onToggle,
        expandedItems,
        activeItemId,
        handleItemClick
    } = useMenu();

    const [clickedItem, setClickedItem] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Определяем мобильное устройство по ширине экрана
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Автоматически сворачиваем меню на мобильных устройствах
            if (mobile && isExpanded) {
                onToggle();
            }
        };

        // Проверяем при загрузке
        checkMobile();

        // Слушаем изменение размера окна
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [isExpanded, onToggle]);

    // Функция для вычисления позиции всплывающего меню
    const getItemTopPosition = (index: number) => {
        const headerHeight = 72; // Высота заголовка меню
        const itemHeight = 56; // Высота одного пункта меню
        return headerHeight + (index * itemHeight);
    };

    const handleItemClickWithChildren = (itemId: string) => {
        setClickedItem(prev => {
            if (prev === itemId) {
                return null;
            } else {
                return itemId;
            }
        });
    };

    const handleCloseFloatingMenu = () => {
        setClickedItem(null);
    };

    // Обработчик клика по любому пункту меню (закрывает всплывающее меню)
    const handleAnyItemClick = () => {
        setClickedItem(null);
    };

    // Обработчик клика по дочернему элементу
    const handleChildItemClick = (itemId: string) => {
        setClickedItem(null);
        setTimeout(() => {
            handleItemClick(itemId);
        }, 0);
    };

    // Закрываем всплывающее меню при клике вне его области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.floating-submenu') && !target.closest('.sidebar-menu')) {
                setClickedItem(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Material Design боковое меню слева */}
            <div className={`
        bg-white shadow-sm min-h-screen flex flex-col transition-all duration-300 relative
        border-r border-gray-200 sidebar-menu
        ${isExpanded && !isMobile ? 'w-64' : 'w-16'}
        ${isMobile ? 'fixed left-0 top-0 z-40 h-full' : ''}
      `}>



                {/* Навигация */}
                <div className="flex-1 py-2 overflow-y-auto">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative"
                        >
                            <MenuItemComponent
                                item={item}
                                isExpanded={isExpanded && !isMobile}
                                isMobile={isMobile}
                                onItemClickWithChildren={!isExpanded || isMobile ? handleItemClickWithChildren : undefined}
                                onAnyItemClick={handleAnyItemClick}
                            />
                        </div>
                    ))}
                </div>
                {/* Заголовок */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            <span className="material-icons-round text-white">mood</span>
                        </div>
                        {isExpanded && !isMobile && (
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl font-semibold text-gray-800">HelloClient</h1>
                                <p className="text-gray-500 text-xs">Тестовое задание</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Кнопка переключения состояния (скрываем на мобильных) */}
                {!isMobile && (
                    <button
                        onClick={onToggle}
                        className="absolute -right-3 bottom-6 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 z-10"
                    >
                        <span className={`material-icons-round text-gray-600 text-sm transform transition-transform duration-200 ${
                            isExpanded ? 'rotate-0' : 'rotate-180'
                        }`}>
                            chevron_left
                        </span>
                    </button>
                )}
            </div>

            {/* Всплывающие подменю для свернутого состояния (работает на всех устройствах) */}
            {(!isExpanded || isMobile) && (
                <div className="relative floating-submenu">
                    {items.map((item, index) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isVisible = Boolean(hasChildren && clickedItem === item.id);
                        const topPosition = getItemTopPosition(index);

                        return (
                            <FloatingSubmenu
                                key={item.id}
                                item={item}
                                isVisible={isVisible}
                                onItemClick={handleChildItemClick}
                                activeItemId={activeItemId}
                                topPosition={topPosition}
                                onClose={handleCloseFloatingMenu}
                                isMobile={isMobile}
                            />
                        );
                    })}
                </div>
            )}

            {/* Overlay для мобильных устройств (только когда меню развернуто) */}
            {isMobile && isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={onToggle}
                />
            )}

            {/* Основной контент справа */}
            <main className={`flex-1 overflow-auto bg-white transition-all duration-300 ${
                isMobile && isExpanded ? 'ml-16' : ''
            }`}>
                {/* Контент будет рендериться здесь через Router */}
            </main>
        </div>
    );
};