import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { sName,bName } from '../utils'
import M from 'materialize-css'
const CreatePoll  = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [logo,setLogo] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = () => {
        const data = new FormData();
        data.append("file", logo);
        data.append("upload_preset", "voting");
        data.append("cloud_name", "dvfpkko1z");
        fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl(data.url);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const uploadFields = ()=>{
        
        // const obj = {firstname,lastname,password,email,city,stateName,mobile,branch,pic:url}
        // console.log(obj)
        fetch("https://epollingwebsite.onrender.com/createpoll",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,logo:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/result')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(logo){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
      <div className='col-5' style={{margin:'auto'}}>
          <div className="card px-5 py-2" style={{margin:"5%"}}>
          <h4 style={{margin:"auto",marginBottom:"20px"}}>Register a Candidate</h4>
          <div className="row">
            <div className="col">
                <input type="text" class="form-control"   value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
           
            </div>
          </div>
          <br />
          
        <div className="input-group mb-3">
            <input type="file" className="form-control" onChange={(e)=>setLogo(e.target.files[0])}/>
            <label className="input-group-text" for="inputGroupFile02">Upload</label>
        </div>
           <button className='btn btn-success mb-4 mt-2' onClick={() => PostData()}>Submit</button>
      </div>
      </div>
   )
}


export default CreatePoll