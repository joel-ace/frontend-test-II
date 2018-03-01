import React, { Component } from 'react';
import { sendAPIrequest, replaceWordsWithGIF, replaceArray } from '../helpers';

class App extends Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			chatMessage: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.renderChatMessages = this.renderChatMessages.bind(this);
		this.replaceCommandWithGif = this.replaceCommandWithGif.bind(this);
	}

	handleChange(event) {
		this.setState({
			chatMessage: event.target.value,
		});
	}

	async replaceCommandWithGif(string) {
		const commandsArray = replaceWordsWithGIF(string) || [];

		const gifArray = await Promise.all(commandsArray
			.map(command => sendAPIrequest(command.substr(1))));

		const newString = replaceArray(this.state.chatMessage, commandsArray, gifArray);

		const newState = [...this.state.messages];
		newState.push(newString);
		this.setState({
			chatMessage: '',
			messages: newState,
		});
	}

	handleClick() {
		this.replaceCommandWithGif(this.state.chatMessage);
	}

	renderChatMessages() {
		const { messages } = this.state;
		return messages
			.map((message, i) => <p key={i} dangerouslySetInnerHTML={{ __html: message }}></p>);
	}

	render() {
		return (
			<div id="container">
				<div id="chat-window">
					<div id="output">
						{ this.renderChatMessages() }
					</div>
					<div>
						<input
							onChange={this.handleChange}
							type="text"
							id="message"
							placeholder="message"
							value={this.state.chatMessage}
						/>
						<button
							disabled={!this.state.chatMessage}
							onClick={this.handleClick}
							id="send"
						>Send
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
