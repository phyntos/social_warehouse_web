import React from 'react';
import './Logo.scss';

const Logo = ({
    withDescription,
    className,
    size = 'normal',
}: {
    withDescription?: boolean;
    className?: string;
    size?: 'normal' | 'mini';
}) => {
    const classNames = ['social-logo-container'];
    if (className) classNames.push(className);
    if (size === 'mini') classNames.push('social-logo-mini');

    return (
        <div className={classNames.join(' ')}>
            <div className='social-logo'>СЗПТ</div>
            {withDescription && (
                <div className='social-logo-desc'>
                    Система учета движения социально значимых потребительских товаров
                </div>
            )}
        </div>
    );
};

export default Logo;
