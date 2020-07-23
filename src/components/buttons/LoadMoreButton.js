import React from 'react'


class LoadMoreButton extends React.Component{

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.props.loadMore();
    }

    render(){
        var disabled = false;
        if(this.props.currentDataset === "rising")
            disabled = true;
        return(
            <div className="buttonGroup">
                <button onClick={this.handleClick} id="load-more" className="reddit-buttom" disabled={disabled}>
                    + Ver Mais
                </button>
            </div>
        )
    }
}

export default LoadMoreButton;