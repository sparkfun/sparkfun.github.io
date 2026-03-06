#!/usr/bin/python3

import json
import os
import logging
import requests
import re
import sys
from urllib.parse import urlparse
import time

import argparse

# token for github API access - you can create one here: https://github.com/settings/tokens
# on startup, load, look in the envi
_GH_PAT = os.environ.get("SFE_DOCS_PAT")


# from PIL import Image

# Setup simple logging
logger = logging.getLogger(__name__)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)

formatter = logging.Formatter("%(levelname)s: %(message)s")
handler.setFormatter(formatter)

logger.addHandler(handler)
logger.setLevel(logging.INFO)


def set_pat_token(token):
    global _GH_PAT
    _GH_PAT = token


def get_gh_repo_topics(owner, repo_name):

    if _GH_PAT is None:
        logger.error(
            "GitHub PAT token is not set. Please set it using set_pat_token() function."
        )
        return []

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {_GH_PAT}",
    }
    topic_url = f"https://api.github.com/repos/{owner}/{repo_name}/topics"
    try:
        response = requests.get(topic_url, headers=headers)

        if response.status_code != 200:
            logger.error(f"Topic Fetch: {topic_url}.  Error:{response.status_code}")
            return []
    except Exception as e:
        logger.error(f"Topic Fetch: {topic_url}.  Exception: {e}")
        return []
    return response.json()["names"]


def fetch_gh_social_image(repo_url, output_filename):

    if _GH_PAT is None:
        logger.error(
            "GitHub PAT token is not set. Please set it using set_pat_token() function."
        )
        return False

    # 1. Fetch the repository HTML page
    # We need a user-agent so GitHub doesn't block the script
    headers = {"User-Agent": "Mozilla/5.0", "Authorization": f"Bearer {_GH_PAT}"}
    try:
        response = requests.get(repo_url, headers=headers)
    except Exception as e:
        logger.error(f"Failed to fetch the repository page: {repo_url}. Exception: {e}")
        return False

    if response.status_code == 200:
        # 2. Use Regex to find the Open Graph image tag
        # Looking for: <meta property="og:image" content="THE_URL_HERE" />
        match = re.search(r'<meta property="og:image" content="([^"]+)"', response.text)

        if match:

            image_url = match.group(1)

            # 3. Download the image - a "Too many requests" can happen here, so check for the
            # error and do a couple of retries with a delay if it does.

            try:
                valid = False
                N_TRIES = 5
                N_SLEEP = 4
                i = 0
                img_data = None
                while i < N_TRIES:
                    img_response = requests.get(image_url, headers=headers)
                    if img_response.status_code == 200:
                        if img_response.content.isascii() == False:
                            valid = True
                            img_data = img_response.content
                            break
                    else:
                        logger.warning(f"Received {img_response.status_code}")

                    time.sleep(N_SLEEP)
                    i += 1

                if not valid or img_data is None:
                    return False

                # write out the image data
                with open(output_filename, "wb") as handler:
                    handler.write(img_data)

            except Exception as e:
                logger.error(f"Failed to download image from {image_url}: {e}")
                return False

            # if we want to crop the image to remove Github text, do the following
            # img = Image.open(output_filename)
            # newimg = img.crop(0,0,img.width, img.height-160)
            # newimg.save(output_filename)
        else:
            logger.error("Unable to file social image for repo: %s", repo_url)
            return False
    else:
        logger.error(
            f"Failed to fetch the repository page. Status code: {response.status_code}"
        )
        return False
    return True


def make_image_filename(repo_name):
    # Sanitize the repo name to create a valid filename
    tmp_name = re.sub(r"[^\w\-]", "-", repo_name).lower()
    return f"gh_banner_{tmp_name}.png"


def load_doc_json_file(filename):
    """
    Returns the JSON
    """

    # is the file there
    if os.path.exists(filename) == False:
        logger.error("JSON input file not found: %s", filename)
        return None

    data = None
    try:
        with open(filename, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        logger.error("File not found.")
    except PermissionError:
        logger.error("You don't have permission to read this file - %s", filename)
    except OSError as e:
        logger.error(f"{e}")
    return data


def write_doc_json_file(filename, data):
    """
    Writes the JSON data to a file
    """

    try:
        with open(filename, "w") as f:
            json.dump(data, f, indent=4)
    except PermissionError:
        logger.error("You don't have permission to write to this file - %s", filename)
        return False
    except OSError as e:
        logger.error(f"{e}")
        return False
    return True


# ----------------------------------------
# Change repo name to something human readable -
#   - '_' to ' '
#   - add spaces around dashes if they are not there
#
# Returns the number of records processed.


def fix_repo_name(repo_list):

    if len(repo_list) == 0:
        return 0

    n_fixed = 0

    for repo in repo_list:
        if "name" not in repo:
            continue

        # for our "core repos - internal things that are named sfe-##-##', change those"
        if repo["name"].startswith("sfe-"):
            repo["name"] = repo["name"].replace("-", " ")
        #  replace _ with space
        repo["name"] = repo["name"].replace("_", " ")
        # break Sensor-### to Sensor ###
        repo["name"] = re.sub(r"(?<=Sensor)-", " ", repo["name"])

        n_fixed += 1

    return n_fixed


# ----------------------------------------
# get our social images for the repos


def get_social_images_for_repos(repo_list, dest_path, resource_dir="", skip=True):

    if len(repo_list) == 0:
        logger.error("Repo list is empty, nothing to process")
        return False

    if _GH_PAT is None:
        logger.error(
            "GitHub PAT token is not set. Please set it using set_pat_token() function."
        )
        return False

    if resource_dir != "":
        file_dir = resource_dir
        if file_dir.endswith(os.sep) == False and dest_path.startswith(os.sep) == False:
            file_dir = file_dir + os.sep
        file_dir = file_dir + dest_path
    else:
        file_dir = dest_path

    # dir exists?
    if os.path.exists(file_dir) == False:
        logger.info(f"Destination directory {file_dir} does not exist, creating it.")
        try:
            os.makedirs(file_dir)
        except OSError as e:
            logger.error(f"Failed to create directory {file_dir}: {e}")
            return False

    for repo in repo_list:

        repo_name = repo["name"]
        output_file = make_image_filename(repo_name)
        # path and file used for url
        repo["preview"] = dest_path + "/" + output_file

        # output filename to save the image to
        output_filename = os.path.join(file_dir, output_file)

        # output file already exists, skip if we are skipping
        if skip and os.path.exists(output_filename):
            print(".", end="")
            continue

        success = fetch_gh_social_image(repo["url"], output_filename)
        if not success:
            logger.error(f"Failed to fetch social image for repo: {repo_name}")
        else:
            print(f"\t {repo_name}")

    return True


# ----------------------------------------
# Get the topics for each repo


def get_topics_for_repos(repo_list, valid_topics=[]):

    if _GH_PAT is None:
        logger.error(
            "GitHub PAT token is not set. Please set it using set_pat_token() function."
        )
        return 0

    n_found = 0
    if len(repo_list) == 0:
        logger.error("Repo list is empty, nothing to process")
        return n_found

    for repo in repo_list:
        # split the URL into components and get the owner and repo name - the URL is in the format
        split_url = urlparse(repo["url"]).path.split("/")
        all_topics = get_gh_repo_topics(split_url[1], split_url[-1])
        topics = (
            all_topics
            if len(valid_topics) == 0
            else list(set(all_topics) & set(valid_topics))
        )
        if len(topics) > 0:
            repo["topics"] = topics
            n_found += 1

        print(".", end="")

    return n_found


# ----------------------------------------
# create a sitemap file for the repos


def create_sitemap_file(repo_list, output_filename):

    if len(repo_list) == 0:
        logger.error("Repo list is empty, nothing to process")
        return False

    try:
        with open(output_filename, "w") as f:
            f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

            for repo in repo_list:
                if "url" in repo:
                    f.write("  <url>\n")
                    f.write(f"    <loc>{repo['url']}</loc>\n")
                    if "updatedAt" in repo:
                        f.write(f"    <lastmod>{repo['updatedAt']}</lastmod>\n")
                    f.write("  </url>\n")

            f.write("</urlset>")

    except PermissionError:
        logger.error(
            "You don't have permission to write to this file - %s", output_filename
        )
        return False
    except OSError as e:
        logger.error(f"{e}")
        return False
    return True


# --------------------------------------------------------------------
def process_repos(args):

    # Load the input JSON file
    repo_data = load_doc_json_file(args.input_file)
    if repo_data is None:
        logger.error("Failed to load input JSON file. Exiting: %s", args.input_file)
        return False
    else:
        logger.info(
            "Loaded %d repos from input file: %s", len(repo_data), args.input_file
        )

    # fix the names of the repos (make them human readable)
    fix_repo_name(repo_data)

    logger.info("Fetching social images for repos...")
    if not get_social_images_for_repos(
        repo_data, args.images_dir, args.resource_dir, args.skip_images
    ):
        logger.error("Failed to fetch social images for repos. Exiting.")
        return False
    else:
        logger.info(
            "Fetched social images for repos. %d repos had images found.",
            len(repo_data),
        )
    # load the tag files
    valid_topics = []
    if args.tags_file is not None:
        try:
            with open(args.tags_file, "r") as f:
                data = json.load(f)
                valid_topics = list(data.keys())
        except Exception as e:
            logger.error("Failed to load tags file. Exiting: %s", args.tags_file)
            return False

        logger.info(
            "Loaded %d valid topics from tags file: %s",
            len(valid_topics),
            args.tags_file,
        )

    logger.info("Fetching topics for repos...")
    n_topics = get_topics_for_repos(repo_data, valid_topics)
    if n_topics == 0:
        logger.error("Failed to fetch topics for repos. Exiting.")
        return False
    else:
        logger.info("Fetched topics for repos. %d repos had topics found.", n_topics)

    # Save the updated repo data to the output JSON file
    if not write_doc_json_file(args.output_file, repo_data):
        logger.error("Failed to write output JSON file. Exiting.")
        return False
    else:
        logger.info("Updated repo information saved to %s", args.output_file)

    # sitemap?
    if args.create_sitemap:
        sitemap_filename = args.site_dest + os.sep + "sitemap.xml"
        if not create_sitemap_file(repo_data, sitemap_filename):
            logger.error("Failed to create sitemap file. Exiting.")
            return False
        else:
            logger.info("Sitemap file created: %s", sitemap_filename)
    return True


# --------------------------------------------------------------------
# cli / main entry to run this as a stand alone script

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Fetch GitHub repo info for docs")
    parser.add_argument(
        "input_file", help="Path to the input JSON file containing repo information"
    )
    parser.add_argument(
        "output_file",
        help="Path to the output JSON file to save updated repo information",
    )

    parser.add_argument(
        "-t",
        "--tags-file",
        default=None,
        help="Path to a JSON file containing valid topics/tags (optional)",
    )

    parser.add_argument(
        "-i",
        "--images-dir",
        default="/img/sparkfun",
        help="Directory to save fetched social images (default: img/sparkfun)",
    )

    parser.add_argument(
        "--resource-dir",
        default="static",
        help="Resource directory to prepend to image paths (default: 'static')",
    )
    parser.add_argument(
        "--skip-images",
        action="store_true",
        default=False,
        help="Skip fetching social images if they already exist in the destination directory",
    )
    parser.add_argument(
        "--create-sitemap",
        action="store_true",
        help="Create a sitemap.xml file for the repos",
    )
    parser.add_argument(
        "--site-dest",
        default=".",
        help="Destination directory for sitemap.xml (default: current directory)",
    )
    args = parser.parse_args()

    if not process_repos(args):
        logger.error("Processing failed. Exiting.")
        sys.exit(1)
    logger.info(
        "Processing complete. Updated repo information saved to %s", args.output_file
    )
