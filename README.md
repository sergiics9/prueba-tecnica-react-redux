# Prueba técnica Cleverpy

Para lanzar el proyecto:

```bash
npm i
npm run dev
```

Para lanzar los tests:

```bash
npm run test
```

El proyecto ha sido realizado con React con la arquitectura Redux utilizando el store, slice, thunks y hooks para el manejo del estado de los posts y las respuestas de la API.

Los datos de cada tarjeta provienen de la API solicitada mediante Axios.

El login y register estan implementados mediante estados locales para hacer uso del useState en la aplicacion y tambien del localStorage, el usuario loggeado se almacena en el estado del custom hook.

El filtro ha sido implementado en un componente unico tambien haciendo uso del useState para almacenar los userId y otro para el userId seleccionado.

La paginacion ha sido implementada gracias a la libreria react-paginate.

Dentro del card tenemos dos estado uno para el editar el titulo y otro el body para la funcionalidad de editar el post, y el deletePost me lo he llevado al hook para tener ejemplo de las dos maneras posibles de hacer las cosas.
