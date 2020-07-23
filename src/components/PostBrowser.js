import React from 'react';

import PostList from './PostList';
import LoadingScreen from './LoadingScreen';
import DatasetButton from './buttons/DatasetButton';
import LoadMoreButton from './buttons/LoadMoreButton';

class PostBrowser extends React.Component {

    hotURL = 'https://www.reddit.com/r/reactjs/hot.json';
    newURL = 'https://www.reddit.com/r/reactjs/new.json';
    risingURL = 'https://www.reddit.com/r/reactjs/rising.json';

    constructor(props) {
        super(props);
        this.state = {loaded: false, dataset: "hot"};

        this.changeDataset = this.changeDataset.bind(this);
        this.loadNewPosts = this.loadNewPosts.bind(this);
        this.loadMorePosts = this.loadMorePosts.bind(this);
    }

    componentDidMount(){
        this.loadNewPosts(this.state.dataset);
    }

    getRedditURL(dataset){
        switch(dataset){
            case 'hot':
                return this.hotURL;
            case 'new':
                return this.newURL;
            case 'rising':
                return this.risingURL;
            default:
                return null;
        }
    }

    loadNewPosts(dataset){
        var url = this.getRedditURL(dataset);
        if(url){
            fetch(url)
                .then(res=>{
                    if(res.ok){
                        res.json()
                            .then(data=>{
                                this.setState({loaded: true, data: data});
                            })
                    } else {
                        console.error("Failed to connect to Reddit");
                    }
                })
        } else {
            console.error("No valid url from dataset: " + this.state.dataset)
        }
    }

    changeDataset(dataset){
        this.setState({loaded: false, dataset: dataset});
        this.loadNewPosts(dataset);
    }

    loadMorePosts(){
        var requestURL = this.getRedditURL();
        if(requestURL){
            console.log(this.state);
            requestURL = requestURL + "?after=" + this.state.data.data.after;
            fetch(requestURL)
                .then(res=>{
                    if(res.ok){
                        res.json()
                        .then(data=>{
                            data.data.children = this.state.data.data.children.concat(data.data.children);
                            this.setState({
                                data: data
                            });
                        });
                    } else {
                        console.error("Unable to reach reddit");
                    }
                });
        } else {
            console.error("Invalid dataset: " + this.state.dataset);
        }
    }

    render(){
        var mainContent;
        if(this.state.loaded){
            mainContent = <PostList posts={this.state.data.data.children} />
        }
        else
            mainContent = <LoadingScreen />;
        return(
            <div className="PostBrowser">
                <div className="buttonGroup">
                    <DatasetButton displayText="Hot" dataset="hot" currentDataset={this.state.dataset} changeDataset={this.changeDataset}/>
                    <DatasetButton displayText="New" dataset="new" currentDataset={this.state.dataset} changeDataset={this.changeDataset}/>
                    <DatasetButton displayText="Rising" dataset="rising" currentDataset={this.state.dataset} changeDataset={this.changeDataset}/>
                </div>
                {mainContent}
                <LoadMoreButton currentDataset={this.state.dataset} loadMore={this.loadMorePosts}/>
            </div>
        );
    }

}

export default PostBrowser