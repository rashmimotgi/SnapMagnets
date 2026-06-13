# SnapnStick — Magnetize Your Memories

Marketing website for **SnapnStick**, custom photo magnets handcrafted in Hubli, India.
Elegant editorial design (cream + charcoal + champagne gold), WhatsApp-first ordering,
fully responsive with tasteful scroll animations.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site (single page) |
| `styles.css` | Custom styles & animations |
| `script.js` | Navbar, mobile menu, scroll reveal, gallery lightbox |
| `img/` | Logos + sample photos used by the site |
| `Assets/` | Original source files (logos, raw photos) |

## View it locally

Just open `index.html` in any browser, or run a tiny local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Add your real sample photos

1. Drop your photos into the `img/` folder (e.g. `img/sample-2.jpeg`, `img/sample-3.jpeg`).
2. In `index.html`, find the **Samples** section.
3. Replace a placeholder block like this:

   ```html
   <figure data-reveal class="ph-item aspect-square"><span class="font-display italic">Wedding</span><small>add photo</small></figure>
   ```

   with a real gallery item:

   ```html
   <figure data-reveal class="gallery-item group cursor-pointer" data-full="img/sample-2.jpeg" data-caption="Wedding magnet">
     <div class="relative overflow-hidden rounded-3xl bg-white p-2.5 shadow-lg ring-1 ring-ink/5 h-full">
       <img src="img/sample-2.jpeg" alt="Custom wedding photo magnet" class="rounded-2xl w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
       <figcaption class="gallery-cap">Wedding magnet</figcaption>
     </div>
   </figure>
   ```

   The `data-full` photo opens in the lightbox when clicked.

## Contact details (already wired in)

- **WhatsApp:** +91 96118 96903 → `https://wa.me/919611896903` (buttons open a pre-filled message)
- **Instagram:** [@SNAPNSTICK4294](https://instagram.com/SNAPNSTICK4294)
- **Email:** Snapnstick4294@gmail.com

To change any of these, search the file for `919611896903`, `SNAPNSTICK4294`, or the email.

## Notes

- Tailwind is loaded via the Play CDN for simplicity. For a production build you can
  compile Tailwind to a static CSS file to drop the runtime dependency and console notice.
- Animations respect `prefers-reduced-motion`.
