# Catalogue transfer — 11 October 2026

Source: https://www.olympialed.com/. Target: https://raystream.hk/. The public interface is English.

## Coverage

| Category | Published cards |
| --- | ---: |
| Silicone linear flex | 18 |
| PVC linear flex | 3 |
| Flexible video lighting | 2 |
| Wall grazers | 5 |
| Connectors | 3 |
| Mounting channels | 12 |
| Control & power | 171 |
| **Total** | **214** |

The source has 219 visible catalogue entries. Five repeated control model entries are consolidated into existing model pages. The migration map retains every source entry. MR-A28D has inconsistent 100–240V / 110–240V input values in two source placements; both are preserved as separate source configurations for confirmation. New Products is a 12-model collection, not an additional equipment category.

`migration-map.json` maps source URLs/embedded entries to local routes. `asset-registry.json` records the exact source image, validated inline image content type, local asset and responsive version, checksum, usage and branding review. All listed HTML product pages were accessible during transfer. Control entries are published inside one HTML page and now have their own URLs.

## Specifications and limits

The catalogue preserves 3,804 HTML table rows after consolidation, including row/column spans expanded to an explicit matrix. Tables belong to their original model and configuration. Source units, identifiers and values are retained; questionable values such as SF24 `788llm` and `839m` have not been silently corrected. They require confirmation before final specification. Product family pages can contain many configurations; an individual configuration does not describe every product in that family.

Connector and mounting category pages publish most details as images. Their clean original product images are retained. An additional 348 published connector/profile/bracket blocks inside 28 equipment-family HTML pages retain their titles, descriptions, group labels and associated photographs. These provide source-backed family accessory relationships. Four SF06 accessory image URLs returned 404; their published text is retained without a substitute photo (see `unavailable-images.json`). No dimensions, compatible model numbers, prices, availability, lead times or warranty promises have been inferred. Mounting titles describe material/function visible in the source image; the internal numerical slug is a catalogue group identifier, not a manufacturer's model code. Ask Raystream for the final accessory selection.

## Images and branding

495 distinct original images plus 600px alternatives are used: 260 principal catalogue/application images and 235 family accessory photographs/technical illustrations. Exact duplicate sources share one local file. Real equipment geometry and technical markings are preserved. Source photographs without an Olympia wordmark were selected and reviewed in contact sheets, with individual checks of the main images. Certification/marketing icon collages were removed. Integral manufacturer model/technical labels on controllers and drivers remain original; the website does not imply Raystream manufactured that equipment. No source image hotlinks or source-site navigation are used in the public interface.

RAYSTREAM remains the existing typographic wordmark from the repository. No invented symbol is represented as an original brand logo. The architectural photograph is lighting application imagery, not a claim that Raystream delivered the photographed project.

## Exclusions

No PDF, Office files, archives, CAD, IES/LDT or other downloadable documents were fetched, parsed or copied. Fetches were limited to catalogue HTML and selected inline raster images; image downloads checked final response type and rejected attachment responses. Download buttons and source-side analytics/forms are excluded. Olympia company history, manufacturing claims, awards, certificates, address/phone/social accounts, project attribution, news and events are excluded. The project documentation itself is newly authored working documentation.
