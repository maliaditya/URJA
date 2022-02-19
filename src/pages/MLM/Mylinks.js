import React from 'react'

const Mylinks = () => {
    return (
      <div
        className='container-fluid mb-2'
        style={{
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          paddingTop: '2%',
          paddingBottom: '2%',
          paddingLeft: '2%',
          // margin: '%',
          borderRadius: '5px',
        }}
      >
        <p style={{ margin: '0px', fontSize: '2rem' }}>Registeration link </p>
        <p style={{ margin: '0px', fontSize: '1.3rem' }}>
          Forward the following link to add new members in your direct team.{' '}
        </p>

        <a
          href={`${api}/mylinks/`}
          style={{ margin: '0px', fontSize: '1.2rem' }}
        >
          {api}/mylinks/{sellerDetails.member_id}
        </a>
      </div>
    )
}

export default Mylinks
