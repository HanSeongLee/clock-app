import type { NextPage } from 'next';
import styles from './style.module.scss';
import dynamic from 'next/dynamic';

const WallpaperClockContainer = dynamic(() => import('containers/WallpaperClockContainer'), {
    ssr: false,
});

const Home: NextPage = () => {
    return (
        <>
            <header>
                <h1 className={styles.hidden}>
                    Clock App
                </h1>
            </header>
            <main className={styles.main}>
                <WallpaperClockContainer />
            </main>
        </>
    );
};

export default Home
