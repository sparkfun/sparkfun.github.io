/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Image from '@theme/IdealImage';
import { Tags, TagList, type TagType, type User } from '@site/src/data/sfe_repos';
import { sortBy } from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import FavoriteIcon from '../FavoriteIcon';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

function TagItem({
    label,
    description,
    color,
}: {
    label: string;
    description: string;
    color: string;
}) {
    return (
        <li className={styles.tag} title={description}>
            <span className={styles.textLabel}>{label.toLowerCase()}</span>
            <span className={styles.colorLabel} style={{ backgroundColor: color }} />
        </li>
    );
}

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
    const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

    // Keep same order for all tags
    const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
        TagList.indexOf(tagObject.tag),
    );

    return (
        <>
            {tagObjectsSorted.map((tagObject, index) => {
                return <TagItem key={index} {...tagObject} />;
            })}
        </>
    );
}

function getCardImage(user: User): string {
    return (
        user.preview ??
        // TODO make it configurable
        `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
            user.homepage,
        )}/showcase`
    );
}

function ShowcaseCard({ user }: { user: User }) {
    const image = useBaseUrl(user.preview);

    return (
        <li key={user.title} className="card shadow--md">
            <div className={clsx('card__image', styles.showcaseCardImage)}>
                <Link href={user.homepage} >
                    <Image img={image} alt={user.title} />
                </Link>
            </div>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        <Link href={user.homepage} className={styles.showcaseCardLink}
                            data-tooltip-id="my-tip" data-tooltip-content={user.homepage}>
                            {user.name}
                        </Link>
                    </Heading>
                    {user.topics.includes('favorite') && (
                        <FavoriteIcon size="medium" style={{ marginRight: '0.25rem' }} />
                    )}
                    {user.url && (
                        <>
                            <Link
                                href={user.url}
                                className={clsx('header-github-link',
                                    'aria-label', 'GitHub repository'
                                )}
                                data-tooltip-id="my-tip" data-tooltip-content={user.url}
                            >
                                {/* <Translate id="showcase.card.sourceLink">GitHub</Translate> */}

                            </Link>
                            <Tooltip
                                id="my-tip"
                                place="top"        // top, bottom, left, right
                                variant="dark"     // dark, light, info, success, warning, error
                                delayShow={300}    // ms delay before showing
                            />   </>




                    )}
                </div>
                <p className={styles.showcaseCardBody}>{user.description}</p>
            </div>
            <ul className={clsx('card__footer', styles.cardFooter)}>
                <ShowcaseCardTag tags={user.topics} />
            </ul>
        </li >
    );
}

export default React.memo(ShowcaseCard);
