function css(t) {
	return `
        :host {
            display: inline-block;
					}
				:host * {
					margin: 0;
					font-variation-settings: var(--casl), var(--wght), var(--slnt);
				}
        ::backdrop {
            background-color: rgba(0, 0, 0, 0.95);
        }
        dialog button {
						margin: 0;
            border: 0;
            background: 0;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            appearance: none;
            cursor: pointer;
        }
        #controls #close,
        #play,
        #pause {
            display: none;
        }
        
        dialog.is-paused #play {
            display: block;
        }
        dialog:not(.is-paused) #pause {
            display: block;
        }
        :host(open-stories.is-empty) .ring {
            opacity: 0.5;
        }
        :host(open-stories:not(.is-read):not(.is-empty)) .ring {
            border: var(--step--6) solid #08c;
            margin: 0;
        }
        .avatar {
            inline-size: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
        }
        #images {
					inset: 0;
					z-index: -1;
					overflow: hidden;
					inline-size: 100%;
					block-size: 100%;
					position: absolute;
					background: var(--black);
        }
        #images img {
					position: absolute;
					aspect-ratio: 9/16;
					object-fit: contain;
					opacity: 0;
					block-size: 100%;
					max-inline-size: 100%;
					max-block-size: 100%;
        }
        #images img.shown {
            opacity: 1;
        }
        .bar {
            border-radius: var(--step--5);
            overflow: hidden;
            block-size: 100%;
            background: rgba(200, 200, 200, .2);
            z-index: 1;
            flex: auto;
            box-shadow: 0 0 var(--step--1) 0 rgba(0, 0, 0, 0.5);
        }
        #bars {
					block-size: var(--step--6);
					margin-block-start: var(--step--1);
					margin-inline: var(--step--2);
					display: flex;
					gap: var(--step--4);
        }
        #controls {
					margin-inline: var(--step--2);
					display: flex;
					gap: var(--space-3xs-2xs);
					align-items: center;
					z-index: 1;
        }
				#controls > *:not(#time) {
					padding: var(--step-0) var(--step--1);
				}
        #metadata-details summary {
            align-items: center;
        }
        #controls button,
        #controls a,
        #metadata-details summary {
            display: inline-flex;
        }
				#controls a svg {
					vertical-align: middle;
				}
				#time {
					line-height: 1;
				}
        #time,
        #metadata-details {
						--wght: "wght" 700;
            flex: auto;
            color: var(--white);
            text-shadow: 0 0 var(--step--5) rgba(0, 0, 0, .4), 0 0 var(--step--5) rgba(0, 0, 0, .4);
        }
        svg {
            inline-size: auto;
            block-size: var(--step--1);
            filter: drop-shadow(0 0 var(--step--5) rgba(0, 0, 0, .5));
        }
        #metadata-details,
        #open-heart {
					position: absolute;
					inset-inline-end: 0;
					inset-block-end: 0;
					inset-inline-start: 0;
					padding: var(--step--1);
        }
        #open-heart {
					inset-inline-end: 0;
					inset-inline-start: auto;
					display: inline-flex;
					cursor: pointer;
					transition: transform .3s;
        }
        #open-heart .off {
            transition: opacity .3s;
        }
        #open-heart .on {
            position: absolute;
            z-index: 1;
            opacity: 0;
            transform: scale(0);
            transition: transform .3s;
        }
        #open-heart:not([disabled]):hover,
        #open-heart:not([disabled]):focus {
            transform: scale(1.2);
        }
        #open-heart[aria-pressed="true"] .on { 
            transform: scale(1);
            opacity: 1;
        }
        #open-heart[aria-pressed="true"] .off { opacity: 0; }
        #open-heart[aria-pressed="true"] path { fill: #f00; }
        #open-heart[aria-busy="true"] { animation: pulsate .4s infinite; }
        @keyframes pulsate {
            0% { transform: scale(1) }
            100% { transform: scale(1.2) }
    }
        #open-heart[errored] {
            opacity: .5;
        }
        #metadata-details {
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0)  0%,  rgba(0, 0, 0, 0.2)  var(--step-1), rgba(0, 0, 0, .7) 100%);
        }
				#metadata-details[open] > summary {
					color: #fffc;
				}
        #caret {
						margin-inline-start: 1ch;
            transition: transform .3s;
        }
        #metadata-details[open] #caret {
            transform: rotate(90deg);
        }
        #metadata-details[open] #caret path {
            fill: #fffc;
        }
        summary {
            cursor: pointer;
            inline-size: 100%;
            text-align: start;
            list-style: none;
						-webkit-tap-highlight-color: transparent;
        }
        summary::-webkit-details-marker { display: none; }
        #metadata {
            color: var(--white);
        }
        #metadata a {
					color: var(--white);
					color: inherit;
					text-decoration-line: underline;
					text-decoration-thickness: var(--underline-thickness);
					text-underline-offset: var(--underline-offset);
					-webkit-tap-highlight-color: transparent;
					transition: font-variation-settings 400ms ease;
        }
				#metadata a:where(:hover, :focus) {
					--casl: "CASL" 1;
					--wght: "wght" 700;
					--underline-thickness: 0.15em;
				}
        .progress {
            block-size: 100%;
            animation: none;
            background-color: var(--white);
        }
        .progressing ~ .bar .progress {
            background-color: transparent;
            inline-size: auto;
        }
        .is-loading .progressing .progress,
        .is-paused .progressing .progress {
            animation-play-state: paused;
        }
        .progressing .progress {
            inline-size: 0;
            animation: progress ${t}s linear;
            animation-play-state: running;
    }
        @keyframes progress {
            0% { inline-size: 0%; }
            100% { inline-size: 100%; }
    }
        .is-loading button,
        .is-loading #controls,
        .is-loading #metadata-details,
        .is-loading #open-heart {
            display: none;
        }
        .is-loading #images img {
            opacity: 0;
        }
        .is-loading .loading-visual {
            display: block;
            position: absolute;
            inset-block-start: 50%;
            inset-inline-start: 50%;
            inline-size: 2vh;
            aspect-ratio: 1;
            text-align: center;
            background: var(--white);
            z-index: 1;
            margin-inline-start: -1vh;
            animation: rotate 2s linear infinite;
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
    }
        .loading-visual {
            display: none;
        }
        #goToBlock {
					position: absolute;
					inset: 0;
					inline-size: 100%;
					block-size: 100%;
					aspect-ratio: 9 / 16;
					box-sizing: border-box;
					transform: unset;
					pointer-events: none;
					z-index: 1;
    }
        #back, #forward {
					position: absolute;
					inset-block-end: 50%;
					inline-size: calc(33% + var(--space-xl));
					block-size: calc(100% - (2 * (var(--step--6) + var(--step--2) + var(--step--2) + var(--space-m-l) + var(--step--2))));
					padding: 0;
					font-size: var(--step-1);
					color: var(--white);
					transform: translateY(50%);
					pointer-events: all;
        }
        #back {
            inset-inline-start: calc(-1 * var(--space-xl));
            text-align: start;
        }
        #forward {
					inset-inline-end: calc(-1 * var(--space-xl));
					text-align: end;
        }
        @media (max-inline-size: 420px), screen and (orientation: portrait) {
            #controls #close {
                display: inline-flex;
            }
    }
        [hidden] {
            display: none !important;
        }
	`;
}
class OpenStoriesElement extends HTMLElement {
	constructor() {
		super(),
			(this.themeColor = null),
			(this.currentIndex = -1),
			(this.count = 0),
			(this.timer = null),
			(this.currentBar = null),
			(this.currentImage = null),
			(this.images = []),
			(this.bars = []),
			(this.promises = []),
			(this.paused = !1),
			(this.open = !1),
			(this.items = []),
			(this.root = this.attachShadow({
				mode: "open",
			})),
			(this.root.innerHTML = `
				  <button type="dialog" id="trigger" part="button"><slot>View stories</slot></button>
				  <dialog class="is-loading" part="dialog">
				    <div class="loading-visual" part="loading-visual"></div>
				    <div id="bars"></div>
				    <div id="controls">
				      <span id="time"></span>
				      <a href id="link" aria-label="Story (copy link)">
							<svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.328 4.05a1 1 0 0 0-1.415-1.414l-1.07 1.07A3 3 0 0 0 5.083 7.95a.395.395 0 0 0 0-.558l-.856-.856a.395.395 0 0 0-.558 0A1 1 0 0 1 2.256 5.12l1.072-1.072Zm2.177.65A1 1 0 0 0 6.92 6.116l.994-.993A3 3 0 0 0 3.67.879c-.11.11-.11.29 0 .4l1.013 1.014c.11.11.29.11.401 0a1 1 0 1 1 1.414 1.415l-.993.993Z" fill="#fcfcfc"/></svg>
				      </a>
				      <button id="play-pause" type="button" aria-label="Play/Pause" aria-pressed="true">
				        <svg viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" id="play"><path d="M0 7.115V1.002A1 1 0 0 1 1.581.188l4.28 3.057a1 1 0 0 1 0 1.627L1.58 7.93A1 1 0 0 1 0 7.115Z" fill="#fcfcfc"/></svg>
				        <svg viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" id="pause"><path d="M2 1a1 1 0 0 0-2 0v6a1 1 0 0 0 2 0V1ZM4 1a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0V1Z" fill="#fcfcfc"/></svg>
				      </button>
				      <button id="close" type="button" aria-label="Close">
							<svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.036.677A.96.96 0 1 0 .679 2.034L6.464 7.82a.96.96 0 0 0 1.357-1.358L2.036.677Z" fill="#fcfcfc"/><path d="M.679 6.464a.96.96 0 1 0 1.357 1.357l5.786-5.785A.96.96 0 0 0 6.464.679L.68 6.464Z" fill="#fcfcfc"/></svg>
				      </button>
				    </div>
				    <div id="goToBlock">
				      <button id="back">&nbsp;←&nbsp;</button>
				      <button id="forward">&nbsp;→&nbsp;</button>
				    </div>
				    <div id="images"></div>
				    <details hidden id="metadata-details" part="metadata">
				      <summary part="metadata-summary">
				        See caption 
				        <svg viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg" id="caret"><path fill-rule="evenodd" clip-rule="evenodd" d="M.277.31A1 1 0 0 1 1.69.277l3 2.863a1 1 0 0 1 .033 1.415l-3 3.136A1 1 0 1 1 .277 6.31l2.308-2.413L.31 1.723A1 1 0 0 1 .277.31Z" fill="#fcfcfc"/></svg>
				      </summary>
				      <div id="metadata" part="metadata-content"></div>
				    </details>
				    <button type="button" id="open-heart" part="open-heart" part="open-heart" hidden>
				      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="on">
				        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60419 6.08132C9.77084 5.51626 10.1042 8.08132 10.1042 8.08132L10.1042 13.5813C8.60419 13.5813 7.10419 12.0813 6.50161 11.0813C5.89903 10.0813 5.43754 6.64637 7.60419 6.08132ZM12.6042 6.08131C10.4375 5.51626 10.1042 8.08132 10.1042 8.08132L10.1042 13.5813C11.6042 13.5813 13.1042 12.0813 13.7068 11.0813C14.3093 10.0813 14.7708 6.64637 12.6042 6.08131Z" fill="white"/>
				      </svg>
				      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="off">
				        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.51776 6.65626C9.99827 7.26627 10.1042 8.08132 10.1042 8.08132C10.1042 8.08132 10.2101 7.26627 10.6906 6.65626C11.0625 6.1841 11.6589 5.83478 12.6042 6.08131C14.7708 6.64637 14.3093 10.0813 13.7068 11.0813C13.1042 12.0813 11.6042 13.5813 10.1042 13.5813C8.60419 13.5813 7.10419 12.0813 6.50161 11.0813C5.89903 10.0813 5.43754 6.64637 7.60419 6.08132C8.54951 5.83478 9.14584 6.1841 9.51776 6.65626ZM9.11332 8.21616L9.11237 8.20995C9.111 8.20138 9.10825 8.18497 9.10382 8.16202C9.09487 8.11576 9.07949 8.04512 9.05555 7.95993C9.00587 7.78317 8.92824 7.57595 8.81703 7.39676C8.70614 7.2181 8.58996 7.11151 8.47666 7.0572C8.3811 7.0114 8.20033 6.95929 7.85655 7.04895C7.4012 7.1677 7.08018 7.59115 7.01156 8.494C6.97938 8.91746 7.01661 9.36612 7.09563 9.76183C7.17781 10.1734 7.28974 10.4517 7.35813 10.5652C7.5966 10.9609 8.04101 11.4942 8.58331 11.9193C9.13877 12.3547 9.67326 12.5813 10.1042 12.5813C10.5351 12.5813 11.0696 12.3547 11.6251 11.9193C12.1674 11.4942 12.6118 10.9609 12.8503 10.5652C12.9186 10.4517 13.0306 10.1734 13.1127 9.76183C13.1918 9.36612 13.229 8.91746 13.1968 8.49399C13.1282 7.59115 12.8072 7.1677 12.3518 7.04895C12.008 6.95929 11.8273 7.0114 11.7317 7.0572C11.6184 7.11151 11.5022 7.2181 11.3913 7.39676C11.2801 7.57595 11.2025 7.78317 11.1528 7.95993C11.1289 8.04512 11.1135 8.11576 11.1046 8.16202C11.1001 8.18497 11.0974 8.20138 11.096 8.20995L11.0951 8.21615C11.0277 8.71143 10.6047 9.08132 10.1042 9.08132C9.60373 9.08132 9.18068 8.71144 9.11332 8.21616Z" fill="white"/>
				      </svg>
				    </button>
				  </dialog>
				`),
			(this.dialog = this.root.querySelector("dialog")),
			(this.button = this.root.querySelector("button#trigger")),
			(this.close = this.root.querySelector("button#close")),
			(this.openHeart = this.root.querySelector("button#open-heart")),
			(this.metadataDetails = this.root.querySelector("#metadata-details")),
			(this.meta = this.root.querySelector("#metadata")),
			(this.link = this.root.querySelector("a#link")),
			(this.time = this.root.querySelector("#time")),
			(this.goToBinding = this.goTo.bind(this, 1));
	}
	get isHighlight() {
		return this.hasAttribute("is-highlight");
	}
	get showMetadata() {
		return this.hasAttribute("show-metadata");
	}
	setThemeColor(t) {
		t &&
			!this.themeColor &&
			((this.themeColor = document.createElement("meta")),
			(this.themeColor.name = "theme-color"),
			(this.themeColor.content = "#000"),
			document.body.append(this.themeColor)),
			!t &&
				this.themeColor &&
				(this.themeColor.remove(), (this.themeColor = null));
	}
	connectedCallback() {
		this.button.addEventListener("click", () => {
			this.dialog.open ? this.dialog.close() : this.dialog.showModal(),
				(this.open = this.dialog.open),
				this.dialog.open &&
					((this.dialog.tabIndex = -1),
					this.dialog.focus(),
					this.startTimer(),
					this.setThemeColor(!0));
		}),
			this.close.addEventListener("click", () => {
				this.button.click();
			}),
			this.dialog.addEventListener("click", (t) => {
				this.dialog.open && t.target === this.dialog && this.button.click();
			});
		const t = this.getAttribute("src");
		t && this.fetchData(t);
		const e = document.createElement("style");
		(e.innerText = css(this.duration)),
			this.root.append(e),
			this.style.setProperty("--mobileVh", 0.01 * window.innerHeight + "px"),
			this.showMetadata && (this.root.querySelector("details").hidden = !1);
	}
	get src() {
		return this.hasAttribute("src")
			? new URL(this.getAttribute("src") || "", location.href)
			: "";
	}
	get duration() {
		return this.hasAttribute("duration")
			? Number(this.getAttribute("duration"))
			: 5;
	}
	async sendHeart() {
		const t = this.items[this.currentIndex],
			e =
				this.items[this.currentIndex]._open_stories.reactions
					?.open_heart_urls || [];
		if (0 === e.length) return;
		const n = `♥︎@${t.id}`,
			i = [];
		for (const t of e)
			i.push(
				fetch(t, {
					method: "post",
					body: "❤️",
				})
			);
		this.openHeart.setAttribute("aria-busy", "true");
		let s = null;
		try {
			s = await Promise.any(i);
		} catch {
		} finally {
			if ((this.openHeart.setAttribute("aria-busy", "false"), !s)) return;
		}
		const a = (localStorage.getItem("_open_heart") || "")
			.split(",")
			.filter((t) => t);
		a.push(n),
			localStorage.setItem("_open_heart", a.join(",")),
			this.prepareHeart();
	}
	bindEvents() {
		const t = this.root.querySelector("#images"),
			e = this.root.querySelector("#play-pause"),
			n = this.root.querySelector("button#back"),
			i = this.root.querySelector("button#forward");
		this.openHeart.addEventListener("click", () => {
			this.sendHeart();
		}),
			this.link.addEventListener("click", async () => {
				await navigator.clipboard.writeText(this.link.href);
			}),
			n.addEventListener("click", () => {
				0 === this.currentIndex ? this.dialog.close() : this.goTo(-1);
			}),
			i.addEventListener("click", () => {
				this.currentIndex === this.count - 1
					? this.dialog.close()
					: this.goTo(1);
			}),
			this.dialog.addEventListener("close", () => {
				this.paused && this.resume(),
					this.timer && clearTimeout(this.timer),
					this.currentIndex >= this.items.length - 1 &&
						(this.currentIndex = -1),
					this.checkIfAllRead(),
					this.setThemeColor(!1),
					this.itemByHash() && (window.location.hash = "");
			}),
			e.addEventListener("click", () => {
				e.setAttribute("aria-pressed", this.paused.toString()),
					this.paused ? this.resume() : this.pause();
			}),
			t.addEventListener("click", () => {
				e.click();
			});
		const s = this.dialog;
		document.addEventListener(
			"keydown",
			function (t) {
				if (!s.open) return;
				"ArrowRight" === t.key && i.click();
				"ArrowLeft" === t.key && n.click();
			}.bind(this)
		);
	}
	itemByHash() {
		const t = (location.hash || "").slice(1);
		if (0 !== t.length) return this.items.find((e) => e.id === t);
	}
	checkHashId() {
		if (
			Array.from(document.querySelectorAll("open-stories")).find(
				(t) => t !== this && t.open
			)
		)
			return !1;
		const t = this.itemByHash();
		if (!t) return !1;
		const e = this.items.indexOf(t);
		return (
			this.currentIndex !== e &&
			((this.currentIndex = e - 1),
			this.dialog.open ? this.goTo(1) : this.button.click(),
			!0)
		);
	}
	checkIfAllRead() {
		if (this.isHighlight) return !1;
		const t = this.items[this.items.length - 1],
			e = this.getViewedId(),
			n = t && t.id === e;
		return this.classList.toggle("is-read", n), n;
	}
	async fetchData(t) {
		const e = await (await fetch(t)).json(),
			n = new Date();
		(this.items = e.items
			.filter(
				(t) =>
					t._open_stories.mime_type.startsWith("image") &&
					(!t._open_stories.date_expired ||
						n <= new Date(t._open_stories.date_expired))
			)
			.reverse()),
			this.classList.toggle("is-empty", 0 === this.items.length),
			0 === this.items.length
				? (this.button.disabled = !0)
				: this.appendImages(),
			window.addEventListener("hashchange", this.checkHashId.bind(this)),
			this.checkHashId() || this.setIndexToUnread();
	}
	setIndexToUnread() {
		if (this.isHighlight) return !1;
		const t = this.getViewedId();
		if (!t) return;
		const e = this.items.findIndex((e) => e.id === t);
		e < 0 || this.checkIfAllRead() || (this.currentIndex = e);
	}
	pause() {
		(this.paused = !0),
			this.classList.add("is-paused"),
			this.dialog.classList.add("is-paused"),
			this.timer && clearTimeout(this.timer);
	}
	resume() {
		(this.paused = !1),
			this.classList.remove("is-paused"),
			this.dialog.classList.remove("is-paused"),
			this.currentBar
				?.querySelector(".progress")
				?.addEventListener("animationend", this.goToBinding, {
					once: !0,
				});
	}
	appendImages() {
		(this.count = this.items.length),
			(this.images = []),
			(this.bars = []),
			(this.promises = []);
		const t = this.root.querySelector("#bars"),
			e = this.root.querySelector("#images");
		for (const n of this.items) {
			const i = document.createElement("div");
			i.classList.add("bar");
			const s = document.createElement("div");
			s.classList.add("progress"), i.append(s), t.append(i), this.bars.push(i);
			const a = document.createElement("img");
			a.setAttribute("loading", "lazy");
			this.promises.push(new Promise((t) => a.addEventListener("load", t))),
				(a.src = n._open_stories.url),
				"alt" in n._open_stories && (a.alt = n._open_stories.alt),
				e.append(a),
				this.images.push(a);
		}
	}
	async startTimer() {
		await this.promises[0],
			this.dialog.classList.contains("is-loading") &&
				(this.dialog.classList.remove("is-loading"), this.bindEvents()),
			this.goTo();
	}
	async goTo(t = null) {
		if (
			(t || (t = 1),
			this.currentBar &&
				((this.currentBar.style.animation = "none"),
				this.currentBar.offsetHeight,
				this.currentBar.style.removeProperty("animation"),
				this.currentBar.classList.remove("progressing")),
			this.timer && clearTimeout(this.timer),
			this.currentImage && this.currentImage.classList.remove("shown"),
			(this.currentIndex += t),
			this.currentIndex === this.count)
		)
			return void this.dialog.close();
		(this.currentBar = this.bars[this.currentIndex]),
			(this.currentImage = this.images[this.currentIndex]),
			this.currentBar.classList.add("progressing", "paused"),
			this.currentImage.classList.add("shown"),
			this.dialog.classList.add("is-loading"),
			await this.promises[this.currentIndex],
			this.dialog.classList.remove("is-loading"),
			this.currentBar.classList.remove("paused");
		const e = this.items[this.currentIndex];
		this.isHighlight || this.setViewed(e.id),
			(this.time.textContent = this.relativeTime(e.date_published));
		const n = "caption" in e._open_stories ? e._open_stories.caption : null;
		(this.metadataDetails.hidden = !n),
			(this.meta.innerHTML = n || ""),
			this.prepareHeart(),
			(this.link.href = `${e.url}`),
			this.currentIndex > this.count - 1 && (this.currentIndex = 0),
			(this.timer = window.setTimeout(
				this.goTo.bind(this),
				1e3 * this.duration
			)),
			this.paused && this.pause();
	}
	get viewedKey() {
		return new URL(this.getAttribute("src"), location.origin).toString();
	}
	setViewed(t) {
		const e = this.items.findIndex((t) => t.id === this.getViewedId());
		if (this.items.findIndex((e) => e.id === t) < e) return;
		const n = JSON.parse(localStorage.getItem("_open_stories") || "{}");
		(n[this.viewedKey] = t),
			localStorage.setItem("_open_stories", JSON.stringify(n));
	}
	getViewedId() {
		return JSON.parse(localStorage.getItem("_open_stories") || "{}")[
			this.viewedKey
		];
	}
	prepareHeart() {
		const t = this.items[this.currentIndex],
			e = (t._open_stories.reactions?.open_heart_urls || []).length > 0;
		if (((this.openHeart.hidden = !e), !e)) return;
		const n = (localStorage.getItem("_open_heart") || "")
			.split(",")
			.includes(`♥︎@${t.id}`);
		this.openHeart.setAttribute("aria-pressed", n.toString()),
			(this.openHeart.disabled = n);
	}
	relativeTime(t) {
		const e = Math.round(
			(new Date().getTime() - new Date(t).getTime()) / 1e3 / 60
		);
		return e > 1440
			? `${Math.round(e / 60 / 24)}d`
			: e > 60
			? `${Math.round(e / 60)}h`
			: `${e}m`;
	}
}
window.customElements.get("open-stories") ||
	((window.OpenStoriesElement = OpenStoriesElement),
	window.customElements.define("open-stories", OpenStoriesElement));
export default OpenStoriesElement;
