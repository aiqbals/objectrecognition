import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    return(
        isSignedIn ? 
        <nav style= { {display: 'flex', justifyContent: 'flex-end'} }>
            <p className='f3 link b dim gold pa3 pointer' onClick={() => onRouteChange('signout')}> SignOut </p>
        </nav> : 
        <nav style= { {display: 'flex', justifyContent: 'flex-end'} }>
            <p className='f3 link b dim gold pa3 pointer' onClick={() => onRouteChange('signin')}> SignIn </p>
            <p className='f3 link b dim gold pa3 pointer' onClick={() => onRouteChange('register')}> Register </p>
        </nav>
    )
}

export default Navigation;