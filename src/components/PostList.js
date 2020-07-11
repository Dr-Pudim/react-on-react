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
                        this.setState({loaded: true, data: data});
                        console.log(data)
                    })
            })
    }

    handleClickNew = () => {
        this.setState({loaded: false});
        fetch(this.newURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                    })
            })
    }

    handleClickHot = () => {
        this.setState({loaded: false});
        fetch(this.hotURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                    })
            })
    }

    handleClickRising = () => {
        this.setState({loaded: false});
        fetch(this.risingURL)
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                    })
            })
    }

    render() {
    if(this.state.loaded){
        const hotButton= 
            <button onClick={this.handleClickHot}>
                hot
            </button>;
        const newButton=
            <button onClick={this.handleClickNew}>
                New
            </button>;
        const risingButton=
            <button onClick={this.handleClickRising}>
                Rising
            </button>;
        var postList = this.state.data.data.children.map((post) => 
            <PostPreview {...post} />
        );
        return [hotButton, newButton, risingButton, postList];
    }else{
        return (<p>loading</p>);
    }
    }
}

export default PostList;