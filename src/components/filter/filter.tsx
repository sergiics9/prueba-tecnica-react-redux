import { useState, useEffect } from 'react';
import { ApiRepo } from '../../services/api.repo'; // Importa tu servicio ApiRepo
import { Post } from '../../entities/post';

import './filter.scss';

// Define el tipo de las props
type FilterProps = {
  onFilterChange: (userId: string) => void; // Define el tipo de onFilterChange
};

export function Filter({ onFilterChange }: FilterProps) {
  // Define un estado para almacenar los userIds
  const [userIds, setUserIds] = useState<string[]>([]);
  // Define un estado para almacenar el userId seleccionado
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Define un useEffect para obtener los userIds de la API
  useEffect(() => {
    const apiRepo = new ApiRepo();

    const fetchUserIdsFromAPI = async () => {
      try {
        const posts: Post[] = await apiRepo.getPosts();
        // Obtener userIds únicos de los posts
        const uniqueUserIds = [
          ...new Set(posts.map((post: Post) => String(post.userId))),
        ];
        // Actualizar el estado de userIds
        setUserIds(uniqueUserIds);
      } catch (error) {
        console.error('Error fetching userIds:', error);
      }
    };

    // Llama a fetchUserIdsFromAPI para obtener los userIds de la API
    fetchUserIdsFromAPI();
  }, []);

  // Define un manejador para el cambio de selección
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    // Llama a onFilterChange con el userId seleccionado
    onFilterChange(event.target.value);
  };

  return (
    <div className="filter-container">
      <label className="filter-container__label" htmlFor="userIdSelect">
        Filter by User ID:
      </label>
      <select
        id="userIdSelect"
        value={selectedUserId}
        onChange={handleSelectChange}
        className="filter-container__select"
      >
        <option value="">All</option>
        {userIds.map((userId) => (
          <option
            key={userId}
            value={userId}
            className="filter-container__option"
          >
            {userId}
          </option>
        ))}
      </select>
    </div>
  );
}
