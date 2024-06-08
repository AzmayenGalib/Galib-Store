import React from 'react'
import Helmet from "react-helmet"

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>
            {title}
        </title>
    </Helmet>
  )
}


export default MetaData;

/* helmet library er kaz holo aita diye amra web page a
dynamic vabe title dite pari .page a sobar upore ai helmet component
k mount korte hobe*/