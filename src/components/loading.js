const Loading_page = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="loader"> {message}</div>
    </div>
  );
};

export default Loading_page;
