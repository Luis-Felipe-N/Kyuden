import { IAnimes } from "../../../@types/Anime";
import { FaPlay, FaStar } from "react-icons/fa";
import style from "./style.module.scss";
import Link from "next/link";
import { ButtonIcon } from "../../ButtonIcon";

interface ICardAnimesProps {
  anime: IAnimes;
}

export function CardPopularAnime({ anime }: ICardAnimesProps) {
  return (
    <Link href={`/anime/${anime.slug}`}>
      <a>
        <div
          className={style.cardPopular}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(23, 25, 35, 0) -7.34%, rgba(23, 25, 35, 1) 99.99%, rgba(23, 25, 35, 1) 100%), url(${anime?.cover}) `,
          }}
        >
          <div className={style.infos}>
            <ButtonIcon
              title={`Assistir ${anime.title}`}
              aria-label={`Assistir ${anime.title}`}
            >
              <FaPlay />
            </ButtonIcon>
            <div className={style.infos__content}>
              <h3>{anime.title}</h3>
              <ul className={style.infos__content_genres}>
                {anime.genres
                  ? anime.genres.map((genre, index) => (
                      <li key={`${anime.slug}${index}`}>{genre.name}</li>
                    ))
                  : "Sem gêneros"}
              </ul>
            </div>
            <div className={style.infos__rating}>
              <FaStar />
              <span>{anime.rating}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
