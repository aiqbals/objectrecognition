import React from 'react';
import './Imagelinkform.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className=''>
            <div className='f3'>
                <p className='gold'>{'Detect you pictuer with this Magic Brain Tools'}</p>
                <select id="types" className="w-30 center db h2 f5 bg-near-white  b--sliver" name="">
                    <option value="">Select Type </option>
                    <option label="FaceDetect" value="2">FaceDetect
                    </option>
                    <option label="ColorDetect" value="12">ColorDetect
                    </option>               
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
            </div>
        </div>
    )
}

export default ImageLinkForm;