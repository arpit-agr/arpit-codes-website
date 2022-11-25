function css(t) {
	return `
        :host {
            display: inline-block;
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
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
        }
        #images {
					inset: 0;
					z-index: -1;
					overflow: hidden;
					height: 100%;
					width: 100%;
					position: absolute;
					background: var(--black);
					border-radius: var(--step--1);
        }
        #images img {
					position: absolute;
					aspect-ratio: 9/16;
					object-fit: contain;
					opacity: 0;
					height: 100%;
					max-width: 100%;
					max-height: 100%;
        }
        #images img.shown {
            opacity: 1;
        }
        .bar {
            border-radius: var(--step--5);
            overflow: hidden;
            height: 100%;
            background: rgba(200, 200, 200, .2);
            z-index: 1;
            flex: auto;
            box-shadow: 0 0 var(--step--1) 0 rgba(0, 0, 0, 0.5);
        }
        #bars {
					height: var(--step--6);
					margin-block-start: var(--step--2);
					margin-inline: var(--step--2);
					display: flex;
					gap: var(--step--4);
        }
        #controls {
					margin-inline: var(--step--2);
					display: flex;
					gap: var(--step--2);
					align-items: center;
					z-index: 1;
        }
				#controls > * {
					padding-block: var(--step--2);
					padding-inline: 0;
				}
        #metadata-details summary {
            align-items: center;
            font-size: var(--step--1);
        }
        #controls button,
        #controls a,
        #metadata-details summary {
            display: inline-flex;
        }
				#controls a svg {
					vertical-align: middle;
				}
        #time,
        #metadata-details {
            flex: auto;
            font-size: var(--step--1);
            color: var(--white);
						font-weight: 700;
            text-shadow: 0 0 var(--step--5) rgba(0, 0, 0, .4), 0 0 var(--step--5) rgba(0, 0, 0, .4);
        }
        svg {
            width: auto;
            height: var(--space-m-l);
            filter: drop-shadow(0 0 var(--step--5) rgba(0, 0, 0, .5));
            line-height: 0;
        }
        #metadata-details,
        #open-heart {
            position: absolute;
            bottom: 0;
            z-index: 1;
            left: 0;
            right: 0;
            /* padding: var(--step--1); */
        }
        #open-heart {
            left: auto;
            right: 0;
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
            border-radius: var(--step--1);
        }
        #metadata-details > * {
					padding: var(--step--2);
        }
        #metadata-details[open] {
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0)  0%,  rgba(0, 0, 0, 0.2)  var(--step-1), rgba(0, 0, 0, .7) 100%);
        }
				#metadata-details[open] > summary {
					padding-block-end: 0;
					color: #fffc;
				}
        #caret {
            transition: transform .3s;
        }
        #metadata-details[open] #caret {
            transform: rotate(90deg);
        }
        summary path {
            fill: rgba(255, 255, 255, 0.7);
        }
        summary {
            cursor: pointer;
            width: 100%;
            text-align: left;
            list-style: none;
						-webkit-tap-highlight-color: transparent;
        }
        summary::-webkit-details-marker { display: none; }
        #metadata {
            color: var(--white);
        }
        #metadata a {
            color: var(--black);
        }
        .progress {
            height: 100%;
            animation: none;
            background-color: var(--white);
        }
        .progressing ~ .bar .progress {
            background-color: transparent;
            width: auto;
        }
        .is-loading .progressing .progress,
        .is-paused .progressing .progress {
            animation-play-state: paused;
        }
        .progressing .progress {
            width: 0;
            animation: progress ${t}s linear;
            animation-play-state: running;
    }
        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
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
            top: 50%;
            left: 50%;
            width: 2vh;
            aspect-ratio: 1;
            text-align: center;
            background: var(--white);
            z-index: 1;
            margin-left: -1vh;
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
					height: 100%;
					width: 100%;
					aspect-ratio: 9 / 16;
					box-sizing: border-box;
					transform: unset;
					pointer-events: none;
					z-index: 1;
    }
        #back, #forward {
					bottom: 50%;
					transform: translateY(50%);
					pointer-events: all;
					position: absolute;
					z-index: 1;
					height: calc(100% - (2 * (var(--step--6) + var(--step--2) + var(--step--2) + var(--space-m-l) + var(--step--2))));
					padding: 0;
					font-size: var(--step-1);
					width: calc(33% + var(--space-xl));
					color: var(--white);
        }
        #back {
            left: calc(-1 * var(--space-xl));
            text-align: left;
        }
        #forward {
            right: calc(-1 * var(--space-xl));
            text-align: right;
        }
        @media (max-width: 420px), screen and (orientation: portrait) {
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
			(this.root.innerHTML =
				'\n      <button type="dialog" id="trigger" part="button"><slot>View stories</slot></button>\n      <dialog class="is-loading" part="dialog">\n        <div class="loading-visual" part="loading-visual"></div>\n        <div id="bars"></div>\n        <div id="controls">\n          <span id="time"></span>\n          <a href id="link" aria-label="Story (copy link)">\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.41489 9.17763C9.80542 8.78711 9.80542 8.15395 9.41489 7.76342V7.76342C9.02437 7.3729 8.3912 7.3729 8.00068 7.76342L6.92857 8.83553C5.757 10.0071 5.757 11.9066 6.92857 13.0782C8.10014 14.2497 9.99964 14.2497 11.1712 13.0782V13.0782C11.3254 12.924 11.3254 12.6739 11.1712 12.5197L10.3154 11.664C10.1612 11.5098 9.9112 11.5098 9.757 11.664V11.664C9.36647 12.0545 8.73331 12.0545 8.34278 11.664C7.95226 11.2734 7.95226 10.6403 8.34278 10.2497L9.41489 9.17763ZM11.5918 9.82911C11.2013 10.2196 11.2013 10.8528 11.5918 11.2433V11.2433C11.9824 11.6338 12.6155 11.6338 13.0061 11.2433L13.9996 10.2497C15.1712 9.07817 15.1712 7.17868 13.9996 6.00711C12.8281 4.83553 10.9286 4.83553 9.757 6.00711V6.00711C9.64616 6.11794 9.64616 6.29763 9.757 6.40847L10.7698 7.42132C10.8807 7.53215 11.0604 7.53215 11.1712 7.42132V7.42132C11.5617 7.03079 12.1949 7.03079 12.5854 7.42132C12.9759 7.81184 12.9759 8.44501 12.5854 8.83553L11.5918 9.82911Z" fill="white"/>\n            </svg>\n          </a>\n          <button id="play-pause" type="button" aria-label="Play/Pause" aria-pressed="true">\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="play">\n              <path d="M7 13.0568V6.94319C7 6.12982 7.91937 5.65669 8.58124 6.12946L12.8608 9.18627C13.4191 9.58509 13.4191 10.4149 12.8608 10.8137L8.58124 13.8705C7.91937 14.3433 7 13.8702 7 13.0568Z" fill="white"/>\n            </svg>\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="pause">\n              <rect x="7" y="6" width="2" height="8" rx="1" fill="white"/>\n              <path d="M11 7C11 6.44772 11.4477 6 12 6V6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14V14C11.4477 14 11 13.5523 11 13V7Z" fill="white"/>\n            </svg>\n          </button>\n          <button id="close" type="button" aria-label="Close">\n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <rect x="6" y="7.35723" width="1.91942" height="10.1014" rx="0.95971" transform="rotate(-45 6 7.35723)" fill="white"/>\n              <rect x="7.35724" y="14.5" width="1.91942" height="10.1014" rx="0.95971" transform="rotate(-135 7.35724 14.5)" fill="white"/>\n            </svg>\n          </button>\n        </div>\n        <div id="goToBlock">\n          <button id="back">&nbsp;←&nbsp;</button>\n          <button id="forward">&nbsp;→&nbsp;</button>\n        </div>\n        <div id="images"></div>\n        <details hidden id="metadata-details" part="metadata">\n          <summary part="metadata-summary">\n            See caption \n            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="caret">\n              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.27665 6.30953C8.65799 5.91003 9.29098 5.89531 9.69048 6.27665L12.6905 9.14028C12.8825 9.32353 12.9937 9.57558 12.9997 9.8409C13.0058 10.1062 12.9061 10.3631 12.7226 10.5549L9.72264 13.6912C9.34089 14.0903 8.70788 14.1044 8.30878 13.7226C7.90968 13.3409 7.89561 12.7079 8.27736 12.3088L10.5854 9.8958L8.30953 7.72336C7.91003 7.34202 7.89531 6.70902 8.27665 6.30953Z" fill="white"/>\n            </svg>\n          </summary>\n          <div id="metadata" part="metadata-content"></div>\n        </details>\n        <button type="button" id="open-heart" part="open-heart" part="open-heart" hidden>\n          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="on">\n            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60419 6.08132C9.77084 5.51626 10.1042 8.08132 10.1042 8.08132L10.1042 13.5813C8.60419 13.5813 7.10419 12.0813 6.50161 11.0813C5.89903 10.0813 5.43754 6.64637 7.60419 6.08132ZM12.6042 6.08131C10.4375 5.51626 10.1042 8.08132 10.1042 8.08132L10.1042 13.5813C11.6042 13.5813 13.1042 12.0813 13.7068 11.0813C14.3093 10.0813 14.7708 6.64637 12.6042 6.08131Z" fill="white"/>\n          </svg>\n          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="off">\n            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.51776 6.65626C9.99827 7.26627 10.1042 8.08132 10.1042 8.08132C10.1042 8.08132 10.2101 7.26627 10.6906 6.65626C11.0625 6.1841 11.6589 5.83478 12.6042 6.08131C14.7708 6.64637 14.3093 10.0813 13.7068 11.0813C13.1042 12.0813 11.6042 13.5813 10.1042 13.5813C8.60419 13.5813 7.10419 12.0813 6.50161 11.0813C5.89903 10.0813 5.43754 6.64637 7.60419 6.08132C8.54951 5.83478 9.14584 6.1841 9.51776 6.65626ZM9.11332 8.21616L9.11237 8.20995C9.111 8.20138 9.10825 8.18497 9.10382 8.16202C9.09487 8.11576 9.07949 8.04512 9.05555 7.95993C9.00587 7.78317 8.92824 7.57595 8.81703 7.39676C8.70614 7.2181 8.58996 7.11151 8.47666 7.0572C8.3811 7.0114 8.20033 6.95929 7.85655 7.04895C7.4012 7.1677 7.08018 7.59115 7.01156 8.494C6.97938 8.91746 7.01661 9.36612 7.09563 9.76183C7.17781 10.1734 7.28974 10.4517 7.35813 10.5652C7.5966 10.9609 8.04101 11.4942 8.58331 11.9193C9.13877 12.3547 9.67326 12.5813 10.1042 12.5813C10.5351 12.5813 11.0696 12.3547 11.6251 11.9193C12.1674 11.4942 12.6118 10.9609 12.8503 10.5652C12.9186 10.4517 13.0306 10.1734 13.1127 9.76183C13.1918 9.36612 13.229 8.91746 13.1968 8.49399C13.1282 7.59115 12.8072 7.1677 12.3518 7.04895C12.008 6.95929 11.8273 7.0114 11.7317 7.0572C11.6184 7.11151 11.5022 7.2181 11.3913 7.39676C11.2801 7.57595 11.2025 7.78317 11.1528 7.95993C11.1289 8.04512 11.1135 8.11576 11.1046 8.16202C11.1001 8.18497 11.0974 8.20138 11.096 8.20995L11.0951 8.21615C11.0277 8.71143 10.6047 9.08132 10.1042 9.08132C9.60373 9.08132 9.18068 8.71144 9.11332 8.21616Z" fill="white"/>\n          </svg>\n        </button>\n      </dialog>\n    '),
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
			a.setAttribute("loading", "lazy")
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
			(this.meta.textContent = n || ""),
			this.prepareHeart(),
			(this.link.href = `#${e.id}`),
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