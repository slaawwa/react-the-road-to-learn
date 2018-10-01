
import React/*, { Component }*/ from 'react';

// export default class Search extends Component {
//   render() {
//     const {value, onChange, children} = this.props;
//     return (
//           <form>
//             {children} <input
//               placeholder="Search hare"
//               onChange={onChange}
//               value={value}
//               type="text"
//             />
//           </form>
//     )
//   }
// }

export default ({
  value,
  onChange,
  onSubmit,
  children,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Search hare"
        onChange={onChange}
        value={value}
        type="text"
      />
      <button type="submit">{children}</button>
    </form>
  )
}
