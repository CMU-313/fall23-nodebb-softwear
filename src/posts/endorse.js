'use strict';

const db = require('../database');
const user = require('../user');

// For the functions below type signatures are:
// type is string 'endorse' or 'unendorse'
// pid is number for the post ID
// uid is number for the user ID
module.exports = function (Posts) {
    async function toggleEndorse(type, pid, uid) {
        console.assert(typeof type === 'string');
        console.assert(typeof pid === 'number');
        console.assert(typeof uid === 'number');

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

        await db[isEndorsing ? 'setAdd' : 'setRemove'](
            `pid:${pid}:users_endorsed`,
            uid
        );
        postData.endorsements = await db.setCount(`pid:${pid}:users_endorsed`);
        await Posts.setPostField(pid, 'endorsements', postData.endorsements);

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.endorse = async function (pid, uid) {
        console.assert(typeof pid === 'number');
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
        console.assert(typeof pid === 'number');
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
        console.assert(typeof pid === 'number');
        console.assert(typeof uid === 'number');
        return await db.isSetMember(`pid:${pid}:users_endorsed`, uid);
    };
};
