import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppMenu, StyledMenu } from '../Menu';
import { MenuItem } from '../../types/menu';

const menuItems: MenuItem[] = [
    {
        id: 'cars',
        label: 'Cars',
        icon: 'cars',
    },
    {
        id: 'toys',
        label: 'Toys',
        icon: 'toys',
    },
    {
        id: 'castle',
        label: 'Castle',
        icon: 'castle',
    },
    {
        id: 'time',
        label: 'Time',
        icon: 'time',
    },
    {
        id: 'eco',
        label: 'Eco',
        icon: 'eco',
    },
    {
        id: 'sweets',
        label: 'Sweets',
        icon: 'sweets',
        children: [
            { id: 'first-sweets', label: 'First sweets'},
            { id: 'second-sweets', label: 'Second sweets'},
            { id: 'third-sweets', label: 'Third sweets' }
        ]
    },
    {
        id: 'payment',
        label: 'Payment',
        icon: 'payment'
    }
];

// Компоненты страниц в стиле Material Design

const SomePage: React.FC<{title?: string; }> = ({title='Page'}) => (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-600">Lorem Ipsum is simply ...</p>
            </div>
        </div>
    </div>
);


export const RouterMenu: React.FC = () => {
    return (
        <Router>
            <div className="flex min-h-screen bg-gray-50">
                {/* Меню слева */}
                <AppMenu items={menuItems}>
                    {(menuProps) => <StyledMenu items={menuProps.items} />}
                </AppMenu>
                {/* Контент справа - занимает все оставшееся пространство */}
                <main className="flex-1 overflow-auto bg-white">
                    <Routes>
                        <Route path="/" element={<SomePage title={'Home Page'} />} />
                        {menuItems.map((item)=>(
                            item.children?
                                item.children.map((child)=>(
                                    <Route path={"/"+child.id} element={<SomePage title={child.label} />} />
                                ))
                                :
                                <Route path={"/"+item.id} element={<SomePage title={item.label} />} />
                        ))}
                    </Routes>
                </main>
            </div>
        </Router>
    );
};