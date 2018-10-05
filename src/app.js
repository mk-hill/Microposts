import { testObj, moreTests } from './test';

let test = () => console.log('test2');
test();
const props = testObj.func();

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  const data = await response.json();
  return data;
}

getPosts().then((posts) => {
  console.log(posts);
  alert(`${props} and ${moreTests}`);
});
