# cctvwatch

Map application that displays CCTV cameras and lets you upload new ones using the [cctvwatch-api](https://github.com/moklick/cctvwatch-api). 

## Installation 
``` 
git clone https://github.com/moklick/cctvwatch.git
cd cctvwatch
npm install
```

## Build
- Dev:
Gulp will also create a **proxy** in order to proxify all backend/API ressources locally. 
Responses will be cached under ```/cache```, edit them and have fun programming **backend-free**.
``` 
gulp
```

- Release:
``` 
gulp release
```

- Deploy:
This task will rsync the ```dist/``` folder to the [production server](http://cctv.antares.uberspace.de/).
You obliviously need production-keys in order to accomplish that.
``` 
gulp deploy
```

### Requirements
*	node.js
*	npm
