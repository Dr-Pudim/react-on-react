import React from 'react';

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
    
    componentDidMount() {
    
    }
    
    componentWillUnmount() {
        
    }

    render() {
      return (
        <div>
            <h1>{this.state.loaded.toString()}</h1>
        </div>
      );
    }
}

export default PostList;