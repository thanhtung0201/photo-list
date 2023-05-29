import './index.css';
import React, { useReducer, useRef } from 'react';

import { useFetch, useInfiniteScroll, useLazyLoading } from './hook/hooks'
import {pageReducer, imgReducer} from './hook/reducer'
import './index.css';
import PhotoList from './component/PhotoList';
import Header from './component/Header';
import Footer from './component/Footer';
import Loading from './component/Loading';

function App() {


  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })
  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div>
      {Header()}
      {PhotoList(imgData)}
      {Loading(imgData.fetching)}
      {Footer(bottomBoundaryRef)}
    </div>
  );
}

export default App;


