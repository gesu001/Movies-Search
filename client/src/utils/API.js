// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


export const search = (query) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDYwMTlmZWM4ZGZiMzNhYWE5MmZlZDE5MGZiMTMwOSIsInN1YiI6IjY0ZDM5ODkyZDEwMGI2MDEzOTViMjg2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6sPUEszo3RdfwM41sLr-F1rSIH1_ArMfXbaOlzxEqo'
    }
  };
  
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
};

export const searchSingle = (query) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDYwMTlmZWM4ZGZiMzNhYWE5MmZlZDE5MGZiMTMwOSIsInN1YiI6IjY0ZDM5ODkyZDEwMGI2MDEzOTViMjg2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6sPUEszo3RdfwM41sLr-F1rSIH1_ArMfXbaOlzxEqo'
    }
  };
  
  return fetch(`https://api.themoviedb.org/3/movie/${query}?language=en-US`, options)

};

export const popularMovie = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDYwMTlmZWM4ZGZiMzNhYWE5MmZlZDE5MGZiMTMwOSIsInN1YiI6IjY0ZDM5ODkyZDEwMGI2MDEzOTViMjg2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a6sPUEszo3RdfwM41sLr-F1rSIH1_ArMfXbaOlzxEqo'
    }
  };
  
  return fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)

};