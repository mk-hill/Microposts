class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.postsContainer = document.querySelector('.posts-container');
    this.cardForm = document.querySelector('.card-form');
    this.formEnd = document.querySelector('.form-end');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach((post) => {
      // Using HTML5 custom attribute to store post IDs
      // in order to identify correct post while editing
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });
    this.posts.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // Create div with classes and content
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    
    this.postsContainer.insertBefore(div, this.posts);

    setTimeout(() => {
      this.clearAlert();
    }, 2500);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearInput() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  clearInputId() {
    this.idInput.value = '';
  }

  changeFormState(state) {
    if (state === 'edit') {
      // Change add button to update button
      this.postSubmit.textContent = 'Update post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel update'));

      // Insert cancel button into cardForm before formEnd
      this.cardForm.insertBefore(button, this.formEnd);

    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearInputId();
      this.clearInput();
    }
  }

  // Populate input fields for edit state
  populateForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.changeFormState('edit');
  }
}

export const ui = new UI();
