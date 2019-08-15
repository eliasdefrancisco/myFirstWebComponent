class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer
        this._tooltipText = 'Some dummy tooltip text.'
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }
                :host {
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                }
                :host(.important) {
                    background: lightcoral;
                }
                :host-context(p) {
                    font-weight: bold;
                }
                .highlight {
                    background-color: lightcoral;
                }
                ::slotted(.highlight) {
                    border: 2px dotted red;
                }
                .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                    cursor: help;
                }
            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
        `
    }
    
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon)
        this.style.position = 'relative'
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.textContent = this._tooltipText
        this.shadowRoot.appendChild(this._tooltipContainer)
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer)
    }
}

customElements.define('my-tooltip', Tooltip)