class Content extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<main class="columns" id="solution">
                <section class="section column">
                    <form class="box">
                        <label class="label">Enter your input:</label>
                        <textarea class="textarea" id="input"></textarea>
                        <br>
                        <a onclick="start()" class="button has-background-link-light has-text-link-dark"><b>Solve</b></a>
                    </form>
                </section>
                <section class="section column">
                    <card id="resultCont" style="display: none;" class="box">
                        <p class="content" id="resultText">
                            <span class="is-size-6 has-text-weight-bold">First Solution: </span><span id="solutionOne"></span>
                            <hr>
                            <span class="is-size-6 has-text-weight-bold">Second Solution: </span><span id="solutionTwo"></span>
                        </p>
                    </card>
                </section>
            </main>`;
    }
}

class Header extends HTMLElement {
    connectedCallback() {
        let day = this.getAttribute("day");

        let header = document.createElement('header');
        header.setAttribute("class", "navbar has-background-link-light is-spaced");

        let navbar_brand = document.createElement('div');
        navbar_brand.setAttribute("class", "navbar-brand");

        let title = document.createElement('h1');
        title.setAttribute('class', 'title navbar-item');
        title.innerText = "Advent of Code 2022";

        navbar_brand.appendChild(title);
        header.appendChild(navbar_brand);

        let navbar_start = document.createElement('div');
        navbar_start.setAttribute('class', 'navbar-start');

        let subtitle = document.createElement('h2');
        subtitle.setAttribute('class', "subtitle navbar-item is-spaced m-1 mx-4");
        subtitle.innerText = 'Day ' + day;

        navbar_start.appendChild(subtitle);
        header.appendChild(navbar_start);

        let dropdown = document.createElement('div');
        dropdown.setAttribute('class', "dropdown is-hoverable navbar-item m-1 mx-4");

        let dropdown_trigger = document.createElement('div');
        dropdown_trigger.setAttribute('class', 'dropdown-trigger');

        let button = document.createElement('button');
        button.setAttribute('class', 'dropdown-trigger');
        button.innerHTML = `<span>Other Days</span>
                <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>`;

        dropdown_trigger.appendChild(button);

        dropdown.appendChild(dropdown_trigger);

        let dropdown_menu = document.createElement('div');
        dropdown_menu.setAttribute('class', 'dropdown-menu');
        dropdown_menu.setAttribute('role', 'menu');

        let dropdown_content = document.createElement('div');
        dropdown_content.setAttribute('class', 'dropdown-content');

        for (let i = 1; i <= 4; i++) {
            let a = document.createElement('a');
            a.setAttribute("href", `../Day${i}/index.html`);
            a.classList.add("dropdown-item");

            if (i == day) {
                a.classList.add("is-active");
            }

            a.innerText=`Day ${i}`;
            dropdown_content.appendChild(a);
        }

        dropdown_menu.appendChild(dropdown_content);
        dropdown.appendChild(dropdown_menu);

        navbar_start.appendChild(dropdown);

        this.appendChild(header);
    }
}

customElements.define('main-content', Content);
customElements.define('main-header', Header);