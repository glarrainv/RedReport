import "./App.css";

function App() {
  const NDHalls: { [key: string]: boolean } = {
    Alumni: true,
    Badin: true,
    Baumer: true,
    "Breen-Phillips": true,
    Carroll: true,
    Cavanaugh: true,
    Dillon: true,
    Duncan: true,
    Dunne: true,
    Farley: true,
    Fisher: true,
    Zahm: true,
    Flaherty: true,
    Graham: true,
    Howard: true,
    "Johnson Family": true,
    Keenan: true,
    Keough: true,
    Knott: true,
    Lewis: true,
    Lyons: true,
    McGlinn: true,
    Morrissey: true,
    "O'Neill": true,
    "Pasquerilla East": true,
    "Pasquerilla West": true,
    Ryan: true,
    Siegfried: true,
    Sorin: true,
    "St. Edward's": true,
    Stanford: true,
    Walsh: true,
    "Welsh Family": true,
  };

  function AutoCompleteHall(e: HTMLInputElement) {
    var list = document.getElementById("list");
    while (list?.firstChild) {
      list.firstChild.remove();
    }

    const HallKeys = Object.keys(NDHalls);
    for (var hall of HallKeys) {
      for (let char = 0; char < e.value.length; char++) {
        if (e.value[char] == hall[char]) {
          if (NDHalls[hall] == false) {
            NDHalls[hall] = true;
          }
        } else {
          if (NDHalls[hall] == true) {
            NDHalls[hall] = false;
            break;
          } else {
          }
          break;
        }
      }
    }

    for (var hall of HallKeys) {
      if (list?.children.namedItem(hall) == null && NDHalls[hall] == true) {
        document.getElementsByName("dorm");
        const item = document.createElement("div");
        item.id = hall;
        item.innerHTML = hall;
        item.onclick = () => {
          e.value = item.id;
          while (list?.firstChild) {
            list.firstChild.remove();
          }
        };
        list?.appendChild(item);
      }
    }
    if (e.value.length == 0) {
      while (list?.firstChild) {
        list.firstChild.remove();
      }
    }
  }

  return (
    <>
      <div className="circle"></div>
      <form name="dorm" autoComplete="off" action="/action_page.php">
        <div className="autocomplete">
          <label htmlFor="report">Where did you feel unsafe?</label>
          <input
            id="report"
            type="text"
            name="report"
            placeholder="Alumni"
            onInputCapture={(e) => {
              AutoCompleteHall(e.currentTarget);
            }}
          />
          <div id="list" className="autocomplete-items"></div>
        </div>
        <input className="submit" type="submit" />
      </form>
    </>
  );
}

export default App;
