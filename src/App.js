import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			projects: [],
			name: '',
			description: '',
			id: '',
			completed: false,
			isEditing: false,
		};
	}

	componentDidMount() {
		this.getProjects();
	}
	handleChanges = e => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	getProjects = () => {
		axios.get('https://mike-express-sprint.herokuapp.com/api/projects').then(res => {
			this.setState({ projects: res.data.projects });
		});
	};
	deleteProject = (e, id) => {
		e.preventDefault();
		axios.delete(`https://mike-express-sprint.herokuapp.com/api/projects/${id}`).then(res => {
			axios.get('https://mike-express-sprint.herokuapp.com/api/projects').then(res => {
				this.setState({ projects: res.data.projects });
			});
		});
	};

	addProject = e => {
		e.preventDefault();
		let project = { name: this.state.name, description: this.state.description };
		axios.post(`https://mike-express-sprint.herokuapp.com/api/projects/`, project).then(res => {
			axios.get('https://mike-express-sprint.herokuapp.com/api/projects').then(res => {
				this.setState({ projects: res.data.projects });
			});
		});
	};
	render() {
		return (
			<div className="App">
				<form>
					<input
						name="name"
						required
						value={this.state.name}
						placeholder="Name"
						onChange={e => this.handleChanges(e)}
					/>
					<input
						name="description"
						required
						value={this.state.description}
						placeholder="Description"
						onChange={e => this.handleChanges(e)}
					/>
					<button onClick={e => this.addProject(e)}>Add Project</button>
				</form>
				<div className="projects">
					{this.state.projects.map(project => (
						<div key={project.id} className="project">
							<h1>{project.name}</h1>
							<p>{project.description}</p>
							<p>{project.completed ? 'Completed' : 'Not Completed'}</p>

							<button onClick={e => this.deleteProject(e, project.id)}>Delete</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
