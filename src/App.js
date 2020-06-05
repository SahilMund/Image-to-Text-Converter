import React,{useState,useEffect} from 'react';
import './App.css';
import Tesseract from 'tesseract.js';
import ImageWrapper from './componenets/imageWrapper';
import TextWrapper from './componenets/TextWrapper';
import axios from 'axios';


function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);


  const convertImageToText = async () => {
    setLoading(true);
    const result = await Tesseract.recognize(imageUrl, "eng",
    {logger : m => console.log(m)});

    //console.log(result)
    setText(result.data.text);
  
    setLoading(false);
  };


  const uploadImage =async  e =>{
    setLoading(true);
  // console.log(e.target.files[0]);
  const formData = new FormData();
  formData.append('image',e.target.files[0]);
  
  //configuration of our file i.e. multimedia
  const config ={
    headers :{
      'content-type':'multipart/form-data'}
  };

  const res= await axios
    .post("https://api.imgbb.com/1/upload?key=2c987a468cb1d5130e50ba5bb4c2c538",
    formData,config);

    setImageUrl(res.data.data.url);
    setLoading(false);
    //console.log(res);
    
};

useEffect(() => {
  if (imageUrl != null) {
    convertImageToText();
  }
}, [imageUrl]);

//console.log(`${process.env.REACT_APP_API_KEY}...`);

  return (
    <div className="App">
    <img src="https://i.ibb.co/LpxDvR1/logo.png" className="logo" alt="" />
      <div className="container">
      {loading && <div className='loader'/>}
       {text == null ? (
          <ImageWrapper loading={loading} uploadImage={uploadImage} />
        ) : (
          <TextWrapper text={text} />
        )}
      </div>
    </div>
  );
}

export default App;



/*

import React, { useState, useEffect } from "react";
import "./App.css";
import Tesseract from "tesseract.js";
import TextWrapper from "./components/TextWrapper";
import ImageWrapper from "./components/ImageWrapper";
import axios from "axios";

// create account on imgbb and go to > about section > and get that api key and put it here

const API_KEY = "2c987a468cb1d5130e50ba5bb4c2c538";

function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState(null);

  const convertImageToText = async () => {
    setLoading(true);
    const result = await Tesseract.recognize(imageUrl, "eng");
    setText(result.data.text);
    setLoading(false);
  };

  const uploadFile = async e => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData,
        config
      );
      setImageUrl(res.data.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (imageUrl != null) {
      convertImageToText();
    }
  }, [imageUrl]);
  console.log(`${process.env.REACT_APP_API_KEY}`);
  return (
    <div className="App">
      <img src="https://i.ibb.co/LpxDvR1/logo.png" className="logo" alt="" />
      <div className="container">
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading={loading} uploadFile={uploadFile} />
        ) : (
          <TextWrapper text={text} />
        )}
      </div>
    </div>
  );
}

export default App;
*/