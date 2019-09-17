import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import get from './fetchfun'



class prodpage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.id = props.match.params.id
    }
    componentDidMount(){
        get('https://hesh.devspace.host/api/collections/get/products',{_id:this.id},1,0).then((res) => {
            console.log(res)
            //this.setState({entries: res.entries, total: res.total})
            //console.log(this.state.entries)
        })
    }
    render() {
        return (
            <div className="propage">
                
            </div>
        )
    }
}

export default prodpage