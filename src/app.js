import { http } from './http';
import { ui } from './ui';


const getPosts = () => {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
};

const submitPost = () => {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;

  const data = {
    title,
    body
  };

  http.post('http://localhost:3000/posts', data)
    .then((data) => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearInput();
      getPosts();
    })
    .catch(err => console.log(err));
};


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Losten for add post
ui.postSubmit.addEventListener('click', submitPost);