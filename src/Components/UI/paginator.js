import React from 'react'

export const Paginator = ({pages, pressHandler, page, prev, next}) => {
    let arrPages = []

    const size = 3
    let firstIndex = page
    let lastIndex = page + size - 1

    for (let i = 1; i <= pages; i++) {
        arrPages.push(i);
    }

    return (
        <div className='paginator-wrapper'>
            <p onClick={() => {
                if(prev) pressHandler(page - 1)
            }}
            className={prev ? 'paginator-wrapper__item active' : 'paginator-wrapper__item'}>
                <img src='./img/icons/chevron-left.svg' alt='' className='paginator-wrapper__prev-btn'/>
            </p>
            {arrPages.filter(el => el >= firstIndex && el <= lastIndex).map(el => (
                <p key={el} 
                onClick={() => pressHandler(el)}
                className={page === el ? 'paginator-wrapper__item active' : 'paginator-wrapper__item'}>
                    {el}
                </p>
            ))}
            {lastIndex < pages && 
            <>
                <span>...</span>
                <p onClick={() => pressHandler(pages)} className='paginator-wrapper__item'>{pages}</p>
            </>}
            <p onClick={() => {
                if(next) pressHandler(page + 1)
            }}
            className={next ? 'paginator-wrapper__item active' : 'paginator-wrapper__item'}>
                <img src='./img/icons/chevron-left.svg' alt='' className='paginator-wrapper__next-btn'/>
            </p>
        </div>
    )
}

