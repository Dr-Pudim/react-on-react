import React from 'react';

const dayInMiliseconds = 86400000;
const hourInMiliseconds = 3600000;
const minuteInMiliseconds = 60000;

function getCreatedAtString(utc){
    var utcDiference = new Date() - new Date(utc * 1000);
    if(utcDiference < hourInMiliseconds){
        var minutesAgo = Math.floor(utcDiference / minuteInMiliseconds);
        return "Enviado a " + minutesAgo + " minutos";
    }
    if(utcDiference < dayInMiliseconds){
        var hoursAgo = Math.floor(utcDiference / hourInMiliseconds);
        return "Enviado a " + hoursAgo + " horas";
    }
    var daysAgo = Math.floor(utcDiference / dayInMiliseconds);
    return "Enviado a " + daysAgo + " dias";
}

function thumbnail(thumbnail){
    if(thumbnail !== "self" && thumbnail !== "default"){
        return (
            <div className="thumbnail-holder">
                <img src={thumbnail} alt="thumbnail"/>
            </div>
        )
    }
}

function PostPreview(props) {
    var domain = null;
    if(props.post.data.domain !== "self.reactjs")
        domain = <p className="domain">{props.post.data.domain}</p>
    return (
        <a href={"https://reddit.com" + props.post.data.permalink} className="PostLink">
            <div id={props.post.data.id} className="PostPreview">
                {thumbnail(props.post.data.thumbnail)}
                <div className="post-info">
                    <h2>{props.post.data.title}</h2>
                    <p><span className="createdAt">{getCreatedAtString(props.post.data.created_utc)}</span> por <span className="author">{props.post.data.author}</span></p>
                    {domain}
                </div>
            </div>
        </a>
    );
}

export default PostPreview;