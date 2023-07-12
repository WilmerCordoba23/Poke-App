import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from "react-router-dom";

const Detail = () => {

  const [heroe, setHeroe] = useState([]);
  let { slug } = useParams();
  const navigate = useNavigate();
  const onClicknavigate = ()=>{
    navigate(-1);
  }

  useEffect(() => {

    const url = `https://dh-heroes-app.herokuapp.com/api/hero-detail/${slug}`;

    fetch(url)
      .then(response => response.json())
      .then(({ data }) => {
        setHeroe(data)
      })

  }, [slug])


  return (
    <section>

      <div className='container mt-5 ' key={slug}>
        <h1>Detail {heroe.superhero}</h1>
        <div className='row'>
          <div className="col-12 col-sm-6 col-lg-3 my-2 p-1 card my-2 mx-3">
            <div className='rounded mx-auto'>
              {
                heroe && heroe.slug && (
                  <img src={`https://dh-heroes-app.herokuapp.com/assets/${heroe.slug}.jpg`} alt={`${heroe.superhero} image`} width={250} height={400} />
                )
              }
            </div>
            <div className="card-body p-2 ">
              <p><strong>alter ego:</strong> {heroe.alter_ego}</p>
              <p><strong>first appearance:</strong> {heroe.first_appearance}</p>
              <p><strong>characters:</strong> {heroe.characters}</p>      

              {
                heroe && heroe.publisher && (
                  <p><strong>publisher:</strong> {heroe.publisher.publisher}</p>
                )
              }

              <Link className="btn btn-outline-success w-100" onClick={onClicknavigate}> Come back</Link>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Detail