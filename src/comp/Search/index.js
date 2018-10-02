
import React, { Component } from 'react';

export default class Search extends Component {

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {

    const {
      value,
      onChange,
      onSubmit,
      children,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search hare"
          onChange={onChange}
          value={value}
          ref={(node) => { this.input = node; }}
          type="text"
        />
        <button type="submit">{children}</button>
      </form>
    )
  }
}

// export default ({
//   value,
//   onChange,
//   onSubmit,
//   children,
// }) => {
//   let input;
//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         placeholder="Search hare"
//         onChange={onChange}
//         value={value}
//         ref={(node) => input = node;}
//         type="text"
//       />
//       <button type="submit">{children}</button>
//     </form>
//   )
// }
