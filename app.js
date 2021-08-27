let next_page_token = "";

//get api key at: console.cloud.google.com
let api_key = "*************************"; 

//get playlist id by checking the channel "uploads" playlist --- https://www.sociablekit.com/find-youtube-playlist-id/ ---
playlist_id = "UUK8sQmJBp8GCxrOtXWBpyEA"; 

let videos = [];

const getVideos = async () => {
	while (next_page_token !==  undefined) {
		const videoResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?pageToken=${next_page_token}&part=snippet&maxResults=50&playlistId=${playlist_id}&key=${api_key}`)

		const video = await videoResponse.json();

		//setting the next page token to the token gotten from the current response in the loop
		//... this will be passed into the next loop to get next 50 videos
		next_page_token = video.nextPageToken;

		console.log(video);

		//we're storing each video "item" inside a new array because
		//the videoId is within an array called items inside the response
		let videoArray = video.items;

		videoArray.forEach(item => {
			videos.push({
				videoLink: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
				videoTitle: `${item.snippet.title}`,
				videoPublishDate: new Date(`${item.snippet.publishedAt}`)
			});

			//apply to DOM
			document.getElementById('video').innerHTML += `
				<tr>
					<td>${item.snippet.title}</td>
					<td><a href="https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}" target=_blank>https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}</a></td>
					<td>${new Date(item.snippet.publishedAt)}</td>
				</tr>
			`
		});
	}
}

getVideos();

