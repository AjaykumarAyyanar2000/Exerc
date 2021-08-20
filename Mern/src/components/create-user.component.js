import React, {Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        // To make this functional inside the methods we do binding

        this.onChangeUsername= this.onChangeUsename.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            username: '',
    
        }
    }
    onChangeUsename(e) {
        this.setState({
            username: e.target.value
        });
            }
            onSubmit(e){
                e.preventDefault();
                console.log("Here");
            
                const user = {
                    username: this.state.username,
                }
                console.log(user);

                axios.post('http://localhost:2000/users/add',user)
                .then(res => console.log(res.data));
               this.setState({
                   username: ''
               })
            }



    render() {
        return (
            <div>
            <h3>Create New User</h3>
            <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Create User" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>



        )
    }
}