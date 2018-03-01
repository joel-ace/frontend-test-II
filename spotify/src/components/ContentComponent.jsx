import React, { Component } from 'react';
import SpotifyWebApiNode from 'spotify-web-api-node';
import requestPromise from 'request-promise';

import Loading from './Loading.jsx';
import Artistes from './Artistes.jsx';

class ContentComponent extends Component {
	constructor() {
		super();
		this.state = {
			artiste: '',
			relatedArtistes: [],
			similarSongs: [],
			accessToken: '',
			loading: true,
		};
		this.getToken = this.getToken.bind(this);
		this.renderComponent = this.renderComponent.bind(this);
		this.renderArtistes = this.renderArtistes.bind(this);
		this.sendApiRequests = this.sendApiRequests.bind(this);

		this.spotifyApi = new SpotifyWebApiNode();
	}

	componentWillMount() {
		this.getToken();
	}

	async getToken() {
		const clientId = '6f1617889ed14d708fe2730b5b27092b';
		const clientSecret = 'e0ca2e4ae6b1471db1e87fe00b0275ff';

		const requestOptions = {
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
			},
			form: {
				grant_type: 'client_credentials'
			},
			json: true
		};

		const requestAccessToken = await requestPromise.post(requestOptions);

		localStorage.devcoSpotify = requestAccessToken.access_token;
		this.spotifyApi.setAccessToken(requestAccessToken || localStorage.devcoSpotify);
		this.sendApiRequests();
	}

	sendApiRequests() {
		this.spotifyApi.getArtistRelatedArtists('0TnOYISbd1XYRBk9myaseg')
			.then((data) => {
				const { artists } = data.body;
				this.setState({
					relatedArtistes: artists,
					loading: false,
				});
				return Promise.all(artists.slice(0, 10).map(a => this.spotifyApi.getArtistTopTracks(a.id, 'US')));
			})
			.then((data) => {
				this.setState({
					similarSongs: data,
				});
			});
	}

	renderComponent() {
		return this.state.loading ? <Loading /> : this.renderArtistes();
	}

	renderArtistes() {
		const { relatedArtistes } = this.state;
		return relatedArtistes.slice(0, 10)
			.map((artiste, key) => <Artistes key={key} {...artiste} />);
	}

	render() {
		return (
			<div className="container">
				{ this.renderComponent() }
			</div>
		);
	}
}

export default ContentComponent;
