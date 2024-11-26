import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

const form = Devvit.createForm(
  {
    title: 'Upload an image!',
    fields: [
      {
        name: 'myImage',
        type: 'image', // This tells the form to expect an image
        label: 'Image goes here',
        required: true,
      },
    ],
  },
  (event, context) => {
    const imageUrl = event.values.myImage;
    // Use the mediaUrl to store in redis and display it in an <image> block, or send to external service to modify
  }
);

Devvit.addMenuItem({
  label: 'Show a dynamic form',
  location: 'subreddit',
  onPress: async (_event, context) => {
    context.ui.showForm(form);
    // @TODO: 이미지를 Reddis에 업로드 후 post 생성 및 WebView 호출 처리
  },
});

export default Devvit;