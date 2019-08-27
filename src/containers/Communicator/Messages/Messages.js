import React from 'react';
import classes from './Messages.module.css';
import Message from '../../../components/Communicator/Message/Message';

const messages = props => {
    return (
        <div className={classes.Messages}>
            <Message msg={{
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }, {type: 'new-line', content: null}, {type: 'text', content: "Next text to put in new line."}]
            }} />
            <Message msg={{
                author: {id: 'myId', nick:'jonathan'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
            <Message msg={{
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
            <Message msg={{
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
            <Message msg={{
                author: {id: 'myId', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
        </div>
    );
}

export default messages;