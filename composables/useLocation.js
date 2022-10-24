export const useLocation = () => {
    const { errorPopup } = usePopup();
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      
    const errorHandler = (error)=> {
            let err;
            switch(error.code) {
                case error.PERMISSION_DENIED:
                  err = "PERMISSION_DENIED";
                  break;
                case error.POSITION_UNAVAILABLE:
                  err = "POSITION_UNAVAILABLE";
                  break;
                case error.TIMEOUT:
                  err = "TIMEOUT";
                  break;
                case error.UNKNOWN_ERROR:
                  err = "UNKNOWN_ERROR";
                  break;
              }
        return err;
    }
      
      const getLocation = async () => {
        return new Promise((resolve,reject)=> {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((position)=> resolve(position),(err)=> reject(errorHandler(err)) ,options);
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
      }

      return {
        getLocation,
      }
}