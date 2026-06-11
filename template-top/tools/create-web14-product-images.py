from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = Path(r"C:\Users\81903\Desktop\website\web-site-temp\web14\_product-images")
W = H = 1200

COLORS = {
    "bg": "#fff5d1",
    "paper": "#fffdf2",
    "ink": "#302650",
    "muted": "#70628b",
    "primary": "#ed6040",
    "accent": "#1f9c8e",
    "soft": "#ffd7a3",
    "deep": "#302060",
    "line": "#efb76a",
    "dark": "#101119",
    "white": "#ffffff",
}

THEMES = [
    ("Cool", "#267f92", "#d9edf4"),
    ("Dark", "#d5a54f", "#101119"),
    ("Girly", "#d76189", "#ffe2ed"),
    ("Minimal", "#33342e", "#f7f5ef"),
    ("RetroPop", "#ed6040", "#fff5d1"),
]


def font(size, bold=False, serif=False):
    candidates = []
    if serif:
        candidates += [
            r"C:\Windows\Fonts\georgiab.ttf" if bold else r"C:\Windows\Fonts\georgia.ttf",
            r"C:\Windows\Fonts\timesbd.ttf" if bold else r"C:\Windows\Fonts\times.ttf",
        ]
    candidates += [
        r"C:\Windows\Fonts\YuGothB.ttc" if bold else r"C:\Windows\Fonts\YuGothR.ttc",
        r"C:\Windows\Fonts\meiryob.ttc" if bold else r"C:\Windows\Fonts\meiryo.ttc",
        r"C:\Windows\Fonts\msgothic.ttc",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except Exception:
            pass
    return ImageFont.load_default()


F = {
    "title": font(86, True, True),
    "title_jp": font(76, True),
    "h2": font(54, True),
    "h3": font(34, True),
    "body": font(28),
    "small": font(22),
    "label": font(20, True),
    "num": font(72, True, True),
}


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def new_canvas(bg=None):
    bg = bg or COLORS["bg"]
    img = Image.new("RGB", (W, H), bg)
    draw = ImageDraw.Draw(img)
    return img, draw


def shadow_box(img, xy, radius=28, fill=None, outline=None, width=2, shadow=True):
    fill = fill or COLORS["paper"]
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    if shadow:
        sx1, sy1, sx2, sy2 = xy
        ld.rounded_rectangle((sx1 + 14, sy1 + 18, sx2 + 14, sy2 + 18), radius, fill=(40, 25, 80, 34))
        layer = layer.filter(ImageFilter.GaussianBlur(18))
        img.alpha_composite(layer) if img.mode == "RGBA" else None
    d = ImageDraw.Draw(img)
    d.rounded_rectangle(xy, radius, fill=fill, outline=outline or COLORS["line"], width=width)


def draw_card(draw, xy, radius=24, fill=None, outline=None, width=3):
    draw.rounded_rectangle(xy, radius, fill=fill or COLORS["paper"], outline=outline or COLORS["line"], width=width)


def wrap_text(draw, text, font_obj, max_width):
    lines = []
    current = ""
    for block in text.split("\n"):
        if not block:
            lines.append("")
            continue
        for char in block:
            test = current + char
            if draw.textlength(test, font=font_obj) <= max_width:
                current = test
            else:
                if current:
                    lines.append(current)
                current = char
        if current:
            lines.append(current)
            current = ""
    return lines


def text(draw, xy, body, font_obj, fill=None, max_width=None, line_gap=10, anchor=None):
    fill = fill or COLORS["ink"]
    x, y = xy
    if max_width:
        lines = wrap_text(draw, body, font_obj, max_width)
        for line in lines:
            draw.text((x, y), line, font=font_obj, fill=fill, anchor=anchor)
            bbox = draw.textbbox((x, y), line, font=font_obj, anchor=anchor)
            y += (bbox[3] - bbox[1]) + line_gap
        return y
    draw.text((x, y), body, font=font_obj, fill=fill, anchor=anchor)
    bbox = draw.textbbox((x, y), body, font=font_obj, anchor=anchor)
    return bbox[3]


def label(draw, xy, body, fill=None, bg=None):
    x, y = xy
    fill = fill or COLORS["primary"]
    bg = bg or COLORS["paper"]
    pad_x, pad_y = 18, 8
    bbox = draw.textbbox((x, y), body, font=F["label"])
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.rounded_rectangle((x, y, x + w + pad_x * 2, y + h + pad_y * 2), 999, fill=bg, outline=fill, width=2)
    draw.text((x + pad_x, y + pad_y - 2), body, font=F["label"], fill=fill)


def browser_mock(draw, xy, size=(760, 500), theme=THEMES[-1], title="Mika Channel"):
    x, y = xy
    w, h = size
    primary, bg = theme[1], theme[2]
    draw.rounded_rectangle((x, y, x + w, y + h), 22, fill=COLORS["paper"], outline=COLORS["ink"], width=4)
    draw.rectangle((x, y + 56, x + w, y + 60), fill=COLORS["ink"])
    for i, c in enumerate([COLORS["primary"], COLORS["accent"], COLORS["line"]]):
        draw.ellipse((x + 28 + i * 34, y + 20, x + 48 + i * 34, y + 40), fill=c)
    draw.rectangle((x + 34, y + 92, x + w - 34, y + h - 34), fill=bg, outline=COLORS["line"], width=2)
    compact = w < 620
    draw.text((x + 62, y + 118), "Mika" if compact else title, font=F["h3"], fill=COLORS["ink"])
    headline_font = font(28 if compact else 38, True, True)
    draw.text((x + 62, y + 168), "Hub" if compact else "Virtual channel hub.", font=headline_font, fill=COLORS["ink"])
    draw.rounded_rectangle((x + 62, y + 290, x + 270, y + 340), 999, fill=COLORS["ink"])
    draw.text((x + 92, y + 303), "YouTube", font=F["label"], fill=COLORS["paper"])
    draw.rounded_rectangle((x + w - 250, y + 130, x + w - 72, y + 308), 28, fill=primary, outline=COLORS["ink"], width=3)
    draw.rounded_rectangle((x + w - 222, y + 170, x + w - 100, y + 202), 12, fill=COLORS["paper"])
    draw.rounded_rectangle((x + w - 222, y + 222, x + w - 130, y + 254), 12, fill=COLORS["soft"])
    for n in range(3):
        cx = x + 70 + n * 180
        draw.rounded_rectangle((cx, y + 380, cx + 140, y + 452), 18, fill=COLORS["paper"], outline=COLORS["line"], width=2)


def phone_mock(draw, xy, size=(260, 520), theme=THEMES[-1]):
    x, y = xy
    w, h = size
    primary, bg = theme[1], theme[2]
    draw.rounded_rectangle((x, y, x + w, y + h), 34, fill=COLORS["ink"], outline=COLORS["ink"], width=4)
    draw.rounded_rectangle((x + 14, y + 18, x + w - 14, y + h - 18), 24, fill=bg)
    draw.rounded_rectangle((x + 72, y + 32, x + w - 72, y + 42), 999, fill=COLORS["ink"])
    draw.text((x + 34, y + 72), "Mika", font=F["h3"], fill=COLORS["ink"])
    draw.rounded_rectangle((x + 42, y + 148, x + w - 42, y + 300), 28, fill=primary, outline=COLORS["ink"], width=2)
    draw.rounded_rectangle((x + 42, y + 340, x + w - 42, y + 388), 999, fill=COLORS["ink"])
    draw.text((x + 88, y + 351), "Watch", font=F["label"], fill=COLORS["paper"])
    for n in range(2):
        draw.rounded_rectangle((x + 42, y + 414 + n * 48, x + w - 42, y + 446 + n * 48), 12, fill=COLORS["paper"], outline=COLORS["line"], width=2)


def save(img, name):
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / name, quality=95)


def cover():
    img, d = new_canvas(COLORS["bg"])
    d.rectangle((0, 0, W, 112), fill=COLORS["deep"])
    d.rectangle((0, H - 112, W, H), fill=COLORS["soft"])
    label(d, (74, 72), "HTML / CSS / JS TEMPLATE", fill=COLORS["paper"], bg=COLORS["deep"])
    text(d, (74, 178), "VTuber / 配信者向け", F["title_jp"], COLORS["ink"], 760, 8)
    text(d, (74, 356), "Webサイト\nテンプレート", F["title_jp"], COLORS["ink"], 740, 8)
    text(d, (78, 590), "プロフィール、配信スケジュール、活動リンク、問い合わせ導線を1ページにまとめたテンプレートです。", F["body"], COLORS["muted"], 500)
    browser_mock(d, (620, 248), (490, 380), THEMES[-1])
    phone_mock(d, (780, 610), (210, 420), THEMES[2])
    text(d, (74, 1036), "5 color themes included", F["h3"], COLORS["deep"])
    save(img, "01-cover.png")


def desktop_preview():
    img, d = new_canvas("#f2eee6")
    text(d, (72, 70), "PC表示イメージ", F["title_jp"], COLORS["ink"])
    text(d, (76, 166), "ファーストビューで活動内容と世界観が伝わる、インパクト重視の構成です。", F["body"], COLORS["muted"], 1000)
    browser_mock(d, (120, 300), (960, 650), THEMES[-1])
    save(img, "02-desktop-preview.png")


def mobile_preview():
    img, d = new_canvas(COLORS["soft"])
    text(d, (72, 70), "スマホ対応", F["title_jp"], COLORS["ink"])
    text(d, (76, 166), "スマートフォンでも見やすいレスポンシブ設計。メニューは開閉式です。", F["body"], COLORS["muted"], 760)
    phone_mock(d, (190, 318), (310, 650), THEMES[0])
    phone_mock(d, (520, 250), (360, 760), THEMES[-1])
    phone_mock(d, (910, 342), (220, 560), THEMES[2])
    save(img, "03-mobile-preview.png")


def sections():
    img, d = new_canvas(COLORS["paper"])
    text(d, (72, 70), "入っている構成", F["title_jp"], COLORS["ink"])
    items = [
        ("01", "Profile", "自己紹介・活動ジャンル・タグ"),
        ("02", "Streams", "最近の配信・動画リンク"),
        ("03", "Schedule", "今週の配信予定"),
        ("04", "Links", "YouTube / Twitch / X / Shop"),
        ("05", "Contact", "案件・コラボ問い合わせ"),
        ("06", "Goods", "販売ページへの導線"),
    ]
    for idx, (num, title, body) in enumerate(items):
        col = idx % 2
        row = idx // 2
        x = 74 + col * 530
        y = 220 + row * 220
        draw_card(d, (x, y, x + 470, y + 170), 24, COLORS["bg"], COLORS["line"], 3)
        d.text((x + 28, y + 26), num, font=F["num"], fill=COLORS["primary"])
        d.text((x + 142, y + 38), title, font=F["h3"], fill=COLORS["ink"])
        text(d, (x + 142, y + 88), body, F["body"], COLORS["muted"], 280)
    save(img, "04-sections.png")


def color_themes():
    img, d = new_canvas(COLORS["bg"])
    text(d, (72, 70), "5カラー展開", F["title_jp"], COLORS["ink"])
    text(d, (76, 166), "Cool / Dark / Girly / Minimal / RetroPop の5種類を同梱。雰囲気に合わせて選べます。", F["body"], COLORS["muted"], 980)
    for idx, (name, primary, bg) in enumerate(THEMES):
        x = 82 + idx * 220
        y = 316
        draw_card(d, (x, y, x + 180, y + 540), 26, bg, COLORS["ink"], 3)
        d.rounded_rectangle((x + 36, y + 54, x + 144, y + 162), 24, fill=primary, outline=COLORS["ink"], width=2)
        d.rounded_rectangle((x + 28, y + 230, x + 152, y + 260), 12, fill=COLORS["paper"])
        d.rounded_rectangle((x + 28, y + 284, x + 126, y + 314), 12, fill=COLORS["soft"])
        d.text((x + 90, y + 590), name, font=F["h3"], fill=COLORS["ink"], anchor="mm")
    save(img, "05-color-themes.png")


def editable():
    img, d = new_canvas("#f7f5ef")
    text(d, (72, 70), "差し替えできます", F["title_jp"], COLORS["ink"])
    points = [
        ("Text", "名前、プロフィール、配信説明、スケジュール"),
        ("Images", "アバター、サムネイル、配信部屋、グッズ画像"),
        ("Links", "YouTube、Twitch、X、ショップ、問い合わせ"),
        ("Colors", "CSSで色や余白を調整可能"),
    ]
    for idx, (head, body) in enumerate(points):
        y = 240 + idx * 190
        draw_card(d, (86, y, 1114, y + 130), 20, COLORS["paper"], COLORS["line"], 3)
        d.text((122, y + 36), head, font=F["h2"], fill=COLORS["primary"])
        text(d, (410, y + 38), body, F["body"], COLORS["muted"], 620)
    save(img, "06-editable.png")


def files():
    img, d = new_canvas(COLORS["paper"])
    text(d, (72, 70), "同梱ファイル", F["title_jp"], COLORS["ink"])
    folders = [
        ("index.html", "ページ本体"),
        ("css/style.css", "デザイン調整"),
        ("js/main.js", "メニューと表示演出"),
        ("images/", "差し替え画像"),
        ("README", "編集ガイド"),
        ("LICENSE", "利用規約"),
    ]
    for idx, (head, body) in enumerate(folders):
        col = idx % 2
        row = idx // 2
        x = 90 + col * 520
        y = 236 + row * 210
        draw_card(d, (x, y, x + 460, y + 150), 16, COLORS["bg"], COLORS["line"], 3)
        d.text((x + 28, y + 28), head, font=F["h3"], fill=COLORS["ink"])
        d.text((x + 28, y + 86), body, font=F["body"], fill=COLORS["muted"])
    save(img, "07-included-files.png")


def notes():
    img, d = new_canvas(COLORS["deep"])
    text(d, (72, 76), "ご購入前の注意", F["title_jp"], COLORS["paper"])
    notes = [
        "HTML / CSS / JavaScript の静的テンプレートです。",
        "サーバー設定、フォーム送信、決済機能は含まれません。",
        "画像・文章・リンクはサンプルです。ご自身の内容に差し替えてください。",
        "再配布、転売、素材集への収録は禁止です。",
    ]
    for idx, note in enumerate(notes):
        y = 260 + idx * 170
        d.rounded_rectangle((86, y, 1114, y + 116), 18, fill="#403378", outline=COLORS["line"], width=2)
        d.text((124, y + 34), f"{idx + 1:02d}", font=F["h3"], fill=COLORS["line"])
        text(d, (220, y + 36), note, F["body"], COLORS["paper"], 780)
    save(img, "08-notes.png")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    cover()
    desktop_preview()
    mobile_preview()
    sections()
    color_themes()
    editable()
    files()
    notes()
    (OUT / "README_商品画像について.txt").write_text(
        "SUZURIなどの商品ページ用画像です。サイズはすべて1200x1200pxです。\n"
        "01-cover.png を1枚目に使う想定で作成しています。\n",
        encoding="utf-8",
    )
    print(f"created {len(list(OUT.glob('*.png')))} png files in {OUT}")


if __name__ == "__main__":
    main()
