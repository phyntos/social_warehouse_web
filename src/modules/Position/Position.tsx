import React from 'react';
import PositionShop from './PositionShop/PositionShop';
import PositionWarehouse from './PositionWarehouse/PositionWarehouse';

const Position = ({ type }: { type: 'Shop' | 'Warehouse' }) => {
    if (type === 'Shop') return <PositionShop />;
    if (type === 'Warehouse') return <PositionWarehouse />;

    return null;
};

export default Position;
