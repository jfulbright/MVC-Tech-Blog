let deletePost;
let deleteComment;
let postComment;

deletePost = document.querySelectorAll('.post-list');
deleteComment = document.querySelectorAll('.comment-list');
postComment = document.querySelectorAll('.comment-form');

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post_title').value.trim();
  const body = document.querySelector('#post_body').value.trim();
  const user_id = document.querySelector('#user_id').value.trim();

  if (title) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_title: title,
        post_body: body,
        user_id: user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create a Post');
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();
  const body = event.target.querySelector('#comment_body').value.trim();
  const comment_post_id = event.target.getAttribute('data-id');

  if (body) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment_body: body,
        post_id: comment_post_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create an Item');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete item');
    }
  }
};

const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete item');
    }
  }
};

// Iterate through all Post instances and add a listener:
for (var i = 0; i < deletePost.length; i++) {
  deletePost[i].addEventListener('click', delButtonHandler);
}

// Iterate through all Comments instances and add a listener:
for (var i = 0; i < deleteComment.length; i++) {
  deleteComment[i].addEventListener('click', delCommentHandler);
}

// Iterate through all New Comment Form instances and add a listener:
for (var i = 0; i < postComment.length; i++) {
  postComment[i].addEventListener('submit', newCommentHandler);
}

// don't call event listener if not logged in
// document.querySelector('.post-form').addEventListener('submit', newFormHandler);

if (window.location.contains !== '/login') {
  document
    .querySelector('.post-form')
    .addEventListener('submit', newFormHandler);
}
