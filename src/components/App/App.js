import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'

import MovieService from '../../services/MovieService'
import MovieCard from '../MovieCard/MovieCard'

import './App.css'

const { Content } = Layout

const App = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const searchMovies = async (query) => {
      const movieService = new MovieService()
      try {
        const results = await movieService.searchMovies(query)

        const updatedMovies = results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          overview: cutOffDescription(movie.overview),
          releaseDate: movie.release_date,
        }))

        setMovies(updatedMovies)
        setLoading(false)
        setError(null)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    searchMovies('return') 
  }, [])

  const cutOffDescription = (text) => {
    text = text.trim()
    let words = text.split(' ')
    return words.length > 30 ? words.slice(0, 30).join(' ') + '...' : text
  }

  return (
    <Layout className="layout">
      <Content className="content-all-movies movie-card-panel">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {error ? (
              <h1 className="no-data">Error loading data</h1>
            ) : movies.length === 0 ? (
              <h1 className="no-data">No Data Found</h1>
            ) : (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </>
        )}
      </Content>
    </Layout>
  )
}

export default App
