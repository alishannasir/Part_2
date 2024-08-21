import React from 'react'
import axios, { Axios } from 'axios'
const baseURl = "http://localhost:3001/notes"
const getAll = () =>{
    return axios.get(baseURl)
}

const create = newObject =>{
   return axios.post(baseURl, newObject)
}

const update = (id , newObject)=>{
    return axios.put(`${baseURl}/${id}` , newObject)
}


export default {
   getAll: getAll,
   create: create,
   update: update
}