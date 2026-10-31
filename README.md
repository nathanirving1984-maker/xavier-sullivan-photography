# Xavier Sullivan Photography

Portfolio site for Xavier Sullivan, real estate photographer serving Novato and Marin County. Static HTML/CSS/JS, hosted on GitHub Pages.

## Adding photos

```
images/
  hero.jpg          # wide landscape, the homepage hero
  xavier.jpg        # portrait for the About section (4:5)
  og-cover.jpg      # 1200x630 link-preview image
  property-1/01.jpg, 02.jpg, ...   (+ thumbs/ at 1000px for the grid)
  property-2/01.jpg, 02.jpg, ...
```

Then edit the `PROPERTIES` list at the top of `script.js` (title, location, folder, photo count). Photo 01 is the large lead tile, so make it the strongest shot.

Keep each JPG around 2400px on the long edge and under ~600 KB so the site loads fast.

## Deploy

Settings → Pages → Branch: `main` / root.
