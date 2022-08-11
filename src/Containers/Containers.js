import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getMessage,postMessage } from "../MessageSlice";
import FileInput from "../Components/Form/FileInput";
import apiURL from "../config";

const Containers = ()=> {
    const dispatch = useDispatch();
    const {allInfo} = useSelector(state => state);
    const [formValues, setFormValues] = useState({
        author: '',
        message: '',
        image: '',
      });

    useEffect(()=> {
      dispatch(getMessage())
    },[dispatch])
  
      const inputChangeHandler = e => {
        const {name,value} = e.target;
        setFormValues({...formValues, [name]:value});
        
      }

      const fileChangeHandler = e => {
        const {name} = e.target;
        const file = e.target.files[0];
        setFormValues(prevState => ({
          ...prevState,
          [name]: file
        }))
      }
      
      const submitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        for(let key in formValues){
          formData.append(key, formValues[key])
        }
        dispatch(postMessage(formData));
        setFormValues({
          author:'',
          message:'',
          image:''
        })
      }

  
      return(
        <>
       <div className="info" >
       {allInfo ? allInfo.map(message => (
        <div key={message.id} className="newMessages">
        <div className="author">
          <h4>Author</h4>
          <p>{message.author !== "" ? message.author : 'Anonymus'}</p>
        </div>
        <div className="text">
          <h4>Message</h4>
          <p>{message.message}</p>
        </div>
        {message.image !== '' ?
        <div className="date">
        <h4>Image</h4>
        <img className="img" src={`${apiURL}/uploads/${message.image}`} alt="img"/>
      </div>
      :
      null}
        
      </div>
       )) : <div style={{color:'black'}}>Нет записей</div>}
       </div>
         


       <form className="formAdmin" onSubmit={submitHandler}>
          <input 
            value={formValues.author} 
            className='inputForm' 
            name='author' 
            placeholder="Anonymus" 
            onChange={inputChangeHandler}
          />
          <textarea 
            value={formValues.message} 
            className='inputText'  
            name='message' 
            onChange={inputChangeHandler}
          />
          <FileInput 
            name="image" 
            image={formValues.image} 
            onChange={fileChangeHandler} 
          />
          <button type="submit" className="save">Save</button>
       </form>
        </>
      );
}

export default Containers;