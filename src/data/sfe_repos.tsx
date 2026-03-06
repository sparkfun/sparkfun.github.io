/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import { translate } from '@docusaurus/Translate';
import { sortBy } from '@site/src/utils/jsUtils';

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE
 *
 * Please don't submit a PR yourself: use the Github Discussion instead:
 * https://github.com/facebook/docusaurus/discussions/7826
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the project
 * - Use relevant tags to categorize the site (read the tag descriptions on the
 *   https://docusaurus.io/showcase page and some further clarifications below)
 * - Add a local image preview (decent screenshot of the Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If a website is open-source, add a source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/7620
 */


// Add sites to this list
// prettier-ignore
const Users: User[] = require('./sfe_data.json')

export type User = {
    description: string;
    homepage: string;
    name: string;
    url: string | null;
    preview: string | null;
    updatedAt: string;
    topics: TagType[];
};



// import our tag json def -- make types and a map from it 
import sfTagsData from './sfe_tags.json';

// Define types based on the JSON data. 
//
// Tag "type" is the keys of the JSON object, and "Tag" is the value type of each key.
export type TagType = keyof typeof sfTagsData;

// define data type for the "Tag values" - what is contained in the content of each tag 
// normally name, desc, color
export type Tag = (typeof sfTagsData)[TagType];

// list of our tags with the above type defs. This fits with the original
// showcase implementation structure.
export const Tags: { [type in TagType]: Tag } = sfTagsData;

// const sfTagsMap = new Map<sfTagKey, sfTag>(
//     Object.entries(sfTagsData) as [sfTagKey, sfTag][]
// );

export const TagList = Object.keys(sfTagsData) as TagType[];

function sortUsers() {
    // console.log("SFE TAGS:");
    // console.log(Tags);
    // console.log("TESTING:");

    // // console.log("TESTING1:");
    // // console.log(sfTags);

    // console.log("TESTING2:");
    // console.log(TagList);

    // console.log("TESTING3:");
    // console.log(Tags[TagList[1]]);

    let result = Users;
    // Sort by site name
    result = sortBy(result, (user) => user.name.toLowerCase());
    // Sort by favorite tag, favorites first
    result = sortBy(result, (user) => !user.topics.includes('favorite'));
    return result;
}

export const sortedUsers = sortUsers();
