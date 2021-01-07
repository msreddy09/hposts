export const POST_APP = {
    EMAIL: 'Email',
    POSTS: 'Posts',
    COMMENTS: 'Comments',
    FULLNAME: 'Full Name',
    COMPANY: 'Company Details',
    WEBSITE: 'Website',
    SEARCH_USER: 'Search for a User...',
    BACK_TO_POSTS: 'Back to Posts',
    USERNAME: 'Username',
    ALLUSERS: 'All Users',
    POSTS: 'Posts'
};

export const API_URLS = {
    POSTS: 'https://jsonplaceholder.typicode.com/posts',
    USERS: 'https://jsonplaceholder.typicode.com/users',
    USER: 'https://jsonplaceholder.typicode.com/users/{0}',
    POST: 'https://jsonplaceholder.typicode.com/posts/{0}',
    COMMENTS: 'https://jsonplaceholder.typicode.com/comments?postId={0}'
}

String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

