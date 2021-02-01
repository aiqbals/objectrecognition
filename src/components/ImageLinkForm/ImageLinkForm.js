import React from 'react';
import './Imagelinkform.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit, onSelect, errhint }) => {
    return(
        <div className=''>
            <div className='f3'>
                <p className='white b'>{'Detect you pictuer with this Magic Brain Tools'}</p>
                <select 
                    id="detecttypes" 
                    className="w-35 center db h2 f5 bg-near-white  b--sliver" 
                    name="" onChange={onSelect}>    
                        <option value="">Select Type </option>
                        <option label="" value="face">FaceDetect</option>
                        <option label="" value="color">ColorDetect</option> 
                        <option label="" value="travel">TravelDetect</option>
                        <option label="" value="food">FoodDetect</option>              
                </select>

                <div className='center'>
                    <div className='form center pa4 br3 shadow-5'>
                        <input 
                            className='f4 pa2 w-70 center' type='text' 
                            onChange={onInputChange}/>
                        <button 
                            className='w-30 grow f4 link ph3 pv2 b gold bg-black'
                            onClick={onButtonSubmit}> Detect </button>
                    </div>
                </div>
                <p 
                    id='errhint' 
                    className="red b bg-near-white w-50 center"> {errhint} 
                </p> 
            </div>
        </div>
    )
}

export default ImageLinkForm;