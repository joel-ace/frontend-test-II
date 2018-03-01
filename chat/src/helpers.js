import axios from 'axios';

export const replaceWordsWithGIF = string => string.match(/\/\w+\b/g);

export const sendAPIrequest = async (word) => {
	const apiKey = '3H6vWU9HBpDeDIQ3moD77qd9gt4zPhvG';
	const apiUrl = `http://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&limit=1&s=${encodeURI(word)}`;
	const requestResponse = await axios.get(apiUrl);
	const { data: { data } } = requestResponse;
	if (data.images) {
		const { images: { fixed_width_small: { url } } } = data;
		return url;
	}
	return '';
};

export const replaceArray = (replaceString, commandArray, gifArray) => {
	for (let i = 0; i < commandArray.length; i += 1) {
		const replaced = gifArray[i] ? `<img width="40px" src=${gifArray[i]} />` : commandArray[i];
		replaceString = replaceString.replace(commandArray[i], replaced);
	}
	return replaceString;
};
