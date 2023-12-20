# MDS-uglydockerfile

The goal to this project is to show what is an horible Dockerfile. 



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run the Docker File 

```
docker build -t horribledocker:1.0.0 .
docker run -p 8000:80 horribledocker:1.0.0

```

Then Go to `http://localhost:8000/` 
