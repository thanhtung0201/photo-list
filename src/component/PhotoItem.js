function PhotoItem(index, title, url) {
    return <div key={index}>

      <img
        alt={title}
        data-src={url}
        className="card-img-top"
        src={url} />

      {<div className="card-footer">
        <p className="card-text text-center text-capitalize text-primary">{title}</p>
      </div>}
    </div>;
  }

export default PhotoItem;