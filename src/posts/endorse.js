'use strict';

// import db from '../database';
const db = require('../database');

// interface PostHandlerType {
//     endorse: (pid: number, uid: number) => Promise<ToggleEndorseResult>;
//     unendorse: (pid: number, uid: number) => Promise<ToggleEndorseResult>;
//     getPostFields: (pid: number, field: string[]) => Promise<PostData>;
//     hasEndorsed: (pid: NumberOrNumberArr) => Promise<BoolOrBoolArr>;
//     setPostField: (pid: number, field: string, data: NumberOrNumberArr) => Promise<void>;
// }

// interface PostData {
//     pid: number;
//     endorse?: NumberOrNumberArr;
// }

// interface ToggleEndorseResult {
//     post: PostData;
//     isEndorsed: boolean;
// }

// type BoolOrBoolArr = boolean | boolean[]
// type NumberOrNumberArr = number | number[]

// module.exports = function (Posts: PostHandlerType) {
module.exports = function (Posts) {
    // async function toggleEndorse(type: string, pid: number, uid: number):Promise<ToggleEndorseResult> {
    async function toggleEndorse(type, pid, uid) {
        if (parseInt(String(uid), 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = type === 'endorse';

        // eslint-disable-next-line no-unused-vars
        const [postData, hasEndorsed] = await Promise.all([
            Posts.getPostFields(pid, ['pid']),
            Posts.hasEndorsed(pid, uid),
        ]);

        // isEndorsing and hasEndorsed are causing issues, need to fix later
        // if (isEndorsing && hasEndorsed) {
        //     throw new Error('[[error:already-endorsed]]');
        // }

        // if (!isEndorsing && !hasEndorsed) {
        //     throw new Error('[[error:already-unendorsed]]');
        // }

        await db[isEndorsing ? 'setAdd' : 'setRemove'](`pid:${pid}:users_endorsed`, uid);
        postData.endorsements = await db.setCount(`pid:${pid}:users_endorsed`);
        await Posts.setPostField(pid, 'endorsements', postData.endorsements);

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    // Posts.endorse = async function (pid: number, uid: number) {
    Posts.endorse = async function (pid, uid) {
        return await toggleEndorse('endorse', pid, uid);
    };

    // Posts.unendorse = async function (pid: number, uid: number) {
    Posts.unendorse = async function (pid, uid) {
        return await toggleEndorse('unendorse', pid, uid);
    };

    // Posts.hasEndorsed = async function (pid): Promise<BoolOrBoolArr> {
    Posts.hasEndorsed = async function (pid, uid) {
        return await db.isSetMember(`pid:${pid}:users_endorsed`, uid);
    };
};
