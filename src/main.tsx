import './createPost.js';

import { Devvit, useAsync } from '@devvit/public-api';

type WebViewMessage = {
  type: 'initialData';
  data: { username: string; imageUrl: string };
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
    const { data: imageData, loading, error } = useAsync(async () => {
      const user = await context.reddit.getCurrentUser();
      if (!user) {
        throw new Error('User not found');
      }
      const row = await context.redis.get(`${user.id}`);
      if (!row) {
        throw new Error('Image not found');
      }
      return JSON.parse(row);
    });

    if (imageData) {
      context.ui.webView.postMessage('myWebView', {
        type: 'image',
        data: { imageUrl: imageData.imageUrl, caption: imageData.caption },
      });
    }

    if (error) {
      context.ui.webView.postMessage('myWebView', {
        type: 'error',
        data: { error: error.message },
      });
    }

    return (
      <webview
        id="myWebView"
        url="index.html"
        grow
        height="100%"
      />
    );
  },
});

export default Devvit;
