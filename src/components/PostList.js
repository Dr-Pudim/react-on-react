import React from 'react';

import PostPreview from './PostPreview'

class PostList extends React.Component {
    hotURL = 'https://www.reddit.com/r/reactjs/hot.json';
    newURL = 'https://www.reddit.com/r/reactjs/new.json';
    risingURL = 'https://www.reddit.com/r/reactjs/rising.json';

    constructor(props) {
        super(props);
        this.state = {loaded: false};

        fetch(this.hotURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data, dataset: "hot"});
                    })
            })
    }

    handleClickNew = () => {
        this.setState({loaded: false});
        fetch(this.newURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, dataset: "new"});
                    })
            })
    }

    handleClickHot = () => {
        this.setState({loaded: false});
        fetch(this.hotURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, dataset: "hot"});
                    })
            })
    }

    handleClickRising = () => {
        this.setState({loaded: false});
        fetch(this.risingURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data, dataset: "rising"});
                    })
            })
    }

    hotButton= 
    <button class="reddit-buttom" onClick={this.handleClickHot}>
        Hot
    </button>;

    newButton=
    <button class="reddit-buttom" onClick={this.handleClickNew}>
        New
    </button>;

    risingButton=
    <button class="reddit-buttom" onClick={this.handleClickRising}>
        Rising
    </button>;

    buttonGroup=
    <div class="buttonGroup">
        {this.hotButton}
        {this.newButton}
        {this.risingButton}
    </div>;

    render() {
    if(this.state.loaded){
        var postList = this.state.data.data.children.map((post) => 
            <PostPreview {...post} />
        );
        return [this.buttonGroup, postList];
    }else{
        return (<p>loading</p>);
    }
    }
}

export default PostList;