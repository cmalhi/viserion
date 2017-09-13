// default preferences state
const defaultPreferences = [{
  id: 'hero24',
  nickName: 'My Hero',
  componentName: 'Hero',
  attr: {
    bgColor: '#000000',
    title: 'Title',
    textColor: '#7BDBD5',
  },
},
{
  id: 'notSet',
  nickName: 'My GradientHero',
  componentName: 'GradientHero',
  attr: {
    color: {
      color1: '#0cebeb',
      color2: '#29ffc6',
    },
    mainTitle: 'Welcome',
    subTitle: 'adjust your gradient',
  },
},
{
  id: 'footer12',
  nickName: 'My Footer',
  componentName: 'Footer',
  attr: {
    bgColor: '#FFFFFF',
    text: 'Footer',
  },
}];

export default function (state = defaultPreferences, action) {
  switch (action.type) {
    case 'LOAD_PREFERENCES':
      return action.status ? action.payload : state;
    case 'SELECT_PREFERENCES':
      let preferences = action.payload;
      return preferences;
    case 'APPEND_PREFS':
      var newComp = action.payload;
      state = [...state, newComp];
      return state;
    case 'UPDATE_PREFS':
      state = action.payload;
      return state;
    default:
      return state;
  }
}
