import React, { ElementType } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import ArrowDownIcon from '/public/icons/icon-arrow-down.svg'

interface IProps<T extends ElementType = 'button'> {
    variant?: 'primary';
    icon?: 'arrow';
    as?: T;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({
                                      variant, icon, as = 'button', className,
                                      children, ...props
                                  }) => {
    return (
        React.createElement(as, {
            className: cn(styles.button, {
                [styles.primary]: variant === 'primary',
            }, className),
            children: (
                <>
                    <span className={styles.content}>
                        {children}
                    </span>

                    {icon && (
                        <span className={styles.iconWrapper}>
                            {icon === 'arrow' && (<ArrowDownIcon />)}
                        </span>
                    )}
                </>
            ),
            ...props
        })
    );
};

Button.defaultProps = {
    variant: 'primary',
    as: 'button',
};

export default Button;
