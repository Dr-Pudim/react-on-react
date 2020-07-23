import React from 'react';

import PostPreview from './PostPreview'

class PostList extends React.Component {
    
    render() {
        return this.props.posts.map((post) => 
            <PostPreview key={post.data.id} post={post} />
        );
    }
}

export default PostList;