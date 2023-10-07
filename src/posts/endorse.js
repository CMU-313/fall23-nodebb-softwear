'use strict';

const db = require('../database');
const user = require('../user');
const plugins = require('../plugins');

// For the functions below type signatures are:
// type is string 'endorse' or 'unendorse'
// pid is number for the post ID
// uid is number for the user ID
module.exports = function (Posts) {
    async function toggleEndorse(type, pid, uid) {
        // alerts.error('Called toggle endorse');
        console.assert(typeof type === 'string');
        // console.assert(typeof pid === 'string');
        // console.log('Pid is of type', typeof pid);
        console.assert(typeof uid === 'number');
        // console.log('Uid is of type', typeof uid);

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
        // if (isEndorsing) {
        //     await db.sortedSetAdd(`uid:${uid}:bookmarks`, Date.now(), pid);
        // } else {
        //     await db.sortedSetRemove(`uid:${uid}:bookmarks`, pid);
        // }

        await db[isEndorsing ? 'setAdd' : 'setRemove'](
            `pid:${pid}:users_endorsed`,
            uid
        );
        postData.endorsed = await db.setCount(`pid:${pid}:users_endorsed`);
        await Posts.setPostField(pid, 'endorsed', postData.endorsed);

        plugins.hooks.fire(`action:post.${type}`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: hasEndorsed ? 'endorsed' : 'unendorsed',
        });

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.endorse = async function (pid, uid) {
        console.log('endorse', pid);
        // console.assert(typeof pid === 'string');
        console.assert(typeof uid === 'number');

        const isInstr = await user.isInstructor(uid);
        const isAdmin = await user.isAdministrator(uid);
        if (isInstr || isAdmin) {
            return await toggleEndorse('endorse', pid, uid);
        }
        if (!isInstr && !isAdmin) {
            throw new Error('[[error:not-instructor]]');
        }
    };

    Posts.unendorse = async function (pid, uid) {
        console.log('unendorse function called', pid);
        console.assert(typeof uid === 'number');

        const isInstr = await user.isInstructor(uid);
        const isAdmin = await user.isAdministrator(uid);
        if (isInstr || isAdmin) {
            return await toggleEndorse('unendorse', pid, uid);
        }
        if (!isInstr && !isAdmin) {
            throw new Error('[[error:not-instructor]]');
        }
    };

    Posts.hasEndorsed = async function (pid, uid) {
        console.log('Called has endorsed');
        console.log('pid is', pid);
        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_endorsed`);
            return await db.isMemberOfSets(sets, uid);
        }
        const result = await db.isSetMember(`pid:${pid}:users_endorsed`, uid);
        console.log('HasEndorsed result is', result);
        return result;
    };
};
