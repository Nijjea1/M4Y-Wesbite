"""
Remove outer white padding from logo PNGs: trim tight bbox and make
edge-connected near-white background transparent (flood-fill from edges).
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

# Try these in order: (match if R,G,B all >= threshold)
WHITE_THRESH = 245


def is_whiteish(r: int, g: int, b: int, t: int) -> bool:
    return r >= t and g >= t and b >= t


def flood_transparent_edge_whites(img: Image.Image, thresh: int) -> Image.Image:
    """Set edge-reachable near-white pixels to transparent (keeps interior whites)."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()
    keep = [[True] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def try_add(x: int, y: int) -> None:
        if not (0 <= x < w and 0 <= y < h) or not keep[y][x]:
            return
        r, g, b, a = pixels[x, y]
        if a < 8:
            return
        if not is_whiteish(r, g, b, thresh):
            return
        keep[y][x] = False
        q.append((x, y))

    for x in range(w):
        try_add(x, 0)
        try_add(x, h - 1)
    for y in range(h):
        try_add(0, y)
        try_add(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and keep[ny][nx]:
                r, g, b, a = pixels[nx, ny]
                if a < 8:
                    continue
                if is_whiteish(r, g, b, thresh):
                    keep[ny][nx] = False
                    q.append((nx, ny))

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out_pixels = out.load()
    for y in range(h):
        for x in range(w):
            # False = edge-connected white (background); True = logo pixels (incl. interior white)
            if keep[y][x]:
                out_pixels[x, y] = pixels[x, y]
            else:
                out_pixels[x, y] = (0, 0, 0, 0)
    return out


def trim_alpha_bbox(img: Image.Image) -> Image.Image:
    """Crop to bounding box of non-transparent pixels."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    alpha = img.split()[-1]
    bbox = alpha.getbbox()
    if bbox is None:
        return img
    return img.crop(bbox)


def process_logo(path: Path) -> None:
    original = Image.open(path)
    worked = flood_transparent_edge_whites(original, WHITE_THRESH)
    worked = trim_alpha_bbox(worked)
    worked.save(path, format="PNG", optimize=True)
    print(f"OK  {path.name}  ->  {worked.size}")


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    assets = root / "assets"
    targets = [assets / "medicine4youth-logo.png"]
    branch_dir = assets / "branch-logos"
    if branch_dir.is_dir():
        targets.extend(sorted(branch_dir.glob("*.png")))

    for p in targets:
        if not p.is_file():
            print(f"SKIP (missing): {p}", file=sys.stderr)
            continue
        process_logo(p)


if __name__ == "__main__":
    main()
