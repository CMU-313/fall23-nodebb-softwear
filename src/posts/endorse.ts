// Referenced @kaitlyncliu’s TypeScript translation from P1: https://github.com/CMU-313/NodeBB/pull/144
// The next line calls a function in a module that has not been updated to TS yet
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
import db from '../database';
// import plugins from '../plugins';

interface PostHandlerType {
    endorse: (pid: number, uid: number) => Promise<ToggleEndorseResult>;
    unendorse: (pid: number, uid: number) => Promise<ToggleEndorseResult>;
    getPostFields: (pid: number, field: string[]) => Promise<PostData>;
    hasEndorsed: (pid: NumberOrNumberArr) => Promise<BoolOrBoolArr>;
    setPostField: (pid: number, field: string, data: NumberOrNumberArr) => Promise<void>;
}

interface PostData {
    pid: number;
    // uid: number;
    endorse?: NumberOrNumberArr;
}

interface ToggleEndorseResult {
    post: PostData;
    isEndorsed: boolean;
}

type BoolOrBoolArr = boolean | boolean[]
type NumberOrNumberArr = number | number[]

export = function (Posts: PostHandlerType) {
    async function toggleEndorse(type: string, pid: number, uid: number):Promise<ToggleEndorseResult> {
        if (parseInt(String(uid), 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = type === 'endorse';

        const [postData, hasEndorsed] = await Promise.all([
            Posts.getPostFields(pid, ['pid']),
            Posts.hasEndorsed(pid),
        ]);

        if (isEndorsing && hasEndorsed) {
            throw new Error('[[error:already-endorsed]]');
        }

        if (!isEndorsing && !hasEndorsed) {
            throw new Error('[[error:already-unendorsed]]');
        }

        // if (isEndorsing) {
        //     // The next line calls a function in a module that has not been updated to TS yet
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        //     await db.sortedSetAdd(`uid:${uid}:endorse`, Date.now(), pid);
        // } else {
        //     // The next line calls a function in a module that has not been updated to TS yet
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        //     await db.sortedSetRemove(`uid:${uid}:endorse`, pid);
        // }
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await db[isEndorsing ? 'setAdd' : 'setRemove'](`pid:${pid}:endorsements`);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        postData.endorse = await db.setCount(`pid:${pid}:endorsements`);// eslint-disable-line @typescript-eslint/no-unsafe-assignment
        await Posts.setPostField(pid, 'endorse', postData.endorse);

        // await plugins.hooks.fire(`action:post.${type}`, {
        //     pid: pid,
        //     uid: uid,
        //     owner: postData.uid,
        //     current: hasBookmarked ? 'bookmarked' : 'unbookmarked',
        // });

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.endorse = async function (pid: number, uid: number) {
        return await toggleEndorse('endorse', pid, uid);
    };

    Posts.unendorse = async function (pid: number, uid: number) {
        return await toggleEndorse('unendorse', pid, uid);
    };

    Posts.hasEndorsed = async function (pid): Promise<BoolOrBoolArr> {
        // if (parseInt(String(uid), 10) <= 0) {
        //     return Array.isArray(pid) ? pid.map(() => false) : false;
        // }

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:endorsements`);
            // The next line calls a function in a module that has not been updated to TS yet
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            // return await db.isMemberOfSets(sets, uid); // eslint-disable-line @typescript-eslint/no-unsafe-return
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            return await db.isMemberOfSets(sets); // eslint-disable-line @typescript-eslint/no-unsafe-return
        }
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return await db.isSetMember(`pid:${pid}:endorsements`); // eslint-disable-line @typescript-eslint/no-unsafe-return
    };
}
