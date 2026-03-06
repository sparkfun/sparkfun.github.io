import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link'
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    href: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Everything',
        href: '/sparkfun',
        Svg: require('@site/static/img/topic_everything.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'GNSS',
        href: '/sparkfun?tags=gnss',
        Svg: require('@site/static/img/topic_gnss.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'qwiic',
        href: '/sparkfun?tags=qwiic',
        Svg: require('@site/static/img/topic_qwiic.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Distance Sensors',
        href: '/sparkfun?tags=distance',
        Svg: require('@site/static/img/topic_distance.svg').default,
        description: (
            <>
            </>
        ),
    }, {
        title: 'Environmental sensors',
        href: '/sparkfun?tags=environmental',
        Svg: require('@site/static/img/topic_eco.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'All Sensors',
        href: '/sparkfun?tags=sensor',
        Svg: require('@site/static/img/topic_sensors.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Development Boards',
        href: '/sparkfun?tags=dev-board',
        Svg: require('@site/static/img/topic_dev-board.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Light Sensors',
        href: '/sparkfun?tags=light',
        Svg: require('@site/static/img/topic_light.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'RFID',
        href: '/sparkfun?tags=rfid',
        Svg: require('@site/static/img/topic_rfid.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Motion Sensors',
        href: '/sparkfun?tags=motion',
        Svg: require('@site/static/img/topic_motion.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Displays',
        href: '/sparkfun?tags=display',
        Svg: require('@site/static/img/topic_display.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Audio',
        href: '/sparkfun?tags=audio',
        Svg: require('@site/static/img/topic_audio.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Inputs',
        href: '/sparkfun?tags=input',
        Svg: require('@site/static/img/topic_input.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'IoT',
        href: '/sparkfun?tags=iot',
        Svg: require('@site/static/img/topic_iot.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Data Logging',
        href: '/sparkfun?tags=datalogging',
        Svg: require('@site/static/img/topic_datalogging.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Bluetooth',
        href: '/sparkfun?tags=bluetooth',
        Svg: require('@site/static/img/topic_bluetooth.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Wifi',
        href: '/sparkfun?tags=wifi',
        Svg: require('@site/static/img/topic_wifi.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Network',
        href: '/sparkfun?tags=network',
        Svg: require('@site/static/img/topic_network.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Vision',
        href: '/sparkfun?tags=vision',
        Svg: require('@site/static/img/topic_vision.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Power',
        href: '/sparkfun?tags=power',
        Svg: require('@site/static/img/topic_power.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Accessory Boards',
        href: '/sparkfun?tags=accessory',
        Svg: require('@site/static/img/topic_accessory.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Time',
        href: '/sparkfun?tags=time',
        Svg: require('@site/static/img/topic_time.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Software',
        href: '/sparkfun?tags=software',
        Svg: require('@site/static/img/topic_software.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Python',
        href: '/sparkfun?tags=python',
        Svg: require('@site/static/img/topic_python.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Teensy',
        href: '/sparkfun?tags=teensy',
        Svg: require('@site/static/img/topic_teensy.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Raspberry Pi',
        href: '/sparkfun?tags=raspberry-pi',
        Svg: require('@site/static/img/topic_rpi.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'ESP32',
        href: '/sparkfun?tags=esp32',
        Svg: require('@site/static/img/topic_esp32.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'Arduino',
        href: '/sparkfun?tags=arduino',
        Svg: require('@site/static/img/topic_arduino.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'LoRa',
        href: '/sparkfun?tags=lora',
        Svg: require('@site/static/img/topic_lora.svg').default,
        description: (
            <>
            </>
        ),
    },
    {
        title: 'XBee',
        href: '/sparkfun?tags=xbee',
        Svg: require('@site/static/img/topic_xbee.svg').default,
        description: (
            <>
            </>
        ),
    },



];

function Feature({ title, href, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--2')}>
            <Link href={href} className={styles.homepageFeatureLink}>
                <div className="text--center">
                    <Svg className={styles.featureSvg} role="img" />
                </div>
            </Link>
            <div className="text--center padding-horiz--md">
                <Link href={href} className={styles.homepageFeatureLink}>
                    <Heading as="h3">{title}</Heading>
                </Link>
                <p>{description}</p>
            </div>

        </div >
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
