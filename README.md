# DNF-music-gen
DeepNeuro Feedback Music Generator

## Get Started
- start server: `python3 server.py`

- [setup](https://www.youtube.com/watch?v=YW8VG_U-m48&t=352s)
- `npx create-react-app my-app`
- `git add .; git commit ` before eject
- `sudo npm run eject`

## Usage 
- In Frontend `react-front`, `npm run build` 
- In Backend `flask-back`, `python3 main.py` 


## External Libraries
- [Slider](https://github.com/react-component/slider)

## Useful
### Github
- [Ignore files in past commits](https://stackoverflow.com/questions/7527982/applying-gitignore-to-committed-files)
    - `git ls-files -ci --exclude-standard`, `git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached`

## TODOs
* [ ] switch to 16d-latent-space model
* [ ] show current value of each slider
* [ ] make only one axis label for all sliders
