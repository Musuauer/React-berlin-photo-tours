# Berlin Photo-tours, a React Google Map

This is the final project for the Front-End Nano degree of Udacity, done under a Google scholarship.

The web app displays a Google map with the possible locations for a Photo-tour in Berlin.

The user can choose from a series of places where the workshop can take place. If a location name or marker is clicked, additional information of the place is displayed inside an Info Window. Some facts are fetched from the Wikipedia API and a collection of images from that place are drawn from the Flickr API.
To make things easier, the locations can be filtered via a search box.

The project was made with React, the Google Maps API, the Wikipedia API and the Flickr API.
I used 'react-google-maps' as a starting base for the integration of React and Google Maps.

### To install

1. Clone or download this repo
2. Install the dependencies:

    ```sh
    $ npm install
    ```
3. Start the server:
    ```sh
    $ npm start
    ```
4. Open http://localhost:3000 to view it in the browser.

Or: To build the app for production to the build folder:

  ```sh
    $ npm run build
  ```

It correctly bundles React in production mode and optimizes the build for the best performance.
By default, the create-react-app includes a service worker in the production build.


Credits
----
* Info text from [MediaWikiAPI](https://www.mediawiki.org/wiki/API:Main_page)
* Images from [Flickr API](https://www.flickr.com/services/api/flickr.photos.search.html)
* Project made with React and bootstraped from [create-react-app](https://github.com/facebook/create-react-app)

License
----

MIT
