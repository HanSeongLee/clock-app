import React, { HTMLAttributes, useEffect, useState } from 'react';
import WallpaperClock from 'components/WallpaperClock';
import moment from 'moment-timezone';
import useInterval from 'use-interval';
import { getRandomQuote } from 'lib/apis/quotable';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    geoLocation: IPGeolocation;
}

const WallpaperClockContainer: React.FC<IProps> = ({ geoLocation, ...props }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [quoteLoading, setQuoteLoading] = useState<boolean>(false)
    const [wallpaperClockInfo, setWallpaperClockInfo] = useState<WallpaperClockInfo | null>(null);
    const [quote, setQuote] = useState<{ content: string, author: string }>({
        author: '',
        content: ''
    });

    const updateTime = async () => {
        const { timezone, regionName, countryCode } = geoLocation;
        const now = moment.tz(timezone);
        const currentHour = now.hours();
        const isDaytime = currentHour >= 6 && currentHour < 18;
        const greeting = currentHour >= 5 && currentHour < 12 ?
            'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

        setWallpaperClockInfo({
            isDaytime: isDaytime,
            time: moment().format('hh:mm'),
            greeting,
            location: `${regionName}, ${countryCode}`,
            timezoneName: {
                abbreviation: now.zoneAbbr(),
                fullName: timezone,
            },
            dayOfYear: now.dayOfYear(),
            dayOfWeek: now.day(),
            weekNumber: now.week(),
        });
    };

    const initialize = async () => {
        const { content, author } = await getRandomQuote();
        setQuote({
            content,
            author,
        });
        await updateTime();
    };

    const onToggleOpen = () => {
        setOpen(!open);
    };

    const onQuoteRefresh = async () => {
        setQuoteLoading(true);
        const { content, author } = await getRandomQuote();
        setQuote({
            content,
            author,
        });
        setQuoteLoading(false);
    }

    useInterval(updateTime, 1000, false);

    useEffect(() => {
        initialize();
    }, []);

    if (!wallpaperClockInfo) {
        return <></>;
    }

    return (
        <WallpaperClock open={open}
                        quoteLoading={quoteLoading}
                        wallpaperClockInfo={wallpaperClockInfo}
                        quote={quote}
                        onQuoteRefresh={onQuoteRefresh}
                        onMore={onToggleOpen}
                        {...props}
        />
    );
};

export default WallpaperClockContainer;
