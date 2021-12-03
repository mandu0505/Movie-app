import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Home.module.css";

function Detail({}) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); //react-router로 부터 변수 정보 가져오기
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  });
  return (
    <div className={styles.container}>
      {loading ? (
      <h1 className={styles.loader}>Loading...</h1>
    ) : (
      <div>
        <img src={movie.medium_cover_image} alt={id} />
        <h1>Title: {movie.title}</h1>
        <h2>Genres: {movie.genres}</h2>
        <h3>Year: {movie.year}</h3>
        <h3>Rating: {movie.rating} /10</h3>
        <h3>Runtime: {movie.runtime} minutes</h3>
        <p>Summary: {movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
