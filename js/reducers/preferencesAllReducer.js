const defaultPreferencesAll = [[{
  nickName: 'My Hero',
  componentName: 'Hero',
  id: 'hero1',
  attr: {
    bgColor: '#FB5B45',
    title: 'defaultTitle',
  },
},
{
  nickName: 'My ImageContent',
  componentName: 'ImageContent',
  id: 'imagecontent1',
  attr: {
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
  id: 'footer1',
  nickName: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#009AF2',
    text: 'defaultText',
  },
}],
[{
  id: 'hero2',
  nickName: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#009AF2',
    title: 'defaultTitle',
  },
},
{
  id: 'pinterest1',
  nickName: 'My PinterestContent',
  componentName: 'PinterestContent',
  attr: {
    headerColor: '#d3654b',
    imageUrls: [
      'https://68.media.tumblr.com/8c03ff7f9a45832be4a65783b5c39ecb/tumblr_ovebbfcc3S1s2tva9o1_1280.jpg',
      'https://68.media.tumblr.com/3523f18b84d111ca2d39797c766d6ab8/tumblr_ov7e3t3Dg61s2tva9o1_1280.jpg',
      'https://68.media.tumblr.com/dd9ef337da64596dad08baf332e7c91e/tumblr_ovebc0U7381s2tva9o1_1280.jpg',
      'https://68.media.tumblr.com/bf224896567a05f502931d1f738cec85/tumblr_oubn37DsUk1s2tva9o1_1280.jpg',
      'https://68.media.tumblr.com/c0f6f53319b37c3dd46158438739a5ae/tumblr_oubn9jascg1s2tva9o1_1280.jpg',
      'https://68.media.tumblr.com/aac121c777631aa1ef756fd4164a004f/tumblr_oubn8iPPLG1s2tva9o1_1280.jpg',
    ],
  },
},
{
  id: 'footer2',
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
