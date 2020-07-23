import React from 'react';

class DatabaseButton extends React.Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.changeDataset(this.props.dataset);
    }

    render(){
        var className = "reddit-buttom";
        if(this.props.dataset === this.props.currentDataset)
            className = className + " active";
        return (
            <button className={className} onClick={this.handleClick}>
                {this.props.displayText}
            </button>
        );
    }    

}

export default DatabaseButton;