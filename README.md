# sparkfun.github.io

This repo creates the GitHub pages custom domain `docs.sparkfun.com` and landing page that lists out all SparkFun GitHub product repos that have github pages documentation.

The list of available pages is created automatically by a GitHub Action that runs nightly. This GitHub actions searches for repos under the spakfun organization that have the topic `sparkfun-tutorial`.

For a repo to be added to the list of documents, the following should be true in the About section of the repo:

* The repo has the topic `sparkfun-tutorial`
* The `website` section for the repo points to the GitHub Pages URL for that repo (check the provided option when editing the about page).
* The value of the description is provided

### How this works

* Daily, or on a check in, the update action runs
* The Action using thg `gh` command to search for all public sparkfun respositories that have the topic `sparkfun-tutorial`
* For each repositoriy found, the repo URL, About website and About description are retrieved
* The results of the query are writting to the file `gsg.json` as an array of json objects.
* The updated `gsg.json` file is checkin to this repo and the landing page is rebuilt (automtically by GitHub)
* When the file `index.html` is loaded by a browser (for the landing page), it reads the file `gsg.json` and renders the documentation list table using javascript

  
