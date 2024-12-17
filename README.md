# Reddit Interactive Caption Game

[![My Skills](https://skillicons.dev/icons?i=ts,lit)](https://skillicons.dev)

## DEMO video

<iframe width="560" height="315" src="https://www.youtube.com/embed/3oPWWBoxVP8?si=fGmSQO06ElctnLxU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Project Overview

This project involves creating a custom subreddit to host an interactive game where users suggest funny captions for images. The goal is to dynamically update a label within a WebView based on the top-voted comment. This concept is inspired by Korean "제목학원" SNS game, where users compete to create the funniest or most fitting captions for a given image.  

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
- **Lit:** For building the UI.

I focused on enabling Promise-based IPC communication using postMessage, ensuring seamless and efficient handling of asynchronous requests and responses.  

for example,  

```ts
apiClient.get<TitleSchool>('title-school')
      .then((data) => {
        console.debug('hostConnected', data);
        this.titleSchool = this.typeGuard(data, isTitleSchool);
      })
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
        this.host.requestUpdate();
      });
```