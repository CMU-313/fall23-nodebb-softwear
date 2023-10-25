'use strict';

const db = require('../database');
const user = require('../user');

// For the functions below type signatures are:
// type is string 'endorse' or 'unendorse'
// pid is non-deterministic (could be array or a single object)
// uid is number for the user ID
module.exports = function (Posts) {
    async function toggleEndorse(type, pid, uid) {
        console.assert(typeof type === 'string');
        console.assert(typeof uid === 'number');

        if (parseInt(String(uid), 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = type === 'endorse';
        const postData = await Posts.getPostFields(pid, ['pid', 'endorsed']);

        await db[isEndorsing ? 'setAdd' : 'setRemove'](
            `pid:${pid}:users_endorsed`,
            'uid'
        );
        postData.endorsed = await db.setCount(`pid:${pid}:users_endorsed`);
        await Posts.setPostField(pid, 'endorsed', postData.endorsed);

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.endorse = async function (pid, uid) {
        console.assert(typeof uid === 'number');

        const isInstr = await user.isInstructor(uid);
        const isAdmin = await user.isAdministrator(uid);
        if (isInstr || isAdmin) {
            const result = await toggleEndorse('endorse', pid, uid);
            return result;
        }
        if (!isInstr && !isAdmin) {
            throw new Error('[[error:not-instructor]]');
        }
    };

    Posts.unendorse = async function (pid, uid) {
        console.assert(typeof uid === 'number');

        const isInstr = await user.isInstructor(uid);
        const isAdmin = await user.isAdministrator(uid);
        if (isInstr || isAdmin) {
            const result = await toggleEndorse('unendorse', pid, uid);
            return result;
        }
        if (!isInstr && !isAdmin) {
            throw new Error('[[error:not-instructor]]');
        }
    };

    Posts.hasEndorsed = async function (pid, uid) {
        console.assert(typeof uid === 'number');

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_endorsed`);
            return await db.isMemberOfSets(sets, 'uid');
        }

        return await db.isSetMember(`pid:${pid}:users_endorsed`, 'uid');
    };
};
