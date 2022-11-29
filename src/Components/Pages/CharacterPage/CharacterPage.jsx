import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EpisodesCard } from '../../EpisodesCard/EpisodesCard'
import { LocationCard } from '../../LocationCard/LocationCard'
import s from './CharacterPage.module.scss'
import { requestCharacter} from '../../../redux/main-reducer';
import { useEffect } from 'react'
import { Loader } from '../../UI/loader'

const CharacterPage = ({character, requestCharacter, isFetching, episodes}) => {

  const {charId} = useParams();

  useEffect(() => {
    requestCharacter(charId);
  }, [])

  if (isFetching) {
    return (
      <Loader/>
    )
  }

  console.log(episodes)

  return (
    <div className={s.wrapper}>
        <div className={s.bgWrapper}>
          <img src={character.image} alt=""/>
          <div className={s.blurLayer}></div>
        </div>
        <div className='container'>
          <div className={s.infoBlock}>
            <div className={s.avatar}>
              <img src={character.image} alt="" />
            </div>
            <div className={s.content}>
              <div>
                <h1>{character.name}</h1>
                <span className={s.withDot}>{character.status}-{character.species}</span>
              </div>
              <div>
                <p>Last known location:</p>
                <span>{character?.location?.name}</span>
              </div>
              <div>
                <p>Created:</p>
                <span>{character.created}</span>
              </div>
            </div>
          </div>
          <section>
            <h1 className={s.sectionTitle}>Episodes</h1>
            <div className={s.cardRow}>
              {episodes.map(ep => (<LocationCard episode={ep} key={'episode' + ep.id}/>))}
            </div>
          </section>
        </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  character: state.main.character, 
  isFetching: state.main.isFetching,
  episodes: state.main.episodes
})

export const CharacterPageContainer = connect(mapStateToProps, {requestCharacter})(CharacterPage)