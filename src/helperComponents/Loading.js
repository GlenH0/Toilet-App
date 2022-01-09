import "./loading.css";

const Loading = (props) => (
  <div className="loading-container" style={{marginRight:props.marginRight}}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;
