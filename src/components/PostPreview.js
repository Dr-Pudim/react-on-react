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
            <div class="thumbnail-holder">
                <img src={thumbnail} alt="thumbnail"/>
            </div>
        )
    }
}

function PostPreview(props) {
    return (
        <div class="PostPreview">
            {thumbnail(props.data.thumbnail)}
            <div class="post-info">
                <h2>{props.data.title}</h2>
                <p><span class="createdAt">{getCreatedAtString(props.data.created_utc)}</span> por <span class="author">{props.data.author}</span></p>
                <p class="domain">{props.data.domain}</p>
            </div>
        </div>
    );
}

export default PostPreview;