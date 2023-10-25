**The User Guide will outline how to see the changes made by the team and specifics on testing**

**How to View Changes**

When entering NodeBB, the homepage has four separate sections: Announcements, General Discussion, Comments & Feedback & Blogs. 
For each of these section, a user could create a post and reply to a different post. Both post and reply in high level are considered posts.

As an instructor, the user can click on the individual topics and see three dots on the right of each post and click either "Mark Post as Correct" or "Unmark Post".
When the instructor user clicks on "Mark Post as Correct", the indication (background color and endorse text) will appear that the post has been marked correct. 
When endorsing a reply, indications will both show on the thread view (that could be seen by clicking "n Reply xx minute(s)/hour(s)/day(s) ago") and the normal post reply view (a reply directly visible below post).
When unendorsing a reply, indications will be gone and turn into a normal post where no additional designs are applied from the original NodeBB post. 
Keep in mind no other type of user could endorse the post. More details could be seen below. 

As different types of users other than instructor, a user will not be able to access the "Mark Post as Correct" or "Unmark Post" functionality, since they won't be able to see the three dots at all. Thus eliminating confusion of whether they could endorse a function and give the privilege to only instructors who will only be able determine which post gets endorsed.

**Where to Find Testing File / How to Run Test**

The tests are in `test/posts.js` line 310-340, with the description being "endorsing".

In order to run the test locally, follow the following steps:

`$ redis-server`

`$ npm run test`

**Test Coverage/How Test Sufficiently Covers Change**

The tests covered testing the various cases in which instructors and non-instructors endorse/unendorse posts, and testing hasEndorsed on multiple posts. The tests are mostly focused on the backend and database result side, since frontend will be hard to test with automated testcases. The backend functions implemented functionalities of being able to endorse/unendorse posts and make sure multiple posts result are correct, and permission control on only the instructors can endorse a post. Therefore, the test cases have covered the functionalities that we added.
