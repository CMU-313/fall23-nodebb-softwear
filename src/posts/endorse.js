'use strict';

const db = require('../database');

module.exports = function (Posts) {
    async function toggleEndorse(type, pid, uid) {
        console.assert(typeof type === 'string');
        console.assert(typeof pid === 'number');
        console.assert(typeof uid === 'number');

        if (parseInt(String(uid), 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = type === 'endorse';

        const [postData, hasEndorsed] = await Promise.all([
            Posts.getPostFields(pid, ['pid']),
            Posts.hasEndorsed(pid, uid),
        ]);

        if (isEndorsing && hasEndorsed) {
            throw new Error('[[error:already-endorsed]]');
        }

        if (!isEndorsing && !hasEndorsed) {
            throw new Error('[[error:already-unendorsed]]');
        }

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
        return await toggleEndorse('endorse', pid, uid);
    };

    Posts.unendorse = async function (pid, uid) {
        console.assert(typeof pid === 'number');
        console.assert(typeof uid === 'number');
        return await toggleEndorse('unendorse', pid, uid);
    };

    Posts.hasEndorsed = async function (pid, uid) {
        console.assert(typeof pid === 'number');
        console.assert(typeof uid === 'number');
        return await db.isSetMember(`pid:${pid}:users_endorsed`, uid);
    };
};
