// import React from 'react';
// import { AppRegistry, Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import { connect } from 'react-redux';
// import { addTitle } from '../actions/index.js';
// import { bindActionCreators } from 'redux';
// import { Field, reduxForm } from 'redux-form';

// class ChooseTitle extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Enter a title</Text>
//         <TextInput
//           style={{height: 40}}
//           placeholder="Choose a good one"
//           onSubmitEditing={this.props.addTitle.bind(this, this.refs.titleField.value)}
//           clearButtonMode="unless-editing"
         
//         />
//         <Button
//           onPress={this.props.addTitle.bind(this, this.refs.titleField.value)}
//           title="Submit"
//           color="#000000"
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({addTitle}, dispatch);
// }

// export default connect(null, matchDispatchToProps)(ChooseTitle);


import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const ChooseTitle = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={this.handleSubmit.bind(this)}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email"/>
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component="input" type="checkbox"/>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(ChooseTitle)
