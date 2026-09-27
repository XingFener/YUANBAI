/* YUANBAI multi-sensory prototype. Original public runtime provenance: README.md. */
self.webpackChunk_N_E.push([["lowkey-local-entry"], {}, function (require) {
  const React = require(2265);
  const ReactDOM = require(4887);
  const h = React.createElement;

  /* Replace scene copy, colors, media and hotspot coordinates here. Coordinates are percentages.
     Media paths are served from reference/archive and reference/audio, e.g. /archive/scene.webp. */
  const SCENES = [
    {
      id: "phoenix-courtyard", number: "01", name: "凤凰树中庭", english: "PHOENIX COURTYARD", color: "#F26E4F",
      atmosphere: "从潮湿的土壤开始，沿着向上的砖与树影辨认中庭。", hubBackground: "/images/hub/door-01/background.jpg",
      background: "/archive/sensory/01-phoenix/scene-01.png", doorImage: "/images/hub/door-01/door.png", revealImage: "/archive/sensory/01-phoenix/scene-05.png",
      backgrounds: ["/archive/sensory/01-phoenix/scene-01.png", "/archive/sensory/01-phoenix/scene-02.png", "/archive/sensory/01-phoenix/scene-03.png", "/archive/sensory/01-phoenix/scene-04.png"],
      hotspots: [
        { x: 49, y: 88, sense: "触觉、嗅觉", object: "砖台阶", visual: "steps", image: "/archive/sensory/01-phoenix/object-steps.png", actionZh: "你摸索着踏上红砖台阶。", actionEn: "You feel your way up the red brick steps.", detail: "你摸索着蹲下，掌心在砖面轻轻摩擦，粗糙的颗粒感像按在砂纸上，有些硌手。指尖传来阳光晒过的余温。凑近深吸一口气，干燥的土腥气有点重，像一只刚出窑的陶罐。", text: "掌心摩擦粗糙的砖面，像按在砂纸上，带着点晒过的余温。" },
        { x: 49, y: 65, sense: "触觉、嗅觉", object: "脚下的泥土", visual: "soil", image: "/archive/sensory/01-phoenix/object-soil.png", actionZh: "你停下，鞋底轻碾脚下的泥土。", actionEn: "You stop, grinding the soil lightly underfoot.", detail: "你停下脚步，鞋底轻碾，泥土在脚下碎裂，松软中带着阻力，像压碎了一块干燥的饼干。你蹲下身凑近，一股干涩的土味钻进鼻腔，混着草根的微苦，有点像吹开窗台上积攒的灰尘。", text: "泥土在鞋底碎裂像压碎干饼干。蹲下凑近，干涩土腥味混着草根微苦，像吹开窗台上的灰尘。" },
        { x: 49, y: 39, sense: "触觉、嗅觉", object: "树", visual: "tree", image: "/archive/sensory/01-phoenix/object-tree.png", actionZh: "你摸索着向前，掌心贴上树干。", actionEn: "You feel your way forward, palms pressing against the trunk.", detail: "你摸索着向前，掌心贴上树干。树皮粗糙干硬，指尖划过一道道深深的裂纹，像摸在老木屋的门框上。凑近深吸一口气，没有花叶的香味，只有淡淡的木质气息，像凑近闻一块角落里风干的老木板。", text: "掌心贴紧树干，树皮粗糙干硬，像摸在老木屋的门框上。凑近深吸，只有淡淡的干木料气息，像风干的老木板。" }
      ]
    },
    {
      id: "seminar-room", number: "02", name: "B1-101 研讨室", english: "SEMINAR ROOM", color: "#6D7AB9",
      atmosphere: "金属、木面与被反复使用的痕迹，共同勾勒一间讨论空间。", hubBackground: "/images/hub/door-02/background.jpg",
      background: "/archive/sensory/02-seminar/scene-01.png", doorImage: "/images/hub/door-02/door.png", revealImage: "/archive/sensory/02-seminar/scene-05.png",
      backgrounds: ["/archive/sensory/02-seminar/scene-01.png", "/archive/sensory/02-seminar/scene-02.png", "/archive/sensory/02-seminar/scene-03.png", "/archive/sensory/02-seminar/scene-04.png"],
      hotspots: [
        { x: 26, y: 70, sense: "触觉", object: "桌子", visual: "table", image: "/archive/sensory/02-seminar/object-table.png", actionZh: "你拉开椅子，指尖划过桌面。", actionEn: "You pull out a chair, fingertips tracing the tabletop.", detail: "你拉开椅子，指尖划过桌面。木纹平滑且带着微微的凉意。你屈起指节轻叩桌面，闷闷的“咚咚”声顺着指骨震上来，微微发麻，像在敲击一块厚实的砧板。", text: "木纹平滑微凉，轻叩桌面，“咚咚”声顺着指骨震上来，有点发麻，像在敲击一块厚砧板。" },
        { x: 12, y: 45, sense: "触觉、嗅觉", object: "置物架", visual: "shelf", image: "/archive/sensory/02-seminar/object-shelf.png", actionZh: "你走近置物架，握住铁杆。", actionEn: "You approach the rack, gripping an iron rod.", detail: "你走近置物架，握住铁杆。金属的坚硬与冰凉瞬间传递掌心，指尖来回滑动，能摸到细微的焊点。侧头凑近轻嗅，有一股淡淡的铁锈味，有点像捏在手里很久的硬币。", text: "金属坚硬冰凉，指尖滑过有细微焊点。凑近轻嗅，有股淡淡铁锈味，有点像硬币的味道。" },
        { x: 77, y: 57, sense: "触觉、嗅觉", object: "软木板、图钉", visual: "board", image: "/archive/sensory/02-seminar/object-board.png", actionZh: "黑暗中，你摸到图钉，按进软木板里。", actionEn: "In the dark, you feel for a pushpin and press it into the corkboard.", detail: "黑暗中，你摸到图钉，按进软木板里。针尖刺进去有微小的阻力，像扎进一块厚纸板。拔出来时带下细碎的软木屑，凑近闻，像刚削完铅笔的味道。", text: "针尖刺进去有微小阻力，像扎进厚纸板。拔出来带下细碎木屑，凑近闻，像刚削完铅笔的味道。" }
      ]
    },
    {
      id: "gallery", number: "03", name: "美术馆", english: "GALLERY", color: "#70D2D5",
      atmosphere: "声音先于图像抵达；翻页与沙粒让白色展厅获得边界。", hubBackground: "/images/hub/door-03/background.jpg",
      background: "/archive/sensory/03-gallery/scene-01.png", doorImage: "/images/hub/door-03/door.png", revealImage: "/archive/sensory/03-gallery/scene-05.png",
      backgrounds: ["/archive/sensory/03-gallery/scene-01.png", "/archive/sensory/03-gallery/scene-02.png", "/archive/sensory/03-gallery/scene-03.png", "/archive/sensory/03-gallery/scene-04.png"],
      hotspots: [
        { x: 23, y: 56, sense: "听觉", object: "美术馆的音乐", visual: "music", image: "/archive/sensory/03-gallery/object-music.png", audio: true, audioSrc: "/audio/gallery.mp3", actionZh: "黑暗中，你停下脚步，侧耳倾听。", actionEn: "In the darkness, you stop intently.", detail: "黑暗中，你停下脚步侧耳倾听。古典乐的旋律在空旷的展厅里来回碰撞，像水滴落进很深的井里，传上来一圈一圈的回音。声音很慢，包裹着整个空间。", text: "旋律在空旷展厅里来回碰撞，像水滴落进很深的井里，传上来一圈一圈的回音。" },
        { x: 86, y: 79, sense: "触觉、嗅觉", object: "地面的沙", visual: "sand", image: "/archive/sensory/03-gallery/object-sand.png", actionZh: "你踩在展区细沙上。", actionEn: "You step on the fine sand of the exhibition area.", detail: "你踩在展区细沙上。脚底传来轻微的沉降与柔软阻力，像踩在海边退潮后的沙滩上。深呼吸，干燥的沙土气息直钻鼻孔，能闻到细细的尘埃味。", text: "脚底轻微沉降，像踩在退潮的沙滩。深呼吸，干燥沙土气息直钻鼻孔，能闻到细细的尘埃味。" },
        { x: 76, y: 48, sense: "触觉、嗅觉", object: "书页", visual: "paper", image: "/archive/sensory/03-gallery/object-paper.png", actionZh: "你摸索着，翻开一本书。", actionEn: "You feel your way and open a book.", detail: "你摸索着翻开一本书。指尖摩挲着纸页，有点粗糙，翻动时沙沙作响，像捻过干燥的落叶。凑近深吸一口气，淡淡的墨香混着纸浆味，像把脸埋进了干燥的碎木屑里。", text: "指尖摩挲纸页沙沙响，像捻过干燥落叶。深吸一口气，淡淡墨香混着纸浆味，像埋进干木屑里。" }
      ]
    },
    {
      id: "activity-room", number: "04", name: "B1-501 活动室", english: "ACTIVITY ROOM", color: "#F58C73",
      atmosphere: "屏幕的冷光、织物的下陷与花的气味，拼出有人停留的房间。", hubBackground: "/images/hub/door-04/background.jpg",
      background: "/archive/sensory/04-activity/scene-01.png", doorImage: "/images/hub/door-04/door.png", revealImage: "/archive/sensory/04-activity/scene-05.png",
      backgrounds: ["/archive/sensory/04-activity/scene-01.png", "/archive/sensory/04-activity/scene-02.png", "/archive/sensory/04-activity/scene-03.png", "/archive/sensory/04-activity/scene-04.png"],
      hotspots: [
        { x: 22, y: 51, sense: "触觉", object: "智慧屏", visual: "screen", image: "/archive/sensory/04-activity/object-screen.png", actionZh: "你摸索着，触碰到智慧屏的边缘。", actionEn: "You feel your way and touch the edge of the smart screen.", detail: "你摸索着触碰到智慧屏的边缘。指尖顺着边缘滑过，玻璃表面光滑平整，带着微凉与坚硬，安静地立在那里，没有任何温度与震颤。", text: "指尖顺边缘滑过，玻璃表面光滑平整，带着微凉与坚硬，安静地立在那里。" },
        { x: 58, y: 77, sense: "触觉", object: "布沙发", visual: "sofa", image: "/archive/sensory/04-activity/object-sofa.png", actionZh: "你摸索着坐下，碰到布沙发。", actionEn: "You feel your way and sit down, touching the fabric sofa.", detail: "你摸索着坐下，碰到布沙发。手指划过粗粝的棉麻，触感像摸在干爽的毛巾上。身体一沉，像陷进了一团松软的棉花里，整个后背被稳稳包裹住。", text: "手指划过粗粝棉麻，触感像摸在干爽毛巾上。身体一沉，像陷进了一团松软的棉花里。" },
        { x: 90, y: 46, sense: "触觉、嗅觉", object: "植物", visual: "plant", image: "/archive/sensory/04-activity/object-plant.png", actionZh: "你伸手摸索到绿植，指尖轻拂叶片。", actionEn: "You reach out to the green plant, gently brushing the leaves.", detail: "你伸手摸索到绿植，指尖轻拂叶片。叶面光滑且带着微凉，摸起来像柔软的丝绸。稍一凑近，清新的淡香就钻进了鼻腔，有点像刚切开的苹果。", text: "叶片光滑微凉，摸起来像柔软丝绸。稍一凑近，清新的淡香钻进鼻腔，有点像刚切开的苹果味。" }
      ]
    },
    {
      id: "outdoor-platform", number: "05", name: "户外平台", english: "OUTDOOR PLATFORM", color: "#FBBE9A",
      atmosphere: "远处施工与近处材料的触感，把平台连接到更大的城市。", hubBackground: "/images/hub/door-05/background.jpg",
      background: "/archive/sensory/05-platform/scene-01.png", doorImage: "/images/hub/door-05/door.png", revealImage: "/archive/sensory/05-platform/scene-05.png",
      backgrounds: ["/archive/sensory/05-platform/scene-01.png", "/archive/sensory/05-platform/scene-02.png", "/archive/sensory/05-platform/scene-03.png", "/archive/sensory/05-platform/scene-04.png"],
      hotspots: [
        { x: 72, y: 53, sense: "听觉", object: "远处施工的声音", visual: "city", image: "/archive/sensory/05-platform/object-city.png", audio: true, audioSrc: "/audio/construction.mp3", audioVolume: .32, actionZh: "视野被蒙蔽，你停下脚步，侧耳倾听。", actionEn: "Blinded, you stop and listen intently.", detail: "视野被蒙蔽，你停下脚步侧耳倾听。远处的敲击声和机器轰鸣断断续续传来。眼睛看不见时，这声音变得格外真切，一下下撞击着耳膜。", text: "远处的敲击和机器轰鸣断断续续。眼睛看不见时，这声音变得格外真切，一下下撞击着耳膜。" },
        { x: 38, y: 85, sense: "触觉", object: "木地板", visual: "wood", image: "/archive/sensory/05-platform/object-wood.png", actionZh: "你低头蹲下身，触摸木地板。", actionEn: "You crouch down, touching the wooden floor.", detail: "你低头蹲下身，触摸木地板。阳光烘烤的温热与凹凸的木纹在指腹清晰可辨，摸起来像一块晒暖的旧切菜板，凹凸不平，带着风吹日晒的痕迹。", text: "阳光烘烤的温热与凹凸木纹在指腹清晰可辨，摸起来像一块晒暖的旧切菜板。" },
        { x: 72, y: 51, sense: "触觉", object: "金属围栏", visual: "rail", image: "/archive/sensory/05-platform/object-rail.png", actionZh: "你双手握住白色金属围栏。", actionEn: "You grip the white metal railing with both hands.", detail: "你双手握住白色金属围栏。阳光直射下金属微烫，掌心贴上去能感觉到热度，摸起来像暖气片一样温热，手心微微出汗，质感坚硬而平滑。", text: "阳光直射下金属微烫，掌心贴上去能感觉到热度，摸起来像暖气片一样温热。" }
      ]
    },
    {
      id: "round-courtyard", number: "06", name: "圆形中庭", english: "ROUND COURTYARD", color: "#8D955D",
      atmosphere: "植物、下沉台阶与圆台，共同确认一个向心的空间。",
      hubBackground: "/images/hub/door-06/background.png",
      background: "/archive/sensory/06-courtyard/scene-01.png",
      doorImage: "/images/hub/door-06/door.png",
      revealImage: "/archive/sensory/06-courtyard/scene-05.png",
      backgrounds: [
        "/archive/sensory/06-courtyard/scene-01.png",
        "/archive/sensory/06-courtyard/scene-02.png",
        "/archive/sensory/06-courtyard/scene-03.png",
        "/archive/sensory/06-courtyard/scene-04.png"
      ],
      hotspots: [
        {
          x: 80, y: 70, sense: "触觉、嗅觉", object: "植物", visual: "plant", image: "/archive/sensory/06-courtyard/object-plant.png",
          actionZh: "你俯身拨开带土的丛生花草。", actionEn: "You bend down, parting the clumps of soil-covered flowers.",
          detail: "你蹲下身，指尖靠近中庭边缘的绿植。叶片边缘的细微绒毛轻轻扎着你的指腹，触感微痒。伴随触碰，青草香气混合着泥土的湿气涌上鼻腔，像刚修剪完草坪。",
          text: "指尖拂过叶片绒毛，微痒触感中，青草香气混合泥土湿气涌上鼻腔。"
        },
        {
          x: 50, y: 76, sense: "触觉、听觉", object: "砖台阶", visual: "downsteps", image: "/archive/sensory/06-courtyard/object-steps.png",
          actionZh: "你扶墙而下，走向下沉广场。", actionEn: "You descend along the wall toward the sunken plaza.",
          detail: "你扶墙而下，走向下沉广场。掌心划过粗糙的砖块，像摸在没打磨过的砂纸上。鞋底踩在台阶上的“嗒嗒”声在墙壁间弹来弹去，像有人在远处敲空盒子。",
          text: "掌心划过粗糙砖块，鞋底“嗒嗒”声在墙壁间弹来弹去，像有人在敲空盒子。"
        },
        {
          x: 50, y: 70, sense: "触觉、听觉", object: "圆台", visual: "circle", image: "/archive/sensory/06-courtyard/object-platform.png",
          actionZh: "你走到最底部，盘腿坐上圆台。", actionEn: "You reach the bottom, sitting cross-legged on the round platform.",
          detail: "你走到最底部，盘腿坐上圆台。掌心平贴红砖，阳光烘烤的余温传遍全身，像摸在刚断电的电热毯上。周围很静谧，只能听到自己呼吸的起伏声。",
          text: "掌心平贴红砖，阳光余温传遍全身，像摸在刚断电的电热毯上。周围很静，只听到自己的呼吸。"
        }
      ]
    }
  ];
  const LOOPED_SCENES = Array.from({ length: 3 }, (_, loop) => SCENES.map((scene, sceneIndex) => ({ scene, sceneIndex, loop, key: loop + "-" + scene.id }))).flat();

  const STORAGE_KEY = "yuanbai-scene-progress-v1";
  const query = new URLSearchParams(location.search);
  const legacyMode = query.has("case") || query.get("view") === "orbit" || query.get("view") === "archive";
  const previewRings = query.get("preview") === "rings";
  const previewOpening = query.get("preview") === "opening" || previewRings;
  const archiveDoorMode = query.get("doors") !== "classic";
  /* The immersive dream exploration is now the default production experience.
     Keep ?style=classic as a comparison route for the previous visual treatment. */
  const dreamMode = query.get("style") !== "classic";

  function fadeAudio(track, duration = 650, pauseAtEnd = true) {
    if (!track) return;
    const initial = track.volume;
    const started = performance.now();
    const step = now => {
      const progress = Math.min(1, (now - started) / duration);
      track.volume = Math.max(0, initial * (1 - progress));
      if (progress < 1) requestAnimationFrame(step);
      else if (pauseAtEnd) { track.pause(); track.currentTime = 0; }
    };
    requestAnimationFrame(step);
  }

  const effectTracks = new Map();
  function playEffect(src, volume = .72) {
    const previous = effectTracks.get(src);
    if (previous) { previous.pause(); previous.currentTime = 0; }
    const track = new Audio(src);
    track.loop = false;
    track.volume = volume;
    effectTracks.set(src, track);
    track.addEventListener("ended", () => { if (effectTracks.get(src) === track) effectTracks.delete(src); }, { once: true });
    track.play().catch(() => {});
    return track;
  }

  const overallAmbience = {
    track: null,
    fadeTimer: null,
    stopTimer: null,
    ensure() {
      if (!this.track) {
        this.track = new Audio("/audio/overall-ambience.mp3");
        this.track.loop = true;
        this.track.preload = "auto";
        this.track.volume = .34;
      }
      return this.track;
    },
    clearTimers() {
      clearInterval(this.fadeTimer);
      clearTimeout(this.stopTimer);
      this.fadeTimer = null;
      this.stopTimer = null;
    },
    play() {
      const track = this.ensure();
      this.clearTimers();
      track.volume = .34;
      track.play().catch(() => {});
    },
    stopAfterEnding() {
      const track = this.ensure();
      this.clearTimers();
      this.stopTimer = setTimeout(() => {
        const initial = track.volume;
        let frame = 0;
        this.fadeTimer = setInterval(() => {
          frame += 1;
          track.volume = Math.max(0, initial * (1 - Math.min(1, frame / 24)));
          if (frame >= 24) {
            clearInterval(this.fadeTimer);
            this.fadeTimer = null;
            track.pause();
          }
        }, 50);
      }, 1800);
    }
  };

  function GridDistortion({ onStart, dream = false }) {
    const ref = React.useRef(null);
    const [leaving, setLeaving] = React.useState(false);
    const move = event => {
      const box = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mx", ((event.clientX - box.left) / box.width - .5).toFixed(3));
      ref.current.style.setProperty("--my", ((event.clientY - box.top) / box.height - .5).toFixed(3));
    };
    const start = () => {
      if (leaving) return;
      setLeaving(true);
      playEffect("/audio/page-interaction.mp3", .76);
      setTimeout(onStart, 500);
    };
    return h("section", { className: "launch-grid " + (dream ? "dream-mode " : "") + (leaving ? "is-leaving" : ""), ref, onPointerMove: move },
      h("div", { className: "distortion-mesh", "aria-hidden": true }),
      h("div", { className: "launch-vignette", "aria-hidden": true }),
      h("div", { className: "launch-copy" },
        h("div", { className: "launch-brand", "aria-label": "∞ · 元白" },
          h("img", { src: "/images/yuanbai-infinity.png", alt: "∞" }),
          h("span", null, "·"),
          h("strong", null, "元白")
        ),
        h("p", { className: "slogan" }, "走进元白，感知无限"),
        h("p", { className: "welcome" }, "未来设计学院空间多感官探索"),
        h("button", { className: "primary-action", onClick: start }, h("span", null, "开始探索"))
      )
    );
  }

  function TrueFocus() {
    const [focus, setFocus] = React.useState(0);
    React.useEffect(() => { const timer = setInterval(() => setFocus(value => value === 0 ? 2 : 0), 4000); return () => clearInterval(timer); }, []);
    return h("h1", { className: "true-focus", "aria-label": "∞ · 元白" },
      ["∞", "·", "元白"].map((word, index) => h("span", { key: word, className: index === 1 ? "separator" : focus === index ? "focused" : "" }, word))
    );
  }

  function MagicRings({ color = "#ffffff", colorTwo = "#dcfcf7", ringCount = 3, speed = 1, lineThickness = 2,
    baseRadius = .35, radiusStep = .1, opacity = 1, noiseAmount = .1, rotation = 0, ringGap = 1.5 }) {
    const width = 600, height = 400;
    const base = baseRadius * height;
    const step = radiusStep * height * ringGap;
    return h("div", { className: "magic-rings-shell", "aria-hidden": true },
      h("svg", { className: "magic-rings", viewBox: "0 0 600 400", preserveAspectRatio: "xMidYMid meet" },
        h("defs", null,
          h("linearGradient", { id: "magic-ring-gradient", x1: "0%", y1: "12%", x2: "100%", y2: "88%" },
            h("stop", { offset: "0%", stopColor: color, stopOpacity: .2 }),
            h("stop", { offset: "46%", stopColor: color, stopOpacity: 1 }),
            h("stop", { offset: "74%", stopColor: colorTwo, stopOpacity: .92 }),
            h("stop", { offset: "100%", stopColor: colorTwo, stopOpacity: .12 })
          ),
          h("filter", { id: "magic-rings-warp", x: "-35%", y: "-55%", width: "170%", height: "210%" },
            h("feTurbulence", { type: "fractalNoise", baseFrequency: String(.006 + noiseAmount * .055), numOctaves: 2, seed: 8, result: "noise" },
              h("animate", { attributeName: "baseFrequency", values: ".008 .014;.018 .01;.008 .014", dur: (8 / speed) + "s", repeatCount: "indefinite" })
            ),
            h("feDisplacementMap", { in: "SourceGraphic", in2: "noise", scale: 10, xChannelSelector: "R", yChannelSelector: "B" })
          ),
          h("filter", { id: "magic-ring-glow", x: "-50%", y: "-80%", width: "200%", height: "260%" },
            h("feGaussianBlur", { stdDeviation: 5, result: "blur" }),
            h("feMerge", null, h("feMergeNode", { in: "blur" }), h("feMergeNode", { in: "SourceGraphic" }))
          )
        ),
        h("g", { transform: "rotate(" + rotation + " 300 200)", filter: "url(#magic-rings-warp)" },
          Array.from({ length: ringCount }, (_, index) => {
            const radius = base + step * index;
            return h("g", { key: index, className: "magic-ring-layer", style: { "--ring-index": index, animationDuration: (6 / speed + index * .7) + "s", animationDelay: (-index * 1.15) + "s", opacity } },
              h("ellipse", { className: "magic-ring magic-ring-halo", cx: 300, cy: 200, rx: radius, ry: radius * .48, strokeWidth: lineThickness * 4 }),
              h("ellipse", { className: "magic-ring", cx: 300, cy: 200, rx: radius, ry: radius * .48, strokeWidth: lineThickness, filter: "url(#magic-ring-glow)" })
            );
          })
        )
      )
    );
  }

  function Opening({ onDone, onStart, preview = false, ringEffect = "orbit", dream = false }) {
    const [progress, setProgress] = React.useState(0);
    const [launchVisible, setLaunchVisible] = React.useState(false);
    const videoRef = React.useRef(null);
    const fallbackTimer = React.useRef(null);
    React.useEffect(() => {
      let frame;
      const tick = () => {
        const video = videoRef.current;
        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          setProgress(Math.min(1, video.currentTime / video.duration));
          if (!preview && video.duration - video.currentTime <= 1.05) setLaunchVisible(true);
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => { cancelAnimationFrame(frame); clearTimeout(fallbackTimer.current); };
    }, [preview]);
    return h("section", { className: "opening " + (dream ? "dream-mode" : ""), onClick: onDone },
      h("div", { className: "opening-video", "aria-hidden": true },
        h("video", { ref: videoRef, autoPlay: true, muted: true, loop: preview, playsInline: true, preload: "auto",
          onEnded: () => { setProgress(1); if (!preview) onDone(); },
          onError: () => { if (!preview) fallbackTimer.current = setTimeout(onDone, 9600); } },
          h("source", { src: "/video/yuanbai-opening.mp4", type: "video/mp4" })
        )
      ),
      ringEffect === "magic"
        ? h(MagicRings, { color: "#ffffff", colorTwo: "#dcfcf7", ringCount: 3, speed: 1, lineThickness: 2, baseRadius: .35, radiusStep: .1, opacity: 1, noiseAmount: .1, rotation: 0, ringGap: 1.5 })
        : h("div", { className: "opening-orbit", style: { "--progress": progress } }, h("span"), h("span"), h("span")),
      h("div", { className: "opening-mark" }, h("strong", null, "∞"), h("small", null, "元白 · YUANBAI")),
      h("div", { className: "opening-progress" }, h("i", { style: { width: Math.round(progress * 100) + "%" } }), h("span", null, String(Math.round(progress * 100)).padStart(2, "0"))),
      h("button", { className: "skip", onClick: event => { event.stopPropagation(); onDone(); } }, "跳过"),
      launchVisible && h("div", { className: "opening-launch-preview", onClick: event => event.stopPropagation() }, h(GridDistortion, { dream, onStart }))
    );
  }

  function DoorModelCanvas({ accent, active = true, opening = false, passage = false }) {
    const canvasRef = React.useRef(null);
    const viewerRef = React.useRef(null);
    React.useEffect(() => {
      let cancelled = false;
      import("/vendor/door-viewer.js").then(module => {
        if (cancelled || !canvasRef.current) return;
        viewerRef.current = module.mountDoor(canvasRef.current, {
          modelUrl: "/models/yuanbai-door.glb", accent, active, opening, passage
        });
      }).catch(error => console.error("Unable to initialize 3D door", error));
      return () => { cancelled = true; viewerRef.current?.dispose(); viewerRef.current = null; };
    }, [accent, passage]);
    React.useEffect(() => { viewerRef.current?.setActive(active); }, [active]);
    React.useEffect(() => { viewerRef.current?.setOpening(opening); }, [opening]);
    return h("canvas", { ref: canvasRef, className: "door-model-canvas " + (passage ? "passage-model" : "hub-model"), "aria-hidden": true });
  }

  function ArchiveDoorCanvas({ accent, image, active = true, opening = false, passage = false, loadDelay = 0 }) {
    const canvasRef = React.useRef(null);
    const viewerRef = React.useRef(null);
    React.useEffect(() => {
      let cancelled = false;
      import("/vendor/archive-door-viewer.js").then(module => {
        if (cancelled || !canvasRef.current) return;
        viewerRef.current = module.mountArchiveDoor(canvasRef.current, { accent, image, active, opening, passage, loadDelay });
      }).catch(error => console.error("Unable to initialize archive door", error));
      return () => { cancelled = true; viewerRef.current?.dispose(); viewerRef.current = null; };
    }, [accent, image, passage]);
    React.useEffect(() => { viewerRef.current?.setActive(active); }, [active]);
    React.useEffect(() => { viewerRef.current?.setOpening(opening); }, [opening]);
    return h("canvas", { ref: canvasRef, className: "door-model-canvas archive-door-model " + (passage ? "passage-model" : "hub-model"), "aria-hidden": true });
  }

  function GradientWaveBackground() {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
      let cancelled = false;
      let viewer = null;
      import("/vendor/gradient-wave.js").then(module => {
        if (cancelled || !canvasRef.current) return;
        viewer = module.mountGradientWave(canvasRef.current, { quality: "medium", maxFPS: 45 });
      }).catch(error => console.error("Unable to initialize gradient wave", error));
      return () => { cancelled = true; viewer?.dispose(); };
    }, []);
    return h("canvas", { ref: canvasRef, className: "hub-gradient-wave", "aria-hidden": true });
  }

  function Hub({ completed, onEnter, onReset, onEnd, doorStyle = "classic", dream = false, arriving = false }) {
    const rail = React.useRef(null);
    const drag = React.useRef(null);
    const momentum = React.useRef(null);
    const wheelTimer = React.useRef(null);
    const suppressClick = React.useRef(false);
    const transitionTimer = React.useRef(null);
    const normalizing = React.useRef(false);
    const [active, setActive] = React.useState(0);
    const [activePhysical, setActivePhysical] = React.useState(SCENES.length);
    const [openingId, setOpeningId] = React.useState(null);
    const updateActive = React.useCallback(() => {
      const node = rail.current;
      if (!node) return;
      const center = node.scrollLeft + node.clientWidth / 2;
      const children = [...node.children];
      let next = 0, best = Infinity;
      children.forEach((child, index) => {
        const signedDelta = child.offsetLeft + child.offsetWidth / 2 - center;
        const delta = Math.abs(signedDelta);
        const position = signedDelta / Math.max(1, child.offsetWidth * 1.45);
        const focus = Math.max(0, 1 - Math.abs(position));
        const angle = Math.max(-32, Math.min(32, position * -28));
        child.style.setProperty("--door-angle", angle.toFixed(2) + "deg");
        child.style.setProperty("--door-position", position.toFixed(3));
        child.style.setProperty("--door-scale", (.78 + focus * .22).toFixed(3));
        child.style.setProperty("--door-y", ((1 - focus) * 24).toFixed(1) + "px");
        child.style.setProperty("--door-opacity", (.4 + focus * .6).toFixed(3));
        child.style.setProperty("--door-blur", ((1 - focus) * 1.25).toFixed(2) + "px");
        child.style.setProperty("--accent-share", Math.round(focus * 100) + "%");
        child.style.setProperty("--door-focus", focus.toFixed(3));
        child.style.setProperty("--door-tint", (focus * .86).toFixed(3));
        child.style.setProperty("--door-dim", ((1 - focus) * .72).toFixed(3));
        if (delta < best) { best = delta; next = index; }
      });
      setActive(Number(children[next]?.dataset.sceneIndex || 0));
      setActivePhysical(next);
      if (!normalizing.current && children.length === LOOPED_SCENES.length && (next < 3 || next >= children.length - 3)) {
        const cycleWidth = children[SCENES.length].offsetLeft - children[0].offsetLeft;
        normalizing.current = true;
        node.scrollLeft += next < 3 ? cycleWidth : -cycleWidth;
        requestAnimationFrame(() => { normalizing.current = false; updateActive(); });
      }
    }, []);
    const snapToNearest = React.useCallback(() => {
      const node = rail.current;
      if (!node) return;
      const center = node.scrollLeft + node.clientWidth / 2;
      let target = null, best = Infinity;
      [...node.children].forEach(child => { const delta = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center); if (delta < best) { best = delta; target = child; } });
      if (target) node.scrollTo({ left: target.offsetLeft - node.clientWidth / 2 + target.offsetWidth / 2, behavior: "smooth" });
    }, []);
    React.useEffect(() => {
      const node = rail.current;
      const selected = node.children[SCENES.length];
      if (selected) node.scrollLeft = selected.offsetLeft - node.clientWidth / 2 + selected.offsetWidth / 2;
      requestAnimationFrame(updateActive);
      return () => { clearTimeout(transitionTimer.current); clearTimeout(wheelTimer.current); cancelAnimationFrame(momentum.current); };
    }, [updateActive]);
    const enterScene = scene => {
      if (openingId) return;
      playEffect("/audio/door-open.mp3", .82);
      setOpeningId(scene.id);
      transitionTimer.current = setTimeout(() => onEnter(scene.id), 2450);
    };
    const pointerDown = event => {
      cancelAnimationFrame(momentum.current);
      rail.current.classList.add("is-dragging");
      drag.current = { x: event.clientX, scroll: rail.current.scrollLeft, moved: false, lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
    };
    const pointerMove = event => {
      if (!drag.current) return;
      const now = performance.now();
      const delta = event.clientX - drag.current.x;
      const elapsed = Math.max(8, now - drag.current.lastTime);
      const instantVelocity = (event.clientX - drag.current.lastX) / elapsed;
      drag.current.velocity = drag.current.velocity * .72 + instantVelocity * .28;
      drag.current.lastX = event.clientX; drag.current.lastTime = now;
      if (Math.abs(delta) > 4 && !drag.current.moved) { drag.current.moved = true; rail.current.setPointerCapture?.(event.pointerId); }
      rail.current.scrollLeft = drag.current.scroll - delta;
    };
    const pointerUp = () => {
      if (!drag.current) return;
      const node = rail.current;
      let velocity = drag.current.velocity;
      suppressClick.current = drag.current.moved;
      drag.current = null;
      const coast = () => {
        velocity *= .92;
        node.scrollLeft -= velocity * 16;
        if (Math.abs(velocity) > .018) momentum.current = requestAnimationFrame(coast);
        else { node.classList.remove("is-dragging"); snapToNearest(); }
      };
      if (Math.abs(velocity) > .05) momentum.current = requestAnimationFrame(coast);
      else { node.classList.remove("is-dragging"); snapToNearest(); }
    };
    const openingScene = SCENES.find(scene => scene.id === openingId);
    const useArchiveDoors = doorStyle === "archive";
    return h("main", { className: "hub " + (useArchiveDoors ? "doors-archive " : "") + (dream ? "dream-mode " : "") + (arriving ? "is-arriving " : "") + (openingId ? "is-opening" : ""), style: { "--selected-accent": SCENES[active].color } },
      h("div", { className: "hub-scene-backgrounds", "aria-hidden": true },
        SCENES.map((scene, index) => h("div", { key: scene.id, className: "hub-scene-background " + (active === index ? "is-active" : ""), style: { backgroundImage: "url(" + scene.hubBackground + ")" } }))
      ),
      h("div", { className: "hub-particles", "aria-hidden": true }, Array.from({ length: 28 }, (_, index) => {
        const distance = 58 + (index % 6) * 3;
        const drift = ((index % 5) - 2) * 1.1;
        return h("i", { key: index, style: {
          "--particle": index,
          "--angle": ((index * 360 / 28) + ((index % 4) - 1.5) * 2.4).toFixed(2) + "deg",
          "--speed": (7.2 + (index % 7) * .48).toFixed(2) + "s",
          "--delay": (-index * .39).toFixed(2) + "s",
          "--distance": distance + "vw",
          "--mid-distance": (distance * .46).toFixed(1) + "vw",
          "--drift": drift.toFixed(1) + "vh",
          "--drift-end": (-drift).toFixed(1) + "vh",
          "--size": (1.2 + (index % 3) * .48).toFixed(2) + "px",
          "--origin-x": (((index % 5) - 2) * .7).toFixed(1) + "vw",
          "--origin-y": (((index % 4) - 1.5) * .55).toFixed(1) + "vh"
        } });
      })),
      dream && h("div", { className: "dream-haze", "aria-hidden": true }, h("i"), h("i"), h("i")),
      h("header", { className: "minimal-header" }, h("button", { className: "wordmark", onClick: () => { playEffect("/audio/page-interaction.mp3", .7); onReset(); } }, "∞ · 元白"), h("span", null, "已感知 " + String(completed.length).padStart(2, "0") + " / 06")),
      h("div", { className: "hub-intro" }, h("h2", null, "从此处，开始感知"), h("span", null, "元白楼的每一处空间，都藏有不同的感官记忆。", h("br"), "顺着朱红的入口，寻找那些被忽略的声音、触感与温度。")),
      h("div", { className: "hub-lamp", "aria-hidden": true }, h("span", { className: "lamp-cord" }), h("span", { className: "lamp-shade" }), h("span", { className: "lamp-beam" }), h("span", { className: "lamp-pool" })),
      h("div", { className: "doors-viewport" },
        h("div", { className: "door-rail", ref: rail, onScroll: updateActive,
          onWheel: event => { if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) { event.preventDefault(); rail.current.classList.add("is-dragging"); rail.current.scrollLeft += event.deltaY; clearTimeout(wheelTimer.current); wheelTimer.current = setTimeout(() => { rail.current.classList.remove("is-dragging"); snapToNearest(); }, 140); } },
          onPointerDown: pointerDown, onPointerMove: pointerMove, onPointerUp: pointerUp, onPointerCancel: pointerUp },
          LOOPED_SCENES.map(({ scene, sceneIndex, key }, index) => h("article", { key, "data-scene-index": sceneIndex, className: "door-wrap " + (activePhysical === index ? "active " : "") + (completed.includes(scene.id) ? "complete " : "") + (openingId === scene.id && activePhysical === index ? "opening" : ""),
            style: { "--accent": scene.color } },
            h("span", { className: "door-threshold", "aria-hidden": true }),
            h("button", { className: "door", "aria-label": completed.includes(scene.id) ? "进入 " + scene.name : "进入待探索空间 " + scene.number, onClick: event => { event.stopPropagation(); if (suppressClick.current) { suppressClick.current = false; return; } enterScene(scene); } },
              useArchiveDoors
                ? h(ArchiveDoorCanvas, { accent: scene.color, image: scene.doorImage, active: activePhysical === index, loadDelay: 250 + (index % SCENES.length) * 120 })
                : h(DoorModelCanvas, { accent: scene.color, active: activePhysical === index }),
              h("span", { className: "door-depth" }), h("span", { className: "door-light" }),
              h("span", { className: "door-panels", "aria-hidden": true }),
              h("span", { className: "door-number" }, scene.number),
              h("span", { className: "door-state" }, scene.number + "、" + (completed.includes(scene.id) ? scene.name : "待探索")),
              h("span", { className: "door-handle" })
            ),
            h("div", { className: "door-label" }, h("strong", null, completed.includes(scene.id) ? scene.name : "待探索"), h("small", null, completed.includes(scene.id) ? scene.english : "UNKNOWN SPACE"))
          ))
        )
      ),
      h("button", { className: "ending-gateway", onClick: () => { playEffect("/audio/page-interaction.mp3", .72); onEnd(); } }, h("i", { "aria-hidden": true }), h("span", null, "结束通道"), h("small", null, "END JOURNEY")),
      h("div", { className: "hub-controls" }, h("span", null, "←"), h("i"), h("span", null, "→"), h("em", null, String(active + 1).padStart(2, "0") + " / 06")),
      openingScene && h("div", { className: "door-passage", style: { "--accent": openingScene.color }, "aria-hidden": true },
        h("div", { className: "passage-space" },
          h("div", { className: "passage-frame" },
            h("div", { className: "passage-light" }),
            h("div", { className: "passage-leaf" }, h("i"), h("i"), h("i"), h("i"), h("span"))
          ),
          useArchiveDoors
            ? h(ArchiveDoorCanvas, { accent: openingScene.color, image: openingScene.doorImage, active: true, opening: true, passage: true })
            : h(DoorModelCanvas, { accent: openingScene.color, active: true, opening: true, passage: true }),
          h("div", { className: "passage-floor" })
        ),
        h("div", { className: "passage-caption" }, h("span", null, openingScene.number), h("strong", null, completed.includes(openingScene.id) ? openingScene.name : "未知空间"), h("small", null, "ENTERING PERCEPTION"))
      )
    );
  }

  function VoicePill({ src, autoPlay = false, volume = .62, closing = false }) {
    const [playing, setPlaying] = React.useState(false);
    const audio = React.useRef(null);
    const bars = [7, 13, 21, 11, 18, 25, 14, 9, 20, 12, 17, 8];
    React.useEffect(() => {
      if (src && autoPlay) {
        audio.current = new Audio(src);
        audio.current.loop = true;
        audio.current.volume = volume;
        audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
      return () => { if (audio.current) { const track = audio.current; audio.current = null; fadeAudio(track, 700); } };
    }, [src, autoPlay, volume]);
    React.useEffect(() => { if (closing && audio.current) { fadeAudio(audio.current, 620); setPlaying(false); } }, [closing]);
    const toggle = () => {
      if (!src) { setPlaying(value => !value); return; }
      if (!audio.current) { audio.current = new Audio(src); audio.current.loop = true; audio.current.addEventListener("ended", () => setPlaying(false)); }
      if (audio.current.paused) { audio.current.volume = volume; audio.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
      else { fadeAudio(audio.current, 520); setPlaying(false); }
    };
    return h("button", { className: "voice-pill " + (playing ? "playing" : ""), onClick: toggle, "aria-label": src ? "播放场景声音" : "播放模拟声音" },
      h("span", { className: "voice-icon" }, playing ? "Ⅱ" : "▶"),
      h("span", { className: "waveform" }, bars.map((height, index) => h("i", { key: index, style: { height, "--delay": (index * -80) + "ms" } }))),
      h("span", { className: "voice-time" }, playing ? "00:08" : "00:00"), h("span", { className: "voice-mode" }, src ? "AUDIO" : "SIMULATED")
    );
  }

  function useTypewriter(text, interval, startDelay = 0, revealAll = false) {
    const [visible, setVisible] = React.useState("");
    React.useEffect(() => {
      if (revealAll) { setVisible(text); return undefined; }
      setVisible("");
      let ticker;
      const starter = setTimeout(() => {
        let index = 0;
        ticker = setInterval(() => {
          index += 1;
          setVisible(text.slice(0, index));
          if (index >= text.length) clearInterval(ticker);
        }, interval);
      }, startDelay);
      return () => { clearTimeout(starter); clearInterval(ticker); };
    }, [text, interval, startDelay, revealAll]);
    return visible;
  }

  function BorderGlowCard({ scene, hotspot, onContinue, final, clueIndex, clueTotal, dream = false, objectVisible = true, closing = false }) {
    const [revealAll, setRevealAll] = React.useState(false);
    const title = useTypewriter(hotspot.object, 42, dream ? 120 : 0, revealAll);
    const detail = hotspot.detail || hotspot.text;
    const copyDelay = dream ? 100 + hotspot.object.length * 30 : 0;
    const copyInterval = Math.min(13, Math.max(5, Math.floor(620 / Math.max(1, detail.length))));
    const copy = useTypewriter(detail, copyInterval, copyDelay, revealAll);
    const copyReady = copy.length === detail.length;
    return h("div", { className: "card-scrim" + (closing ? " is-closing" : "") },
      h("article", { className: "sense-card" + (dream ? " memory-card" : "") + (hotspot.detail ? " has-detail" : "") + (copyReady ? " is-read" : " is-reading"), style: { "--accent": scene.color }, "aria-live": "polite" },
        h("div", { className: "glow-edge", "aria-hidden": true }),
        h("header", null, h("span", null, "⌁ " + hotspot.sense), h("small", null, "MEMORY " + String(clueIndex).padStart(2, "0"))),
        h("div", { className: "object-glyph " + hotspot.visual + (hotspot.image ? " has-media" : "") + (objectVisible ? " is-visible" : " is-waiting"), style: hotspot.image ? { backgroundImage: "url(" + hotspot.image + ")" } : null, "aria-hidden": true }, h("i"), h("i"), h("i")),
        h("p", { className: "object-kicker" }, "感知线索 " + String(clueIndex).padStart(2, "0") + " / " + String(clueTotal).padStart(2, "0")),
        h("h3", { className: "type-title" }, dream ? title : hotspot.object, dream && !title.endsWith(hotspot.object) && h("i", { className: "reading-caret", "aria-hidden": true })),
        hotspot.actionZh && h("div", { className: "sense-action" }, h("p", null, hotspot.actionZh), h("small", null, hotspot.actionEn)),
        h("p", { className: "sense-copy type-copy" }, dream ? copy : detail, dream && !copyReady && h("i", { className: "reading-caret", "aria-hidden": true })),
        hotspot.detail && h("p", { className: "sense-summary" }, hotspot.text),
        hotspot.audio && h(VoicePill, { src: hotspot.audioSrc || null, autoPlay: Boolean(hotspot.audioSrc), volume: hotspot.audioVolume || .58, closing }),
        h("button", { className: "continue-action", onClick: () => { if (dream && !copyReady) setRevealAll(true); else onContinue(); } }, h("span", null, final ? "形成空间认知" : "下一步"), h("i", null, "→"))
      )
    );
  }

  function Scene({ scene, onExit, onComplete, dream = false }) {
    const sceneRef = React.useRef(null);
    const [step, setStep] = React.useState(0);
    const [card, setCard] = React.useState(false);
    const [cardHotspot, setCardHotspot] = React.useState(null);
    const [cardStep, setCardStep] = React.useState(0);
    const [closingCard, setClosingCard] = React.useState(false);
    const [objectVisible, setObjectVisible] = React.useState(false);
    const [entering, setEntering] = React.useState(true);
    const [resolved, setResolved] = React.useState(false);
    const [phase, setPhase] = React.useState("awakening");
    const timers = React.useRef([]);
    const schedule = (callback, delay) => {
      const timer = setTimeout(callback, delay);
      timers.current.push(timer);
      return timer;
    };
    React.useEffect(() => {
      const timer = setTimeout(() => { setEntering(false); setPhase("searching"); }, dream ? 1850 : 800);
      return () => { clearTimeout(timer); timers.current.forEach(clearTimeout); timers.current = []; };
    }, []);
    const hotspot = scene.hotspots[step];
    const revealed = step;
    const activateHotspot = () => {
      if (closingCard || (dream && phase !== "searching")) return;
      playEffect("/audio/hotspot-interaction.mp3", .76);
      setCardHotspot(hotspot);
      setCardStep(step);
      setClosingCard(false);
      if (!dream) { setObjectVisible(true); setCard(true); return; }
      setPhase("activating");
      setObjectVisible(false);
      schedule(() => { setPhase("reading"); setCard(true); }, 620);
      schedule(() => setObjectVisible(true), 1400);
    };
    const proceed = () => {
      if (!dream) {
        setCard(false);
        if (step === scene.hotspots.length - 1) { setResolved(true); onComplete(scene.id); }
        else setStep(value => value + 1);
        return;
      }
      if (phase === "integrating") return;
      const finalStep = step === scene.hotspots.length - 1;
      setClosingCard(true);
      setObjectVisible(false);
      schedule(() => { setCard(false); setClosingCard(false); }, 480);
      if (!finalStep) {
        setStep(value => value + 1);
        setPhase("searching");
        return;
      }
      setPhase("integrating");
      schedule(() => {
        setResolved(true);
        setPhase("complete");
        onComplete(scene.id);
      }, 1250);
    };
    const stageVisible = step + (["activating", "object-reveal", "reading", "integrating", "complete"].includes(phase) ? 1 : 0);
    const stageMedia = scene.backgrounds ? scene.backgrounds[Math.min(stageVisible, scene.backgrounds.length - 1)] : null;
    const sceneMedia = resolved && scene.revealImage ? scene.revealImage : (stageMedia || (dream && scene.dreamImage ? scene.dreamImage : scene.background));
    const revealMedia = dream && scene.dreamImage ? scene.dreamImage : scene.revealImage;
    const previousMedia = React.useRef(sceneMedia);
    const underMedia = previousMedia.current;
    React.useEffect(() => { previousMedia.current = sceneMedia; }, [sceneMedia]);
    const moveScene = event => {
      if (!resolved || !sceneRef.current) return;
      const box = sceneRef.current.getBoundingClientRect();
      sceneRef.current.style.setProperty("--parallax-x", (((event.clientX - box.left) / box.width - .5) * 2).toFixed(3));
      sceneRef.current.style.setProperty("--parallax-y", (((event.clientY - box.top) / box.height - .5) * 2).toFixed(3));
    };
    if (resolved && !dream) return h("main", { className: "space-reveal", style: { "--accent": scene.color } },
      h("div", { className: "space-reveal-media " + (revealMedia ? "has-media" : "is-placeholder"), style: revealMedia ? { backgroundImage: "url(" + revealMedia + ")" } : null },
        !revealMedia && h("div", { className: "reveal-placeholder-mark", "aria-hidden": true }, h("i"), h("i"), h("i"))
      ),
      h("div", { className: "space-reveal-shade", "aria-hidden": true }),
      h("header", { className: "space-reveal-header" }, h("span", null, "空间认知完成"), h("small", null, String(scene.hotspots.length).padStart(2, "0") + " / " + String(scene.hotspots.length).padStart(2, "0"))),
      h("section", { className: "space-reveal-copy" },
        h("p", null, scene.number + " · SPACE PERCEIVED"), h("h1", null, scene.name), h("h2", null, scene.english),
        h("span", null, revealMedia ? "感知线索汇聚为真实空间。" : "真实空间影像将在这里显现。素材载入前，暂以感知场域占位。"),
        h("button", { className: "reveal-exit", onClick: () => onExit(true) }, h("span", null, "完成观看，返回目录"), h("i", null, "→"))
      )
    );
    const currentVisible = dream && objectVisible && ["reading", "integrating"].includes(phase);
    return h("main", { ref: sceneRef, onPointerMove: moveScene, className: "scene " + (dream ? "dream-mode exploration-v2 " : "") + (entering ? "entering " : "") + "phase-" + phase + (resolved ? " is-resolved" : ""), style: { "--accent": scene.color, "--reveal": revealed, "--clarity": revealed / scene.hotspots.length, "--parallax-x": 0, "--parallax-y": 0 } },
      h("div", { className: "scene-world" },
        underMedia !== sceneMedia && h("div", { className: "scene-background-under", style: underMedia ? { backgroundImage: "url(" + underMedia + ")" } : null, "aria-hidden": true }),
        h("div", { key: sceneMedia || "empty-scene", className: "scene-background", style: sceneMedia ? { backgroundImage: "url(" + sceneMedia + ")" } : null }),
        dream && h("div", { className: "scene-atmosphere", "aria-hidden": true }, h("i"), h("i"), h("i")),
        dream && h("div", { className: "scene-light-drift", "aria-hidden": true }),
        h("div", { className: "architecture-lines", "aria-hidden": true }, h("i"), h("i"), h("i"), h("i")),
        scene.hotspots.map((item, index) => h("div", { key: item.object, className: "revealed-object object-" + item.visual + (index < revealed ? " shown" : ""), style: { left: item.x + "%", top: item.y + "%" }, "aria-hidden": true })),
        h("div", { className: "darkness", style: { opacity: Math.max(.14, .9 - revealed * .23), backdropFilter: "blur(" + Math.max(1, 13 - revealed * 4) + "px)" } })
      ),
      h("header", { className: "scene-header" }, h("button", { onClick: () => onExit(false) }, "← 返回目录"), h("div", null, !dream && h("span", null, scene.number), h("strong", null, resolved ? scene.name : "未知空间")), h("small", null, dream ? "已探索 " + String(resolved ? scene.hotspots.length : revealed) + "/" + String(scene.hotspots.length) : String(revealed).padStart(2, "0") + " / " + String(scene.hotspots.length).padStart(2, "0"))),
      h("div", { className: "scene-caption" }, h("p", null, resolved ? "SPACE PERCEIVED" : "跟随感知线索"), h("span", null, resolved ? "感知已经汇聚，真实空间正在显现。" : "让空间逐渐显现……")),
      !resolved && phase !== "integrating" && phase !== "complete" && (!card || closingCard) && h("button", { className: "hotspot " + (phase === "activating" ? "is-activating" : ""), disabled: closingCard || (dream && phase !== "searching" && phase !== "activating"), style: { left: hotspot.x + "%", top: hotspot.y + "%" }, onClick: activateHotspot, "aria-label": "感知 " + hotspot.object }, h("i"), h("span", null, phase === "activating" ? "正在读取" : "触碰记忆"), dream && h("b", { "aria-hidden": true }, "↓")),
      h("div", { className: "scene-progress" }, scene.hotspots.map((_, index) => h("i", { key: index, className: index < revealed ? "done" : index === step ? "current" : "" }))),
      card && h(BorderGlowCard, { scene, hotspot: cardHotspot || hotspot, dream, objectVisible, closing: closingCard, onContinue: proceed, final: cardStep === scene.hotspots.length - 1, clueIndex: cardStep + 1, clueTotal: scene.hotspots.length }),
      resolved && dream && h("section", { className: "inline-reveal" },
        h("p", null, scene.number + " · SPACE PERCEIVED"), h("h1", null, scene.name), h("h2", null, scene.english),
        h("span", null, revealMedia ? "感知线索汇聚为真实空间。" : "真实空间影像将在这里显现。"),
        h("button", { className: "reveal-exit", onClick: () => onExit(true) }, h("span", null, "完成观看，返回目录"), h("i", null, "→"))
      )
    );
  }

  function Ending({ onHub, onRestart }) {
    return h("main", { className: "ending" },
      h("div", { className: "ending-background", "aria-hidden": true }),
      h("div", { className: "ending-brand", "aria-label": "∞ · 元白" },
        h("img", { src: "/images/yuanbai-infinity.png", alt: "∞" }), h("span", null, "·"), h("strong", null, "元白")
      ),
      h("section", { className: "ending-copy" },
        h("p", null, "Finding the Unknown Within the Familiar"),
        h("h1", null, "在熟悉之处，发现未知"),
        h("div", { className: "ending-prose" },
          h("span", null, "最难发现的，往往不是遥远的地方，而是每天经过却未曾停留的瞬间。"),
          h("span", null, "当我们放慢脚步，空间开始展现另一面。"),
          h("span", null, "声音、触感、气息与温度，共同组成一座隐藏的建筑。"),
          h("span", null, "元白楼从未改变，只是等待被重新感知。")
        )
      ),
      h("div", { className: "ending-actions" },
        h("button", { className: "primary-action", onClick: () => { playEffect("/audio/page-interaction.mp3", .76); onHub(); } }, "重返目录"),
        h("button", { className: "text-action", onClick: () => { playEffect("/audio/page-interaction.mp3", .7); onRestart(); } }, "清除记录，重新探索")
      )
    );
  }

  function AmbientAudio({ page, sceneId }) {
    const nature = React.useRef(null);
    const classroom = React.useRef(null);
    React.useEffect(() => {
      nature.current = new Audio("/audio/nature.mp3");
      classroom.current = new Audio("/audio/classroom.mp3");
      [nature.current, classroom.current].forEach(track => { track.loop = true; track.preload = "auto"; });
      nature.current.volume = 0;
      classroom.current.volume = 0;
      const start = () => overallAmbience.play();
      start();
      addEventListener("pointerdown", start, { once: true });
      addEventListener("keydown", start, { once: true });
      return () => {
        removeEventListener("pointerdown", start);
        removeEventListener("keydown", start);
        nature.current?.pause();
        classroom.current?.pause();
      };
    }, []);
    React.useEffect(() => {
      if (page === "ending") overallAmbience.stopAfterEnding();
      else overallAmbience.play();
      return () => overallAmbience.clearTimers();
    }, [page]);
    React.useEffect(() => {
      const outdoor = page === "scene" && ["phoenix-courtyard", "round-courtyard"].includes(sceneId);
      const indoors = page === "scene" && ["seminar-room", "activity-room"].includes(sceneId);
      const targets = [[nature.current, outdoor ? .38 : 0], [classroom.current, indoors ? .32 : 0]];
      const timers = targets.map(([track, target]) => {
        if (!track) return null;
        const startVolume = track.volume;
        let frame = 0;
        let timer;
        if (target > 0) track.play().catch(() => {});
        timer = setInterval(() => {
          frame += 1;
          track.volume = Math.max(0, Math.min(1, startVolume + (target - startVolume) * Math.min(1, frame / 24)));
          if (frame >= 24) { clearInterval(timer); if (target === 0) track.pause(); }
        }, 50);
        return timer;
      });
      return () => timers.forEach(timer => clearInterval(timer));
    }, [page, sceneId]);
    return null;
  }

  function LegacyArchive() {
    const { ArchiveScene } = require(5504);
    const SeriesReader = require(5452).E;
    const collections = require(8607).b7;
    const requestedCase = query.get("case");
    const initialShelf = query.get("view") !== "orbit";
    const [reader, setReader] = React.useState(null);
    const [story, setStory] = React.useState(false);
    const receive = React.useCallback(scene => { const index = scene.collections.findIndex(item => item.id === requestedCase); if (initialShelf && index >= 0) { const position = scene.order.indexOf(index); scene.rowP = scene.rowTarget = position * .55; setTimeout(() => scene.handleClick(index), 950); } }, []);
    const selected = collections.find(item => item.id === reader);
    return h(React.Fragment, null,
      h("div", { className: "archive-host", "data-reader-open": Boolean(selected) }, h(ArchiveScene, { series: collections, reducedMotion: false, onEnterSeries: id => setReader(id), entranceMode: "orbit", narrativeSelection: false, initialShelf, onController: receive })),
      selected && h(SeriesReader, { series: selected, storyOpen: story, initialIndex: 0, onClose: () => { setReader(null); setStory(false); }, onOpenStory: () => setStory(true), onCloseStory: () => setStory(false) })
    );
  }

  function App() {
    const [page, setPage] = React.useState("opening");
    const [sceneId, setSceneId] = React.useState(null);
    const [hubArrival, setHubArrival] = React.useState(false);
    const [completed, setCompleted] = React.useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } });
    React.useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); }, [completed]);
    React.useEffect(() => {
      const key = event => { if (event.key === "Escape" && page === "scene") { setHubArrival(false); setPage("hub"); setSceneId(null); } };
      addEventListener("keydown", key); return () => removeEventListener("keydown", key);
    }, [page]);
    if (legacyMode) return h(LegacyArchive);
    const scene = SCENES.find(item => item.id === sceneId);
    let content;
    const enterHubFromLaunch = () => { setHubArrival(true); setPage("hub"); };
    if (page === "opening") content = h(Opening, { dream: dreamMode, preview: previewOpening, ringEffect: previewRings ? "magic" : "orbit", onDone: () => setPage("launch"), onStart: enterHubFromLaunch });
    else if (page === "launch") content = h(GridDistortion, { dream: dreamMode, onStart: enterHubFromLaunch });
    else if (page === "hub") content = h(Hub, { completed, arriving: hubArrival, dream: dreamMode, doorStyle: archiveDoorMode ? "archive" : "classic", onEnter: id => { setHubArrival(false); setSceneId(id); setPage("scene"); }, onEnd: () => { setHubArrival(false); setPage("ending"); }, onReset: () => { setHubArrival(false); setPage("launch"); } });
    else if (page === "scene" && scene) content = h(Scene, { scene, dream: dreamMode, onExit: fromReveal => { setHubArrival(false); setPage(fromReveal && completed.length === SCENES.length ? "ending" : "hub"); setSceneId(null); }, onComplete: id => setCompleted(items => [...new Set([...items, id])]) });
    else content = h(Ending, { onHub: () => { setHubArrival(false); setPage("hub"); }, onRestart: () => { setCompleted([]); setHubArrival(false); setPage("hub"); } });
    return h(React.Fragment, null, h(AmbientAudio, { page, sceneId }), content);
  }

  ReactDOM.createRoot(document.getElementById("app")).render(h(App));
}]);
