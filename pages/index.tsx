import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from './style.module.scss';
import axios from 'axios';
import WallpaperClockContainer from 'containers/WallpaperClockContainer';

interface IProps {
    geolocation: IPGeolocation;
}

const Home = ({ geoLocation }: InferGetServerSidePropsType<IProps>) => {
    return (
        <>
            <header>
                <h1 className={styles.hidden}>
                    Clock App
                </h1>
            </header>
            <main className={styles.main}>
                <WallpaperClockContainer geoLocation={geoLocation} />
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);

    return {
        props: {
            geoLocation: data,
        },
    };
};

export default Home
