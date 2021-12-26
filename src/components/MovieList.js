import React from "react";
import { Col, Container, Image, Overlay } from "react-bootstrap";
import AddFavourites from "./AddFavourites";

export default function MovieList(props) {
  const FavouriteComponent = props.favouriteComponent;
  return (
    <Col className="d-flex p-3" md="auto">
      {props.movies.map((movie, index) => (
        <Container className="image-container ">
          <Image
            src={movie.Poster}
            alt="movie"
            className="height-row"
            onClick={() =>
              window.open("https://www.imdb.com/title/" + movie.imdbID)
            }
          ></Image>
          <div
            className="overlay d-flex align-items-center justify-content-center"
            onClick={() => props.handleFavouritesClick(movie)}
          >
            <FavouriteComponent />
          </div>
        </Container>
      ))}
    </Col>
  );
}
