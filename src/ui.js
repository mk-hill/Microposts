class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.postsContainer = document.querySelector('.posts-container');
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
    
    // Get parent
    const container = this.postsContainer;
    const posts = this.posts;
    container.insertBefore(div, posts);

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
}

export const ui = new UI();
