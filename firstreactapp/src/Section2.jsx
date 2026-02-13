import {useState} from 'react';
import {useEffect} from 'react'
import './Section2.css'
import Section3 from './Section3'



function Section2(props){
    console.log(props)


   return(

    <div className="news">
            <div className="newsImg">
                <img src={props.article.urlToImage} />
            </div>
            <h3 className="title">{props.article.title}</h3>
            <p className="desc">{props.article.description?.substring(0,100).concat("...")}<a href={props.article.url} target="_blank">Read More</a></p>

    </div>
   )


}



export default Section2