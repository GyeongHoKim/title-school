import './createPost.js';

import { Devvit, JSONObject, useAsync } from '@devvit/public-api';

type WebViewMessage = {
  id: string;
  eventType: 'title-school';
  payload?: { userId: string, imageUrl: string, caption: string };
};

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Title School',
  height: 'tall',
  render: (context) => {
    const postId = context.postId;
    const handleWebViewMessage = async (message: any) => {
      const requestId = message.id;
      if (message.eventType !== 'title-school') {
        context.ui.webView.postMessage('myWebView', {
          id: requestId,
          error: 'Invalid event type',
        });
        return;
      }
      try {
        if (!postId) {
          throw new Error('Post ID is required');
        }
        const data = await context.redis.hGetAll(postId);
        context.ui.webView.postMessage('myWebView', {
          id: requestId,
          data: {
            postId,
            imageUrl: data.imageUrl,
            caption: data.caption,
          },
        });
        console.log(data);
      } catch (error) {
        console.error(error);
        context.ui.webView.postMessage('myWebView', {
          id: requestId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return (
      <webview
        id="myWebView"
        url="index.html"
        grow
        height="100%"
        onMessage={handleWebViewMessage}
      />
    );
  },
});

export default Devvit;
