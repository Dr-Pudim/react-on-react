import React from 'react';

import PostPreview from './PostPreview'

class PostList extends React.Component {
    constructor(props) {
        super(props);

        const url = 'https://www.reddit.com/r/reactjs/hot.json';

        this.state = {loaded: false};

        fetch(url)
            //.then(data=>{
            //    this.setState({loaded: true ,data: data.body});
            //    console.log(data.body)
            //})
            .then(res=>{
                res.json()
                    .then(data=>{
                        this.setState({loaded: true, data: data});
                        console.log(data)
                    })
            })
    }

    render() {
    if(this.state.loaded){
        var postList = this.state.data.data.children.map((post) => 
            <PostPreview {...post} />
        );
        return postList;
    }else{
        return (<p>loading</p>);
    }
    }
}

export default PostList;