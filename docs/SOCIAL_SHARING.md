# Social sharing

Every page emits Open Graph and Twitter Card metadata from `src/components/SEO`,
and article pages (`src/templates/newTemplate.js`) render share buttons from
`src/components/SocialShare.js` for Facebook, WhatsApp, X, Telegram and copy link.

## What made Facebook previews wrong before

Facebook keys its link cache on the exact `og:url` it finds on the page and
re-fetches that URL. Three things on this site produced URLs the crawler did not
treat as the page being shared:

1. `siteUrl` ends with `/` and every path starts with `/`, so `og:url` and
   `og:image` were emitted as `https://www.radiokashana.org//noticias/...` and
   `https://www.radiokashana.org//img/...`.
2. Article slugs contain accents and curly quotes. They were emitted raw instead
   of percent-encoded, so `og:url` did not match the URL a browser actually
   requests.
3. No `og:image:width` / `og:image:height`. Without them Facebook downloads the
   image asynchronously after the first scrape, so the first share of any
   article shows no image and that empty preview gets cached.

`src/utils/urlUtils.js` now builds every absolute URL (trim slashes, percent
encode once), and `gatsby-node.js` measures each frontmatter image with sharp at
build time so the tags carry real dimensions.

## Verifying after a deploy

1. Open https://developers.facebook.com/tools/debug/ and paste an article URL.
2. Click **Scrape Again**. Facebook only refreshes a cached link when asked, so
   any article shared before this fix keeps its old preview until this is done
   once per URL. New articles are fine on their first share.
3. The response should show `og:url` identical to the URL you pasted, one
   `og:image` with width and height, and no "Missing Properties" warnings.

To refresh many URLs at once, a Graph API call per URL does the same thing:

```
curl -X POST "https://graph.facebook.com/?id=<ARTICLE_URL>&scrape=true&access_token=<TOKEN>"
```

Other validators: https://cards-dev.twitter.com/validator for X and
https://www.linkedin.com/post-inspector/ for LinkedIn. WhatsApp and Telegram
read the same Open Graph tags and have no cache tool; sending the link in a new
chat is enough.

## Images

Use a landscape image of at least 1200×630 for the best preview. Facebook rejects
images over 8 MB and ignores images under 200×200.
