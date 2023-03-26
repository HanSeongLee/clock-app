import React, { useEffect, useState } from 'react';
import WallpaperClock from 'components/WallpaperClock';
import moment from 'moment-timezone';
import { getIpGeolocation } from 'lib/apis/ip-geolocation';
import useInterval from 'use-interval';
import { getRandomQuote } from 'lib/apis/quotable';

const WallpaperClockContainer: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [geoLocation, setGeoLocation] = useState<IPGeolocation | null>(null);
    const [wallpaperClockInfo, setWallpaperClockInfo] = useState<WallpaperClockInfo | null>(null);
    const [quote, setQuote] = useState<{ content: string, author: string } | null>(null);

    const updateTime = async () => {
        if (!geoLocation) {
            return;
        }

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
        const geoLocation = await getIpGeolocation();
        const { content, author } = await getRandomQuote();
        setGeoLocation(geoLocation);
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
        setLoading(true);
        const { content, author } = await getRandomQuote();
        setQuote({
            content,
            author,
        });
        setLoading(false);
    }

    useInterval(updateTime, 1000, false);

    useEffect(() => {
        initialize();
    }, []);

    if (!geoLocation || !wallpaperClockInfo || !quote) {
        return <></>;
    }

    return (
        <WallpaperClock open={open}
                        loading={loading}
                        wallpaperClockInfo={wallpaperClockInfo}
                        quote={quote}
                        onQuoteRefresh={onQuoteRefresh}
                        onMore={onToggleOpen}
        />
    );
};

export default WallpaperClockContainer;
