import React  , {useRef}from "react";
import Button from "./Button";
import './imageUpload.css'


const ImageUpload = (props) =>{

    const filePicker = useRef()

    const handleFile = (event)=>{
        console.log(event.target);
    }

    const pickimageHandler = ()=>{
        filePicker.current.click()
    }

    return (
        <div className="form-control">
            <input 
                id= {props.id}
                ref={filePicker}
                type="file"
                style={{display:"none"}}
                accept=".jpg ,.jpeg ,.png" 
                onChange={handleFile}
            />

            <div className = {`image-upload ${props.center && 'center'} `}>

                <div className="image-upload__preview" >
                    <img src="" alt="Preview"/>
                </div>

                <Button type ="button"  onClick = {pickimageHandler} >Pick Image</Button>

            </div>

        </div>
    )

}

export default ImageUpload;