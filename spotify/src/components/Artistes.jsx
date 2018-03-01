import React from 'react';
import PropTypes from 'prop-types';


const Artistes = props => (
	<div className="col-md-12 artiste" >
		<h2><a href={props.external_urls.spotify} target="_blank">{ props.name }</a></h2>
		<div>
			<span className="meta">Followers { props.followers.total}</span>
			<span className="meta">Popularity { props.popularity}</span>
		</div>
	</div>
);

Artistes.propTypes = {
	name: PropTypes.string,
	popularity: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	followers: PropTypes.object,
	external_urls: PropTypes.object,
};

export default Artistes;
