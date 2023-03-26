type WallpaperClockInfo = {
    isDaytime: boolean;
    greeting: string;
    time: string;
    location: string;
    timezoneName: {
        abbreviation: string;
        fullName: string;
    };
    dayOfYear: number;
    dayOfWeek: number;
    weekNumber: number;
};
