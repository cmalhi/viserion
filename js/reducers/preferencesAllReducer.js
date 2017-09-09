const defaultPreferencesAll = [[{
  name: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#FB5B45',
    title: 'defaultTitle',
  },
},
{
  nickName: 'My ImageContent',
  componentName: 'ImageContent',
  attr: {
    id: 'notSet',
    imageUrl: 'http://i.imgur.com/A1SGNax.png',
    mainTitle: 'What\'s on Spotify?',
    subtitle1: 'Music',
    body1: 'There are millions of songs on Spotify. Play your favorites, discover new tracks, and build the perfect collection.',
    subtitle2: 'Playlists',
    body2: 'You’ll find readymade playlists to match your mood, put together by music fans and experts.',
    subtitle3: 'New Releases',
    body3: 'Hear this week’s latest singles and albums, and check out what’s hot in the Top 50.',
  },
},
{
  name: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
    text: 'defaultText',
  },
}],
[{
  name: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#009AF2',
    title: 'defaultTitle',
  },
},
{
  name: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
    text: 'defaultText',
  },
}]];

export default function (state = defaultPreferencesAll, action) {
  switch (action.type) {
    case 'CREATE_PREFERENCES':
      const preferences = action.payload;
      return preferences;
    default:
      return state;
  }
}
