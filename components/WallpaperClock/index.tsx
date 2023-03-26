import React, { HTMLAttributes } from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import RefreshIcon from '/public/icons/icon-refresh.svg';
import ResponsiveImage from 'components/ResponsiveImage';
import Button from 'components/Button';
import SunIcon from '/public/icons/icon-sun.svg';
import MoonIcon from '/public/icons/icon-moon.svg';
import KeyValueTable from 'components/KeyValueTable';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    loading: boolean;
    quoteLoading: boolean;
    wallpaperClockInfo: WallpaperClockInfo;
    quote: {
        content: string;
        author: string;
    };
    onQuoteRefresh: () => void;
    onMore: () => void;
}

const WallpaperClock: React.FC<IProps> = ({
                                              open, loading, quoteLoading, wallpaperClockInfo, quote,
                                              onQuoteRefresh, onMore, className, ...props
                                          }) => {
    const {
        isDaytime, time, greeting, timezoneName,
        location, dayOfYear, dayOfWeek, weekNumber,
    } = wallpaperClockInfo;

    const timeName = isDaytime ? 'daytime' : 'nighttime';

    return (
        <section className={cn(styles.wallpaperClock, {
            [styles.loading]: loading,
            [styles.open]: open,
            [styles.nightTime]: !isDaytime,
        }, className)}
                 {...props}
        >
            <ResponsiveImage className={styles.wallpaper}
                             mobile={{
                                 webp: `/img/mobile/bg-image-${timeName}.webp`,
                                 jpg: `/img/mobile/bg-image-${timeName}.jpg`,
                             }}
                             tablet={{
                                 webp: `/img/tablet/bg-image-${timeName}.webp`,
                                 jpg: `/img/tablet/bg-image-${timeName}.jpg`,
                             }}
                             desktop={{
                                 webp: `/img/desktop/bg-image-${timeName}.webp`,
                                 jpg: `/img/desktop/bg-image-${timeName}.jpg`,
                             }}
                             alt={'A wallpaper image'}
            />
            <section className={styles.container}>
                <section className={styles.header}>
                    <div className={styles.quote}>
                        <blockquote>
                            {quote.content}
                        </blockquote>
                        <cite>
                            {quote.author}
                        </cite>
                    </div>
                    <button className={styles.refreshButton}
                            title={'Refresh'}
                            onClick={onQuoteRefresh}
                            disabled={quoteLoading}
                    >
                        <RefreshIcon />
                    </button>
                </section>

                <article className={styles.body}>
                    <header>
                        <h1 className={styles.greetingHeader}>
                            {isDaytime ? (
                                <>
                                    <SunIcon className={styles.icon} /> {greeting}
                                </>
                            ) : (
                                <>
                                    <MoonIcon className={styles.icon} /> {greeting}
                                </>
                            )}
                        </h1>
                        <div className={styles.timeContainer}>
                            <time className={styles.time}>
                                {time}
                            </time>
                            <span className={styles.timezone}>
                                {timezoneName.abbreviation}
                            </span>
                        </div>
                        <p className={styles.location}>
                            In {location}
                        </p>
                    </header>

                    <footer>
                        <Button className={styles.moreButton}
                                icon={'arrow'}
                                onClick={onMore}
                        >
                            {!open ? 'More' : 'Less'}
                        </Button>
                    </footer>
                </article>
            </section>
            <section className={styles.details}>
                <KeyValueTable className={styles.table}
                               data={{
                                   'Current Timezone': timezoneName.fullName,
                                   'Day of the Year': dayOfYear,
                                   'Day of the week': dayOfWeek,
                                   'Week Number': weekNumber,
                               }}
                />
            </section>
        </section>
    );
};

export default WallpaperClock;

