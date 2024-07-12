import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export class ApiRepo {
  // Define un método para obtener los posts
  getPosts = (url: string = apiUrl) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching posts', error);
        throw error;
      });
  };

  // Define un método para obtener un post por id
  deletePost = (id: number) => {
    return axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error deleting post', error);
        throw error;
      });
  };
}
