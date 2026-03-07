# sparkfun.github.io

This repo creates the GitHub pages custom domain [docs.sparkfun.com](https://docs.sparkfun.com) and landing page that lists out all SparkFun GitHub product repos that have github pages documentation.

The list of available pages is created automatically by a GitHub Action that runs every two nights. This GitHub actions searches for repos under the spakfun organization that have the topic `sparkfun-tutorial`.

For a repo to be added to the list of documents, the following should be true in the About section of the repo:

* The repo has the topic `sparkfun-tutorial`
* The `website` section for the repo points to the GitHub Pages URL for that repo (check the provided option when editing the about page).
* The value of the description is provided
* The topics of the repo should include one of the tags used to organize the documentation sites. These tags are listed [here](src/data/sfe_tags.json)
* The documentation site should have a Social Image added. This is used to create the thumbnails of the site in the overall listing cards page

### How this works

* Every two days the update action runs
* The Action using thg `gh` command to search for all public sparkfun respositories that have the topic `sparkfun-tutorial`
* For each repositoriy found, the repo URL, About website and About description are retrieved
* The results of the query are writting to the file `sfe_raw.json` as an array of json objects.
* The python script ```sfe_repo_info.py``` is called to process this raw data into something that the underlying Docusaurus build system can use. Specific steps performed:
  * Retrieve the social image for each repo and place in `static/img/sparkfun`
  * Add the image link to the repos json object/data
  * Load the tag data from [src/data/sfe_tags.json](src/data/sfe_tags.json)
  * For each repo, request its list of topics using the GitHub API, validate the topics from those loaded in the previous steps, and add the array of topics to the repos json object
  * Generate a sitemap for the repos listed (this is used by the search indexer Algolia)
* Check in the created data files
* Build the site using Docusaurus
* Deploy to github pages.

### Notes

* The search engine used in Algolia - it indexes the generated site and all sites contained in the `sitemap.xml` file
* Sometimes, a repos social image retrieval can fail to download. In this case, they might need to be added manually.
* If you update a social image, delete the old one from this repo and run the build script. If an image already exists, the processing python script will *skip* getting the new image
