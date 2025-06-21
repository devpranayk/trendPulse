import {useState} from 'react';

function Section1(){

    let [name,setName]=useState();
    let [age,setAge]=useState();
  return (
    <>
        <input type="text" placeholder="enter your name" onChange={(e)=>{
          setName(e.target.value)
        }} />
        <input type="number" placeholder="Age" onChange={(e)=>{
          setAge(e.target.value)
        }} />

        <button type="button" onClick={()=>{
          console.log(name,age);
        }} >submit</button>
    </>
  )
}
export default Section1;