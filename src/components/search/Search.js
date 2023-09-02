import React from 'react'
import {BiSearch} from 'react-icons/bi'
const Search = ({value,onChange}) => {
  return (
    <div style={{marginLeft:"70px"}}>
      <BiSearch size={28}/>
      
      <input type='text' placeholder='serach by name'
      value={value} onChange={onChange}
      style={{padding:"10px 30px 10px 0"}}/>
    </div>
    
  )
}

export default Search
