const defaultPreferencesAll = [[{
  nickName: 'My Hero',
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
  nickName: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
    text: 'defaultText',
  },
}],
[{
  nickName: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#009AF2',
    title: 'defaultTitle',
  },
},
{
  nickName: 'My PinterestContent',
  componentName: 'PinterestContent',
  attr: {
    id: 'notSet',
    headerColor: '#d3654b',
    content: [
      {
        title: 'Who can attend?',
        body: 'All undergraduate, graduate, and high school students are welcome. If you are under 18, we\'ll need a parental consent form.',
      },
      {
        title: 'I don’t have a team. Can I still participate?',
        body: 'Of course! It is not necessary to have a team prior to coming to Hack@Brown.',
      },
      {
        title: 'Will there be a standby line the day-of the event?',
        body: 'Yes, there will be a standby line if accepted attendees do not show up! The line will open when registration starts (9am) and students will be admitted off the standby line after registration ends (10:30am).',
      },
    ],
  },
},
{
  nickName: 'My Footer',
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
