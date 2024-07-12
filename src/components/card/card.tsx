import { useState } from 'react';
import Swal from 'sweetalert2';
import { Post } from '../../entities/post';
import './card.scss';
import { usePosts } from '../../hooks/use.posts';

type Props = {
  post: Post;
};

export function Card({ post }: Props) {
  const { deletePost } = usePosts();
  // Estado para el título y el cuerpo del post editado
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedbody] = useState(post.body);

  const handleDelete = () => {
    Swal.fire({
      customClass: {
        container: 'custom-swal-font',
      },
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'orange',
      width: '19rem',
      showCancelButton: true,
      confirmButtonColor: 'limegreen',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(post.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been deleted.',
          icon: 'success',
          background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
          color: 'white',
          iconColor: 'limegreen',
          width: '19rem',
          customClass: {
            container: 'custom-swal-font',
          },
        });
      }
    });
  };

  const handleEdit = () => {
    Swal.fire({
      customClass: {
        container: 'custom-swal-font',
        confirmButton: 'custom-swal-button',
      },
      title: 'Edit Post',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      html:
        `<input data-testid="title-input" id="swal-input1" class="swal2-input" value="${editedTitle}">` +
        `<textarea data-testid="body-input" id="swal-input2" class="swal2-textarea">${editedBody}</textarea>`,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const titleInput =
          document.querySelector<HTMLInputElement>('#swal-input1');
        const bodyInput =
          document.querySelector<HTMLTextAreaElement>('#swal-input2');

        // Si el título y el cuerpo del post no están vacíos, devolvemos el valor de ambos
        if (titleInput && bodyInput) {
          return [titleInput.value, bodyInput.value];
        } else {
          return ['', ''];
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Cambiamos el estado del título y el cuerpo del post por el
        setEditedTitle(result.value[0] || editedTitle);
        setEditedbody(result.value[1] || editedBody);
      }
    });
  };

  return (
    <>
      <li className="card">
        <div className="card__container-delete-modify-buttons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            width={24}
            height={24}
            role="button"
            onClick={handleDelete}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
            {/* Delete SVG Path */}
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            width={24}
            height={24}
            role="button"
            onClick={handleEdit}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487 18.55 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
            {/* Edit SVG Path */}
          </svg>
        </div>

        <div className="card__user-icon-user-id">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-user"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />

            {/* User SVG Path */}
          </svg>
          <h2>{post.userId}</h2>
        </div>

        <h3 className="card__title">{editedTitle}</h3>

        <p className="card__body">{editedBody}</p>
      </li>
    </>
  );
}
