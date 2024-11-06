const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 19,
    width: 'auto',
    backgroundColor: "#DCE2E2",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    borderRadius: 'inherit',
  }

  const labelStyles = {
    textAlign: 'center',
    fontSize:10,
    padding: 5,
    color: 'white',
  }

  return (
    <div style={containerStyles}>
      <div id="fillerStyles" className="progress-bar-inner" style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
