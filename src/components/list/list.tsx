import { useState, useEffect } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { Card } from '../card/card';
import { Header } from '../header/header';
import { Filter } from '../filter/filter';
import { Post } from '../../entities/post';
import ReactPaginate from 'react-paginate';
import './list.scss';
import { Footer } from '../footer/footer';

export default function List() {
  const { loadPosts, posts } = usePosts();
  // Define un estado para almacenar los posts filtrados
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  // Define un estado para almacenar si se aplicó un filtro
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  // Define un estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Define un useEffect para cargar los posts
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Define un manejador para aplicar un filtro
  const applyFilter = (userId: string) => {
    // Si el userId no es un número, muestra todos los posts
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      setFilteredPosts(posts);
      setFilterApplied(false);
      // Si el userId es un número, filtra los posts por userId y actualiza el estado de los posts filtrados y si se aplicó un filtro
    } else {
      const filtered = posts.filter((post) => post.userId === userIdNumber);
      setFilteredPosts(filtered);
      setFilterApplied(true);
    }
    // Establece la página actual en 0
    setCurrentPage(0);
  };

  // Define la cantidad de posts por página y la cantidad de páginas a mostrar en la paginación
  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(
    (filterApplied ? filteredPosts.length : posts.length) / PER_PAGE,
  ); // Ajuste aquí

  // Define un manejador para cambiar de página
  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <Header />
      <Filter onFilterChange={applyFilter} />
      <ul className="posts-list">
        {/* Muestra los posts en la página actual y aplica un filtro si es necesario (filterApplied) y muestra los posts filtrados (filteredPosts) 
        o todos los posts (posts) si no se aplica un filtro y los muestra en la página actual (offset) y la cantidad de posts por página (PER_PAGE) 
        y muestra un componente Card por cada post con la información del post */}
        {(filterApplied ? filteredPosts : posts)
          .slice(offset, offset + PER_PAGE)
          .map((post) => (
            <Card key={post.id} post={post} />
          ))}
      </ul>
      {/* Libreria para la paginación */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
      <Footer></Footer>
    </>
  );
}
