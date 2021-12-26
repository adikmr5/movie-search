import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Alert,
  Container,
  Row,
  Form,
  Col,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MovieList from "./MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AddFavourites from "./AddFavourites";
import RemoveFavourites from "./RemoveFavourites";

import { database } from "../firebase";

import { getDatabase, onValue, ref, set } from "firebase/database";

export default function HomePage() {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Logout");
    }
  }

  const [movies, setMovies] = useState([]);
  const [searchValue, setSerachValue] = useState("");
  const [favourites, setfavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?apikey=bc6024cf&s=${searchValue}`;
    const response = await fetch(url);

    const responseJSON = await response.json();
    if (responseJSON.Search) setMovies(responseJSON.Search);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const t = ref(database, "users/" + currentUser.uid + "/private");
    onValue(t, (snapshot) => {
      const data = snapshot.val();
      if (data) setfavourites(data);
    });
  }, []);

  function writeUserData(userId, favouritesData) {
    set(ref(database, "users/" + userId), {
      private: favouritesData,
    });
  }
  const addFavouriteMovie = (movie) => {
    if (favourites.indexOf(movie) === -1) {
      const newFavouriteList = [...favourites, movie];
      setfavourites(newFavouriteList);
      writeUserData(currentUser.uid, newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setfavourites(newFavouriteList);
    writeUserData(currentUser.uid, newFavouriteList);
  };

  return (
    <Container fluid className="movie-app">
      <Row>
        <Col md={{ offset: 10 }}>
          <h6>Signed in as {currentUser.email}</h6>
        </Col>
        <Col>
          <Button variant="link" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        <Form className=" mb-4" onSubmit={(e) => e.preventDefault()}>
          <Form.Group id="search">
            <Form.Label>
              <h1> Search for Movies</h1>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Type to search"
              value={searchValue}
              onChange={(e) => setSerachValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        ></MovieList>
      </Row>
      <Row>
        <h3 className="mt-4 mb-4">Favourites</h3>
      </Row>
      <Row className="row ml-4 mr-4">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        ></MovieList>
      </Row>
    </Container>
  );
}
