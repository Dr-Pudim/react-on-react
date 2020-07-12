import React from 'react';

import PostPreview from './PostPreview'
import LoadingScreen from './LoadingScreen'

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
                        this.setState({loaded: true, data: data, dataset: "new"});
                    })
            })
    }

    handleClickHot = () => {
        this.setState({loaded: false});
        fetch(this.hotURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data, dataset: "hot"});
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

    handleClickLoadMore = () => {
        var requestURL;
        switch (this.state.dataset){
            case 'hot':
                requestURL = this.hotURL;
                break;
            case 'new':
                requestURL = this.newURL;
                break;
            case 'rising':
                requestURL = this.risingURL;
                break;
            default:
                console.err("Cant load more: no valid dataset on state.");
        }
        requestURL = requestURL + "?after=" + this.state.data.data.after;
        fetch(requestURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        console.log(data);
                        data.data.children = this.state.data.data.children.concat(data.data.children);
                        this.setState({
                            data: data
                        });
                    });
            });
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

    loadMoreButton=
    <button onClick={this.handleClickLoadMore}>
        Load more!
    </button>

    render() {
    if(this.state.loaded){
        var postList = this.state.data.data.children.map((post) => 
            <PostPreview {...post} />
        );
        if(this.state.dataset !== 'rising'){
            return [this.buttonGroup, postList, this.loadMoreButton];
        }
        else return [this.buttonGroup, postList]
    }else{
        return [this.buttonGroup,(<LoadingScreen/>)];
    }
    }
}

export default PostList;