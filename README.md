# DNF-music-gen
DeepNeuro Feedback Music Generator

## User Guide
## Setup 
- In Frontend `cd react-front`
    - `npm install`
    - `npm run build` 
- In Backend `cd flask-back`
    - `python3 main.py` 
    - then access from browser via `http://127.0.0.1:5000/`

## External Libraries
- [Slider](https://github.com/react-component/slider)

## Useful
### Github
- [Ignore files in past commits](https://stackoverflow.com/questions/7527982/applying-gitignore-to-committed-files)
    - `git ls-files -ci --exclude-standard`, `git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached`


## Developer Guide
### Project Setup (Developer Only)
- start server: `python3 server.py`
- [setup](https://www.youtube.com/watch?v=YW8VG_U-m48&t=352s)
- `npx create-react-app my-app`
- `git add .; git commit ` before eject
- `sudo npm run eject`

### TODOs
* [ ] switch to 16d-latent-space model
* [ ] show current value of each slider
* [ ] make only one axis label for all sliders
