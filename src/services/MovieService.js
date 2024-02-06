import SomeError from './SomeError'

export default class MovieService {
  _moviePopularUrl = 'https://api.themoviedb.org/3'
  _searchUrl = 'https://api.themoviedb.org/3/search/movie'

  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWU3NWY0MGY4MGVlZTZjOWJkMWQxMGYyNTNjZTU2YiIsInN1YiI6IjY1YjdhMGE4YTI4NGViMDEzMDBhNGU2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WdAJs01TDV6T1KL5uQ-sWRNFf0BZREXtGuHVjIPg5oo',
    },
    withCredentials: true,
  }
  
  async searchMovies(query) {
    try {
      const searchUrl = `${this._searchUrl}?language=en-US&page=1&query=${query}&api_key=${this._apiKey}&include_adult=false`
      const res = await fetch(searchUrl, this._options)
      if (!res.ok) {
        throw new SomeError('Ошибка ' + res.status)
      }
      const response = await res.json()

      return response.results
    } catch (error) {
      return error
    }
  }
}
