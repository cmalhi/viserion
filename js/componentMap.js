// AddPageModal uses this to generate default addable components

const componentMap = {
  Hero: {
    nickName: 'My Hero',
    componentName: 'Hero',
    attr: {
      id: 'notSet',
      bgColor: 'defaultColor',
      title: 'defaultTitle',
    },
  },
  PricingList: {
    nickName: 'My Pricing',
    componentName: 'PricingListModal',
    attr: {
      details:['Milk..........$4.79','Bread......$1.39','Eggs.......$2.39'],
      color: 'green',
    },
  },
  ImageContent: {
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
  PinterestContent: {
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
  ImageCaption: {
    nickName: 'My ImageCaption',
    componentName: 'ImageCaption',
    attr: {
      id: 'notSet',
      imageUrl: 'http://assets.vogue.com/photos/59970fd951182c18907ac941/master/w_1320,c_limit/04-studio-harlem.jpg',
      caption: 'Lorna Simpson, Dividing Lines, 1989',
    },
  },
  TextContent: {
    nickName: 'My TextContent',
    componentName: 'TextContent',
    attr: {
      id: 'notSet',
      title: 'With All Eyes on the South, the Most Important Art Show in America Is Underway in Pittsburgh',
      body: 'The exhibition—which features works from the likes of Kerry J. Marshall, Jenny Holzer, Kara Walker, and Lorna Simpson—begins with “A More Perfect Union,” an examination of national identity and symbols.',
    },
  },
  Footer: {
    nickName: 'My Footer',
    componentName: 'Footer',
    attr: {
      id: 'notSet',
      bgColor: 'defaultColor',
      text: 'defaultText',
    },
  },
};

export default componentMap;

