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
  const id = ui.idInput.value;
  const data = {
    title,
    body
  };
  // Validate input existence
  if (!title || !body) {
    ui.showAlert('Please enter post title and body', 'alert alert-danger');
  } else {
    // Hidden id field normally empty. If a value was loaded into it
    // then we're updating an existing post, not adding a new one.
    if (!id) {
      // Create new post
      http.post('http://localhost:3000/posts', data)
        .then((data) => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearInput();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update existing post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
};

const deletePost = (e) => {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault;
};

// Enable edit state
const enableEdit = (e) => {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body,
    };
    ui.populateForm(data);
  }
  e.preventDefault();
};

const cancelEdit = (e) => {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
};


// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
ui.postSubmit.addEventListener('click', submitPost);

// Delete/edit/cancel buttons dont exist on dom load, delegating events
// Post deletion listener
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Listen for cancel
ui.cardForm.addEventListener('click', cancelEdit);
