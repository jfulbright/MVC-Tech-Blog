let deletePost;

deletePost = document.querySelectorAll('.post-list');

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
      alert('Failed to create an Item');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log('function called');
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

document.querySelector('.post-form').addEventListener('submit', newFormHandler);


// Iterate through all Post instances and add a listener:
for (var i = 0; i < deletePost.length; i++) {
  deletePost[i].addEventListener('click', delButtonHandler);
}
