import PhotoItem from './PhotoItem';

function PhotoList(imgData) {
    return <div id='images'>
      <div className="grid">
        {imgData.images.map((image, index) => {
          const { title, url } = image;
          return (
            PhotoItem(index, title, url)
          );
        })}
      </div>
    </div>;
  }

  export default PhotoList;