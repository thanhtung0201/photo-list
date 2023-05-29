import { useEffect, useCallback, useRef } from 'react';
import sleep from "sleep-promise";


// make API calls and pass the returned data via dispatch
export const useFetch = (data, dispatch) => {
  useEffect(() => {
    dispatch({ type: 'FETCHING_IMAGES', fetching: true })
    fetch(`https://jsonplaceholder.typicode.com/photos?_start=${data.page}&_limit=12`)
      .then(data => data.json())
      .then(sleep(500))
      .then(images => {
        dispatch({ type: 'STACK_IMAGES', images })
        dispatch({ type: 'FETCHING_IMAGES', fetching: false })
      })
      .catch(e => {
        // handle error
        dispatch({ type: 'FETCHING_IMAGES', fetching: false })
        return e;
      })
  }, [dispatch, data.page])
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    })
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items])
}