# Reddit Interactive Caption Game

## Project Overview

This project involves creating a custom subreddit to host an interactive game where users suggest funny captions for images. The goal is to dynamically update a label within a WebView based on the top-voted comment. This concept is inspired by Korean "제목학원" culture, where users compete to create the funniest or most fitting captions for a given image.  

![제목학원](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB2NdtdVUHTRpgGsFe3IspNVrMaM71aSVj3g&s)

### Features

- **Image Captioning:** Users submit captions for a displayed image via Reddit comments.
- **Dynamic Updates:** The label displaying the image's title updates in real-time based on the top-voted comment.
- **Community Engagement:** Encourages Reddit users to participate and vote on captions.
- **Custom Subreddit:** Designed for a subreddit with fewer than 200 members to comply with Devvit app restrictions.

### Tools and Technologies

- **Devvit:** For creating interactive posts and WebView integration on Reddit.
- **Reddit API:** For fetching comments and upvote data to identify the top-voted comment.
- **JavaScript & TypeScript:** For handling API interactions and dynamic updates.