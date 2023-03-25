import React, { ImgHTMLAttributes } from 'react';

type ImageProps = {
    webp: string;
    jpg: string;
};

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
    mobile: ImageProps;
    tablet: ImageProps;
    desktop: ImageProps;
}

const ResponsiveImage: React.FC<IProps> = ({ mobile, tablet, desktop, ...props }) => {
    return (
        <figure>
            <picture>
                <source srcSet={desktop.webp}
                        media={'(min-width: 966px)'}
                        type={'image/webp'}
                />
                <source srcSet={tablet.webp}
                        media={'(min-width: 767px)'}
                        type={'image/webp'}
                />
                <source srcSet={mobile.webp}
                        media={'(max-width: 568px)'}
                        type={'image/webp'}
                />

                <source srcSet={desktop.jpg}
                        media={'(min-width: 966px)'}
                />
                <source srcSet={tablet.jpg}
                        media={'(min-width: 767px)'}
                />
                <source srcSet={mobile.jpg}
                        media={'(max-width: 568px)'}
                />

                <img src={desktop.jpg}
                     {...props}
                />
            </picture>
        </figure>
    );
};

export default ResponsiveImage;
