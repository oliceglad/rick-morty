import React, { useEffect } from 'react'
import { Card } from '../../Card/Card'
import { Loader } from '../../UI/loader';
import { Paginator } from '../../UI/paginator';
import { connect } from 'react-redux'
import { changePage, requestData } from '../../../redux/main-reducer';

const HomePage = ({ data, currentPage, info, requestData, changePage }) => {
  const { pages, prev, next } = info

  useEffect(() => {
    requestData(currentPage)
  }, [currentPage])

  return (
    <div className='container'>
      {data ? <div className='content'><div className='wrapper'>
        {data.map(el => (
          <Card data={el} key={el.id} />
        ))}
      </div>
        <Paginator pages={pages} pressHandler={changePage} page={currentPage} next={next} prev={prev} />
      </div> : <Loader />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  data: state.main.data,
  info: state.main.info,
  currentPage: state.main.currentPage
})

export const HomePageContainer = connect(mapStateToProps, { requestData, changePage })(HomePage)