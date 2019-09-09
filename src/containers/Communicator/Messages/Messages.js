import React from 'react';
import classes from './Messages.module.css';
import Message from '../../../components/Communicator/Message/Message';

const messages = props => {
    return (
        <div className={classes.Messages}>
            {/* <Message key="2312311" msg={{
                id: "21312310",
                author: {id: 'myId', nick:'jonathan'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It.`
                }]
            }} /> */}
            <Message key="23123101" msg={{
                id: "2131231",
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, \ntest, and deploy your code using Bitbucket Pipelines.`
                }, {type: 'new-line', content: null}, {type: 'text', content: "Next text to put in new line."},
                {type: 'new-line', content: null}, {type: 'text', content: "Next text to put in new line."},
                {type: 'new-line', content: null},{type: 'new-line', content: null},{type: 'new-line', content: null},
                {type: 'text', content: "https://medium.com/better-programming/cross-platform-apps-with-electron-and-react-part-1-68d6b6be4c1b"}]
            }} />
            <Message key="2312311111" msg={{
                id: "2131231",
                author: {id: 'myId', nick:'jonathan'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
            <Message key="2312312" msg={{
                id: "2131231",
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `Bitbucket Pipelines.`
                }]
            }} />
            <Message key="2312313" msg={{
                id: "2131231",
                author: {id: '123', nick:'john'},
                time: new Date().toUTCString(),
                parts: [{
                    type: "text", 
                    content: `It looks like you don't have a build tool set up yet.Rapidly build, test, and deploy your code using Bitbucket Pipelines.`
                }]
            }} />
            <Message key="2312314" msg={{
                id: "2131231",
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