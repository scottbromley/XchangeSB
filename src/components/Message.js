import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';




const formatDate = date => {
    let formattedDate = '';
    if (date) {
        formattedDate = formatRelative(date, new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};



const Message = forwardRef(({
    createdAt = null, 
    text = '',
    displayName = '',
    photoURL = '',
    id = '',
    uid = '',
    user = '',
}, ref) => {
    if (!text) return null;
    //console.log(text)

    const isUser = user === uid;

    return (
        <div ref={ref} >
            <Card className = {`message ${isUser && 'message__user'}`}>
                <CardContent >
                    <div className='user__details'>
                        { photoURL ? (
                            <img src={photoURL} alt="Avatar" width={30} height={30} className='user__image'/>
                        ): null}
                         <Typography color="textSecondary" variant="body2" component="p" className='display__name'> 
                            {displayName ? (
                                <p>{displayName}</p>
                            ) : null }
                        </Typography>
                    </div>
                    <Typography variant="body2" component="p" className='message__text'>
                        <p1>{text}</p1>
                    </Typography>
                    <Typography color="textSecondary" variant="body2" component="p2">
                            {createdAt?.seconds ? (
                            <span>
                                {formatDate(new Date(createdAt.seconds * 1000))}
                            </span>
                            ) : null}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );

});



Message.propTypes = {
text: PropTypes.string,
createdAt: PropTypes.shape({
    seconds:PropTypes.number,
}), 
displayName: PropTypes.string,
photoURl: PropTypes.string,
};

export default Message;