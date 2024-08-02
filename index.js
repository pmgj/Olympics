class GUI {
    #xml;
    #xsl;
    constructor() {
        window.fetch('SummerOlympics.xml').then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                this.#xml = parser.parseFromString(data, "application/xml");
                this.fillCountries();
            })
            .catch(console.error);
        window.fetch('classification.xsl').then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                this.#xsl = parser.parseFromString(data, "application/xml");
            })
            .catch(console.error);
    }
    fillCountries() {
        /* Fill the countries */
        let countries = this.#xml.querySelectorAll("country");
        let set = new Set();
        for (const c of countries) {
            set.add(c.textContent);
        }
        let temp = Array.from(set);
        temp.sort();
        for (const c of temp) {
            country.add(new Option(c));
        }
        /* Fill the olympics */
        let olympicsElems = this.#xml.querySelectorAll("olympics");
        for (const c of olympicsElems) {
            let year = c.getAttribute("year");
            let location = c.getAttribute("location");
            olympics.add(new Option(`${year} (${location})`, year));
        }
    }

    bestPerformance(evt) {
        let value = evt.target.value;
        if (value !== '-1') {
            let countries = this.#xml.querySelectorAll("country");
            let location = null, sum = -1;
            for (const c of countries) {
                if (c.textContent === value) {
                    let s = parseInt(c.getAttribute("gold")) + parseInt(c.getAttribute("silver")) + parseInt(c.getAttribute("bronze"));
                    if (s > sum) {
                        sum = s;
                        location = `${c.parentNode.getAttribute("location")} (${c.parentNode.getAttribute("year")})`;
                    }
                }
            }
            message1.textContent = `The best performance of ${value} was obtained in ${location}.`;
        }
    }

    classification(evt) {
        let value = evt.target.value;
        if (value !== '-1') {
            let xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(this.#xsl);
            xsltProcessor.setParameter(null, "year", value);
            let fragment = xsltProcessor.transformToFragment(this.#xml, document);
            output2.innerHTML = "";
            output2.appendChild(fragment);
        }
    }

    registerEvents() {
        country.onchange = this.bestPerformance.bind(this);
        olympics.onchange = this.classification.bind(this);
    }
}
let gui = new GUI();
gui.registerEvents();