import React from 'react';

// import './ChatItem.css';

// if author is defined, we're returning a left-hand-side list item otherwise a right-hand side something
const ChatItem=(props)=>{
    if(props.bymyself)
        return(<li class="left clearfix">
                <span class="chat-img pull-left">
                    <img src="http://placehold.it/50/55C1E7/fff&text=ME" alt="User Avatar" class="img-circle" />
                </span>
                <div class="chat-body clearfix">
                    <div class="header">
                        <strong class="primary-font">{props.author}</strong> <small class="pull-right text-muted">
                            <span class="glyphicon glyphicon-time"></span>{props.hms}</small>
                    </div>
                    <p>{props.message}</p>
                </div>
            </li>);
    return(<li class="right clearfix">
                <span class="chat-img pull-right">
                    <img src="http://placehold.it/50/FA6F57/fff&text=U" alt="User Avatar" class="img-circle" />
                </span>
                <div class="chat-body clearfix">
                    <div class="header">
                        <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{props.hms}</small>
                        <strong class="pull-right primary-font">{props.author}</strong>
                    </div>
                    <p>{props.message}</p>
                </div>
            </li>);
}

export default ChatItem;

