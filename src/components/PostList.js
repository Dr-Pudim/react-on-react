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
        this.setState({loaded: false, dataset: "new"});
        fetch(this.newURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                    })
            })
    }

    handleClickHot = () => {
        this.setState({loaded: false, dataset: "hot"});
        fetch(this.hotURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                    })
            })
    }

    handleClickRising = () => {
        this.setState({loaded: false, dataset: "rising"});
        fetch(this.risingURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
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
                        data.data.children = this.state.data.data.children.concat(data.data.children);
                        this.setState({
                            data: data
                        });
                    });
            });
    }

    hotButton(active){
        var className = "reddit-buttom";
        if(active)
            className = className + " active";
        return (<button className={className} onClick={this.handleClickHot}>
        Hot
    </button>);
    } 

    newButton(active){
        var className = "reddit-buttom";
        if(active)
            className = className + " active";
        return (<button className={className} onClick={this.handleClickNew}>
        New
    </button>);
    }

    risingButton(active){
        var className = "reddit-buttom";
        if(active)
            className = className + " active";
        return (<button className={className} onClick={this.handleClickRising}>
            Rising
        </button>);
    }

    isDatasetActive(dataset){
        if(dataset === this.state.dataset)
            return true;
        else
            return false;
    }

    buttonGroup(){
        return (
        <div className="buttonGroup">
            {this.hotButton(this.isDatasetActive("hot"))}
            {this.newButton(this.isDatasetActive("new"))}
            {this.risingButton(this.isDatasetActive("rising"))}
        </div>
        );
    }

    loadMoreButton=
    <div className="buttonGroup">
        <button onClick={this.handleClickLoadMore} id="load-more" className="reddit-buttom">
            + Ver Mais
        </button>
    </div>

    render() {
    if(this.state.loaded){
        var postList = this.state.data.data.children.map((post) => 
            <PostPreview {...post} />
        );
        if(this.state.dataset !== 'rising'){
            return [this.buttonGroup(), postList, this.loadMoreButton];
        }
        else return [this.buttonGroup(), postList]
    }else{
        return [this.buttonGroup(),(<LoadingScreen/>)];
    }
    }
}

export default PostList;