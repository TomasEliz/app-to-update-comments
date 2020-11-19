let log = console.log;

const posts = [
  {
    name: "Beth",
    date: "10/18/2019",
    content: "I saw a bear today",
    likes: 14,
    comments: [
      {
        name: "Stan",
        date: "10/18/2019",
        content: "Pics or it didn't happen",
        likes: 10,
      },
      {
        name: "Helen",
        date: "10/20/2019",
        content: "omg u ok?",
        likes: 2,
      },
    ],
  },
  {
    name: "Olaf",
    date: "5/25/2020",
    content: "Summer of '69 were the best days of my life",
    likes: 5,
    comments: [
      {
        name: "Pablo",
        date: "5/25/2020",
        content: "Same here, lol",
        likes: 2,
      },
      {
        name: "Billy89",
        date: "5/25/2020",
        content: "meh, no way",
        likes: 1,
      },
    ],
  },
];

class Posts {
  constructor(arr) {
    this.postFeed = arr;
  }
  //************************ CREATE *************************** */
  // a post
  createPost({ name, content }) {
    if (content) {
      let date = new Date();
      const newPost = {
        name,
        date: date.toLocaleDateString(),
        content,
        likes: 0,
        comments: [],
      };
      this.postFeed.push(newPost);
    }
  }
  // a comment
  createComment = (data) => {
    let date = new Date();
    if (data.content) {
      let postID = data.postID;
      const newComment = {
        name: data.name,
        date: date.toLocaleDateString(),
        content: data.content,
        likes: 0,
        postID,
      };
      posts[postID - 1].comments.push(newComment);
    }
  };
  //************************** EDIT************************** */
  // a post
  editPost = (data) => {
    this.postFeed[data.postID - 1].content = data.changedContent;
  };
  // a comment
  editComment = (data) => {
    this.postFeed[data.postID - 1].comments[data.commentID - 1].content =
      data.changedComment;
  };
  //************************ ADD LIKE********************** */
  // to a post
  likePost = (data) => this.postFeed[data.postID - 1].likes++;
  // to a comment
  likeComment = (data) =>
    this.postFeed[data.postID - 1].comments[data.commentID - 1].likes++;
  //************************** REMOVE ************************ */
  // post
  removePost = (data) => this.postFeed.splice(data.postID - 1, 1);
  // a comment
  removeComment = (data) =>
    this.postFeed[data.postID - 1].comments.splice(data.commentID - 1, 1);
  //*************************** RENDER ************************ */
  renderPosts() {
    let template = "";
    template += `\n                   News Feed \n
            ************************\n\n`;
    if (this.postFeed.length === 0) {
      template += "There are currently no posts on your news feed";
    } else {
      this.postFeed.map((post) => {
        template += `${post.name}  ${post.date} 
        >>> ${post.content}
            likes: ${post.likes}\n`;
        if (post.comments.length > 0) {
          template += `            comments:
            ----------------------\n`;
          post.comments.map((comment) => {
            template += `            ${comment.date}   ${comment.name}:
                >>> ${comment.content}\n              likes: ${comment.likes}\n`;
          });
        }
        template += `            ----------------------\n********************************************************\n`;
      });
    }
    return template;
  }
}
//************** CREATE A NEW POSTS FEED*********** */
const feedUser1 = new Posts(posts);
//************************************************* */
// call stack
feedUser1.createPost({
  name: "Ahmed",
  content: "You guys, new salmon spread recipe coming tomorrow!",
});
feedUser1.createComment({ name: "Arnold", content: "Weeey!", postID: 3 });

//******** UNCOMMENT TO VIEW FUNCTION'S EFFECT********** */
// feedUser1.editPost({postID:3, changedContent:'You guys, new salmon spread recipe coming day after tomorrow!'})
// feedUser1.editComment({postID:2,commentID: 1,changedComment: 'Same here, <3'})
// feedUser1.likePost({postID:3})
// feedUser1.likeComment({postID:3,commentID:1})
// feedUser1.removePost({postID:1})
// feedUser1.removeComment({postID:2,commentID:1})

// display
log(feedUser1.renderPosts());
