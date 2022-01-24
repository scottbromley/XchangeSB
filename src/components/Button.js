import React from 'react';
import './Button.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Button = ({ onClick = null, children = null }) => (
    <button onClick={onClick} className='sign__out__button__root' >
        {children}
        <ExitToAppIcon fontSize='small'/>
    </button>
);

export default Button;

