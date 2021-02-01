import React from 'react';

const Rank = (props) => {
    const {name, entries} = props;

    return(
        <div className=''>
            <div className='white f3'>
                { `${name}, you current entry count is:`}
            </div>
            <div className='white f1 b'>
                {`#${entries}`}
            </div>
        </div>
    )
}

export default Rank;