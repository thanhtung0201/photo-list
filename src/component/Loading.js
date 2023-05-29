
import {ThreeDots} from 'react-loader-spinner';
function Loading(loaded) {
    return loaded && (
      <div className="loading">
        <ThreeDots color="#2BAD60" height="100" width="100" />
      </div>
    );
  }

export default Loading  