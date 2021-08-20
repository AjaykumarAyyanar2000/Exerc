import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <th>{props.exercise.username}</th>
        <th>{props.exercise.description}</th>
        <th>{props.exercise.duration}</th>
        <th>{props.exercise.date.substring(0,10)}</th>
        <th>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </th>
    </tr>
)
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
        
    }
    componentDidMount() {
        axios.get('http://localhost:2000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data})
        })

        .catch((error) => {
            console.log(error);
        })
    }
    
    deleteExercise(id) {
        axios.delete('http://localhost:2000/exercises/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercises:this.state.exercises.filter(el=> el._id !==id)
        })
    }

    exerciseList() {
        
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise}deleteExercise={this.deleteExercise} key = {currentexercise._id}/>;
        })
    }
    
    render() {
        return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
            
         
            <tbody>
           
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date </th>
                        <th>Actions</th>
                    </tr>
              
            {this.exerciseList()}
            </tbody>
            </table>
        </div>


        );
    }
}