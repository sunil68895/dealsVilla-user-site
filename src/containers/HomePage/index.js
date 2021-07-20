import React from 'react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import MenuHeader from '../../components/MenuHeader'
import  { Carousel }  from 'react-responsive-carousel'
import c11 from '../../images/c11.jpg'
import c21 from '../../images/c21.jpg'
import c31 from '../../images/c31.jpg'
import c41 from '../../images/c41.jpg'

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {

  const  items=[
      {id: 1 , url: c41},
      {id: 2 , url: c31},
      {id: 3 , url: c21},
      {id: 4 , url: c11},
    ]
  return(
    <Layout>

      <Carousel showThumbs={false} interval={3000} infiniteLoop={true} autoPlay={true} centerMode={true}>
        {items.map(item=><div key={item.id} style={{
        height:'600px',
        display:'flex',
      }}>
      <img src={item.url} alt="" />
       </div>)
      }
      </Carousel>
    </Layout>
   )

 }

export default HomePage
