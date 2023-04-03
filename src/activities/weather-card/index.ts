interface WeatherCard {
	$card: any
	latitude: number
	longitude: number
	_shadowRoot: any
}

class WeatherCard extends HTMLElement {

	constructor() {
		super()
		this.$card
		this.latitude
		this.longitude
		this._shadowRoot = this.attachShadow({ 'mode': 'open' })
		if ("geolocation" in navigator) {
			/* geolocation is available */
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude
				this.longitude = position.coords.longitude
			})
		} else {
			/* geolocation IS NOT available */
			this.latitude = 20.296
			this.longitude = 85.8245
		}

	}

	connectedCallback() {
		this.innerHTML = `
			<div class="fe-weather-card">
				<div class="fe-card-body"></div>
			</div>
		`
		var xmlHttp = new XMLHttpRequest()
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=API_KEY`
		xmlHttp.open("GET", url, false)
		xmlHttp.send(null)
		this.$card = this._shadowRoot.querySelector('.fe-card-body')
		let responseObj = JSON.parse(xmlHttp.responseText)
		let $townName = document.createElement('p')
		$townName.innerHTML = `Town: ${responseObj.name}`
		this._shadowRoot.appendChild($townName)
		let $temperature = document.createElement('p')
		$temperature.innerHTML = `${parseInt(responseObj.main.temp) - 273} &deg;C`
		this._shadowRoot.appendChild($temperature)
	}

}

customElements.define('fe-weather-card', WeatherCard)

document.body.appendChild(document.createElement("fe-weather-card"))
