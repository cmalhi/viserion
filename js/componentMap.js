// AddComponentModal uses this to generate default addable components

const componentMap = {
  Hero: {
    id: 'notSet',
    nickName: 'My Hero',
    componentName: 'Hero',
    displayName: 'Hero',
    attr: {
      bgColor: '#000000',
      title: 'Title',
      textColor: '#7BDBD5',
    },
  },
  GradientHero: {
    id: 'notSet',
    nickName: 'My GradientHero',
    componentName: 'GradientHero',
    displayName: 'GradientHero',
    attr: {
      color: {
        color1: '#0cebeb',
        color2: '#29ffc6',
      },
      mainTitle: 'Welcome',
      subTitle: 'subtitle',
      textColors: {
        mainTitleColor: '#FFFFFF',
        subTitleColor: '#FFFFFF',
      },
    },
  },
  ImageHero: {
    id: 'notSet',
    nickName: 'My ImageHero',
    componentName: 'ImageHero',
    displayName: 'ImageHero',
    attr: {
      backgroundUrl: 'https://images.unsplash.com/photo-1493087670264-2f7f5844b402',
      mainTitle: 'Welcome',
      subTitle: 'subtitle',
      textColors: {
        mainTitleColor: '#FFFFFF',
        subTitleColor: '#FFFFFF',
      },
    },
  },
  // Currently not wired up
  // PricingList: {
  //   id: 'notSet',
  //   nickName: 'My Pricing',
  //   componentName: 'PricingListModal',
  //   attr: {
  //     details: ['Milk..........$4.79', 'Bread......$1.39', 'Eggs.......$2.39'],
  //     color: 'green',
  //   },
  // },
  ImageContent: {
    id: 'notSet',
    nickName: 'My ImageContent',
    componentName: 'ImageContent',
    displayName: 'ImageContent',
    attr: {
      imageUrl: 'http://i.imgur.com/A1SGNax.png',
      mainTitle: 'What\'s on Spotify?',
      subtitle1: 'Music',
      body1: 'There are millions of songs on Spotify. Play your favorites, discover new tracks, and build the perfect collection.',
      subtitle2: 'Playlists',
      body2: 'You’ll find readymade playlists to match your mood, put together by music fans and experts.',
      subtitle3: 'New Releases',
      body3: 'Hear this week’s latest singles and albums, and check out what’s hot in the Top 50.',
      textColors: {
        mainTitleColor: '#000000',
        subTitleColor: '#000000',
        bodyColor: '#000000',
      },
    },
  },
  PinterestText: {
    id: 'notSet',
    nickName: 'My PinterestText',
    componentName: 'PinterestText',
    displayName: 'PinterestText',
    attr: {
      textColors: {
        titleColor: '#000000',
        bodyColor: '#000000',
      },
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
  PinterestContent: {
    id: 'notSet',
    nickName: 'My PinterestContent',
    componentName: 'PinterestContent',
    displayName: 'PinterestContent',
    attr: {
      thumbnailColor: '#000000',
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
  ImageCaption: {
    id: 'notSet',
    nickName: 'My ImageCaption',
    componentName: 'ImageCaption',
    displayName: 'ImageCaption',
    attr: {
      imageUrl: 'http://assets.vogue.com/photos/59970fd951182c18907ac941/master/w_1320,c_limit/04-studio-harlem.jpg',
      caption: 'Lorna Simpson, Dividing Lines, 1989',
      textColor: '#000000',
    },
  },
  TextContent: {
    id: 'notSet',
    nickName: 'My TextContent',
    componentName: 'TextContent',
    displayName: 'TextContent',
    attr: {
      title: 'With All Eyes on the South, the Most Important Art Show in America Is Underway in Pittsburgh',
      body: 'The exhibition—which features works from the likes of Kerry J. Marshall, Jenny Holzer, Kara Walker, and Lorna Simpson—begins with “A More Perfect Union,” an examination of national identity and symbols.',
    },
  },
  // Currently not wired up
  // List: {
  //   id: 'notSet',
  //   nickname: 'My List',
  //   componentName: 'List',
  //   attr: {
  //     bgColor: '#262626',
  //     items: ['This is a listing component', 'Here\'s an item', 'Another Item', 'Yet Another Item'],
  //   },
  // },
  Footer: {
    id: 'notSet',
    nickName: 'My Footer',
    componentName: 'Footer',
    displayName: 'Footer',
    attr: {
      bgColor: '#FFFFFF',
      text: 'Footer',
    },
  },
};

export default componentMap;

