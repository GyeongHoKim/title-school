import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
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
      {
        name: 'caption',
        type: 'string',
        label: 'Caption This Image!!',
        required: true,
      },
    ],
  },
  async (event, context) => {
    const imageUrl = event.values.myImage;
    const caption = event.values.caption;
    const user = await context.reddit.getCurrentUser();
    if (!user) {
      throw new Error('User not found');
    }
    await context.redis.set(`${user.id}`, JSON.stringify({
        imageUrl,
        caption,
      }),
    );

    const currentSubreddit = await context.reddit.getCurrentSubreddit();
    const post = await context.reddit.submitPost({
      title: 'Title School',
      subredditName: currentSubreddit.name,
      preview: (
        <vstack
          grow
          height="100%"
          alignment="middle center"
        >
          <text size="xlarge" weight="bold">
            Caption This Image!!
          </text>
        </vstack>
      ),
    });
    await context.ui.navigateTo(post);
  }
);

Devvit.addMenuItem({
  label: 'Make a Title School Post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    context.ui.showForm(form);
  },
});

export default Devvit;