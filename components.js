const DAYS_COMPLETED = 10;

class inputBox extends HTMLElement {
  connectedCallback() {
    let day = this.getAttribute("day");
    let section = document.createElement("section");
    section.setAttribute("class", "section column");

    let form = document.createElement("form");
    form.setAttribute("class", "box");
    form.innerHTML = `<label class="label">Enter your input:</label>
                <textarea class="textarea" id="input"></textarea>
                <br>
                <a target="_blank" class="button has-background-link-light has-text-link-dark" href="https://adventofcode.com/2022/day/${day}/input">Get Puzzle Input</a>
                <a onclick="start()" class="button has-background-link-dark has-text-link-light"><b>Solve</b></a>`;

    section.appendChild(form);

    this.setAttribute("class", "column");
    this.appendChild(section);
  }
}

customElements.define("input-box", inputBox);

class resultBox extends HTMLElement {
  connectedCallback() {
    let section = document.createElement("section");
    section.setAttribute("class", "section column");

    let card = document.createElement("card");
    card.setAttribute("id", "resultCont");
    card.setAttribute("style", "display: none;");
    card.setAttribute("class", "box");
    card.innerHTML = `<p class="content" id="resultText">
                <span class="is-size-6 has-text-weight-bold">First Solution: </span><span id="solutionOne"></span>
                <hr>
                <span class="is-size-6 has-text-weight-bold">Second Solution: </span><span id="solutionTwo"></span>
                </p>`;

    section.appendChild(card);

    this.setAttribute("class", "column");
    this.appendChild(section);
  }
}

customElements.define("result-box", resultBox);

class Content extends HTMLElement {
  connectedCallback() {
    let day = this.getAttribute("day");
    let main = document.createElement("main");
    main.setAttribute("class", "columns");
    main.setAttribute("id", "solution");

    main.innerHTML = `<input-box day=${day}></input-box>
                <result-box></result-box>`;

    this.appendChild(main);
  }
}

customElements.define("main-content", Content);

class DayDropdown extends HTMLElement {
  connectedCallback() {
    let day = this.getAttribute("day");

    let dropdown = document.createElement("div");
    dropdown.setAttribute(
      "class",
      "dropdown is-hoverable navbar-item m-1 mx-4"
    );

    let dropdown_trigger = document.createElement("div");
    dropdown_trigger.setAttribute("class", "dropdown-trigger");

    let button = document.createElement("button");
    button.setAttribute("class", "dropdown-trigger");
    button.innerHTML = `<span>Other Days</span>
                <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>`;

    dropdown_trigger.appendChild(button);

    dropdown.appendChild(dropdown_trigger);

    let dropdown_menu = document.createElement("div");
    dropdown_menu.setAttribute("class", "dropdown-menu");
    dropdown_menu.setAttribute("role", "menu");

    let dropdown_content = document.createElement("div");
    dropdown_content.setAttribute("class", "dropdown-content");

    let a = document.createElement("a");
    a.setAttribute("href", "../index.html");
    a.innerText = "Index";
    a.classList.add("dropdown-item");
    dropdown_content.appendChild(a);

    for (let i = 1; i <= DAYS_COMPLETED; i++) {
      let a = document.createElement("a");
      a.setAttribute("href", `../Day${i}/index.html`);
      a.classList.add("dropdown-item");

      if (i == day) {
        a.classList.add("is-active");
      }

      a.innerText = `Day ${i}`;
      dropdown_content.appendChild(a);
    }

    dropdown_menu.appendChild(dropdown_content);
    dropdown.appendChild(dropdown_menu);

    this.appendChild(dropdown);
  }
}

customElements.define("day-dropdown", DayDropdown);

class BasicHeader extends HTMLElement {
  connectedCallback() {
    this.setAttribute("class", "navbar has-background-link-light is-spaced");

    let navbar_brand = document.createElement("div");
    navbar_brand.setAttribute("class", "navbar-brand");

    let title = document.createElement("h1");
    title.setAttribute("class", "title navbar-item");
    title.innerText = "Advent of Code 2022";

    navbar_brand.appendChild(title);
    this.appendChild(navbar_brand);
  }
}

customElements.define("basic-header", BasicHeader);

class DayHeader extends HTMLElement {
  connectedCallback() {
    let day = this.getAttribute("day");

    let header = document.createElement("basic-header");
    this.appendChild(header);

    let navbar_start = document.createElement("div");
    navbar_start.setAttribute("class", "navbar-start");

    let subtitle = document.createElement("h2");
    subtitle.setAttribute("class", "subtitle navbar-item is-spaced m-1 mx-4");
    subtitle.innerText = "Day " + day;

    navbar_start.appendChild(subtitle);

    let dropdown = document.createElement("day-dropdown");
    dropdown.setAttribute("day", day);

    navbar_start.appendChild(dropdown);

    header.appendChild(navbar_start);
  }
}

customElements.define("day-header", DayHeader);

class Body extends HTMLElement {
  connectedCallback() {
    let day = this.getAttribute("day");
    this.innerHTML = `<body>
            <day-header day="${day}"></day-header>
            <main-content day="${day}"></main-content>
            </body>`;
  }
}

customElements.define("main-body", Body);

class IndexTable extends HTMLElement {
  connectedCallback() {
    let table = document.createElement("table");
    table.setAttribute("class", "table");

    var tbody = document.createElement("tbody");

    for (let i = 1; i <= DAYS_COMPLETED; i++) {
      let tr = document.createElement("tr");
      let th = document.createElement("th");

      let td1 = document.createElement("td");
      let a1 = document.createElement("a");
      a1.setAttribute("href", "https://adventofcode.com/2022/day/" + i);
      a1.setAttribute("target", "_blank");
      a1.innerText = "Problem Description";
      td1.appendChild(a1);

      let td2 = document.createElement("td");
      let a2 = document.createElement("a");
      a2.setAttribute("href", "Day" + i + "/index.html");
      a2.innerText = "Solution Page";
      td2.appendChild(a2);

      th.innerText = "Day " + i;

      tr.appendChild(th);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    this.appendChild(table);
  }
}

customElements.define("index-table", IndexTable);
